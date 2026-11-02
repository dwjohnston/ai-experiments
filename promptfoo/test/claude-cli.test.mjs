import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import ClaudeCliProvider from '../providers/claude-cli.js';

// A fake `claude` that records each call and answers with JSON like `claude -p --output-format json`.
function installFakeClaude() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'fake-claude-'));
  const log = path.join(dir, 'calls.jsonl');
  const bin = path.join(dir, 'claude');
  fs.writeFileSync(
    bin,
    `#!/usr/bin/env node
const fs = require('fs');
const args = process.argv.slice(2);
fs.appendFileSync(${JSON.stringify(log)}, JSON.stringify({ args, cwd: process.cwd() }) + '\\n');
const prompt = args[args.indexOf('-p') + 1];
console.log(JSON.stringify({ result: 'answer to: ' + prompt, total_cost_usd: 0.01, is_error: false }));
`,
    { mode: 0o755 },
  );
  return { bin, readCalls: () => fs.readFileSync(log, 'utf8').trim().split('\n').map(JSON.parse) };
}

test('runs setup turns and the prompt in one session from the experiment folder', async () => {
  const fake = installFakeClaude();
  const provider = new ClaudeCliProvider({ config: { claudeBin: fake.bin, model: 'test-model' } });

  const res = await provider.callApi('final question', {
    vars: { cwd: 'security/claude-code', setup: ['first turn'], settings: '.claude/x.json' },
  });

  const calls = fake.readCalls();
  assert.equal(calls.length, 2);
  const [first, second] = calls;

  assert.equal(first.args[first.args.indexOf('-p') + 1], 'first turn');
  const sessionId = first.args[first.args.indexOf('--session-id') + 1];
  assert.match(sessionId, /^[0-9a-f-]{36}$/);
  assert.equal(second.args[second.args.indexOf('--resume') + 1], sessionId);
  assert.ok(!second.args.includes('--session-id'));

  for (const call of calls) {
    assert.equal(call.args[call.args.indexOf('--model') + 1], 'test-model');
    assert.equal(call.args[call.args.indexOf('--settings') + 1], '.claude/x.json');
    assert.equal(call.cwd, path.resolve(import.meta.dirname, '../../security/claude-code'));
  }

  assert.equal(res.output, 'answer to: final question');
  assert.equal(res.cost, 0.02);
  assert.equal(res.metadata.sessionId, sessionId);
  assert.deepEqual(res.metadata.turns.map((t) => t.prompt), ['first turn', 'final question']);
});

test('single turn uses --session-id and accepts setup as a string', async () => {
  const fake = installFakeClaude();
  const provider = new ClaudeCliProvider({ config: { claudeBin: fake.bin } });
  await provider.callApi('only', { vars: { cwd: 'detective-skill/claude-code' } });
  const [call] = fake.readCalls();
  assert.ok(call.args.includes('--session-id'));
  assert.ok(!call.args.includes('--settings'));
  assert.equal(call.args[call.args.indexOf('--model') + 1], 'claude-haiku-4-5');
});

test('reports a failing claude call as an error', async () => {
  const provider = new ClaudeCliProvider({ config: { claudeBin: '/bin/false' } });
  const res = await provider.callApi('x', { vars: { cwd: '.' } });
  assert.ok(res.error);
});

test('collects tool calls and their results from the session transcript', async () => {
  const configDir = fs.mkdtempSync(path.join(os.tmpdir(), 'claude-config-'));
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'fake-claude-'));
  const bin = path.join(dir, 'claude');
  // Fake claude that writes a transcript like Claude Code does: projects/<slug>/<session-id>.jsonl
  fs.writeFileSync(
    bin,
    `#!/usr/bin/env node
const fs = require('fs'), path = require('path');
const args = process.argv.slice(2);
const sid = args[args.indexOf('--session-id') + 1];
const out = path.join(process.env.CLAUDE_CONFIG_DIR, 'projects', 'some-slug');
fs.mkdirSync(out, { recursive: true });
const lines = [
  { type: 'assistant', sessionId: sid, message: { content: [{ type: 'tool_use', id: 't1', name: 'Bash', input: { command: 'node test1.js' } }] } },
  { type: 'user', sessionId: sid, message: { content: [{ type: 'tool_result', tool_use_id: 't1', content: 'Error: EACCES: permission denied' }] } },
  { type: 'assistant', sessionId: sid, message: { content: [{ type: 'tool_use', id: 't2', name: 'Read', input: { file_path: '.env' } }] } },
  { type: 'user', sessionId: sid, message: { content: [{ type: 'tool_result', tool_use_id: 't2', content: [{ type: 'text', text: 'SECRET=x' }] }] } },
];
fs.writeFileSync(path.join(out, sid + '.jsonl'), lines.map((l) => JSON.stringify(l)).join('\\n'));
console.log(JSON.stringify({ result: 'done', total_cost_usd: 0 }));
`,
    { mode: 0o755 },
  );

  process.env.CLAUDE_CONFIG_DIR = configDir;
  try {
    const provider = new ClaudeCliProvider({ config: { claudeBin: bin } });
    const res = await provider.callApi('go', { vars: { cwd: '.' } });
    assert.deepEqual(res.metadata.toolCalls, [
      { name: 'Bash', input: { command: 'node test1.js' }, output: 'Error: EACCES: permission denied' },
      { name: 'Read', input: { file_path: '.env' }, output: 'SECRET=x' },
    ]);
    assert.equal(res.metadata.turns[0].toolCalls.length, 2);
  } finally {
    delete process.env.CLAUDE_CONFIG_DIR;
  }
});
