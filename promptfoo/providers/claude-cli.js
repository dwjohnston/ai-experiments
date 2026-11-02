// promptfoo provider that runs the Claude Code CLI the same way the experiment
// READMEs do: `claude -p "<turn>" --session-id <id>` for the first turn, then
// `claude -p "<turn>" --resume <id>` for each later turn.
//
// Test vars:
//   cwd       folder to run claude from, relative to the repo root (required)
//   setup     turn or list of turns to run before the scored prompt (optional)
//   settings  extra settings file, passed as --settings (optional)
//
// Provider config:
//   model      defaults to $CLAUDE_MODEL, then claude-haiku-4-5
//   claudeBin  path to the claude binary (default: claude on PATH)
//   timeoutMs  per-turn timeout (default: 5 minutes)
//
// The response metadata has `toolCalls` (each tool the main agent used, its
// input and what it returned) and `turns` (each prompt, its answer and the tool
// calls made during that turn).

import { execFile } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const REPO_ROOT = path.resolve(import.meta.dirname, '../..');

function runTurn(bin, args, cwd, timeoutMs) {
  return new Promise((resolve, reject) => {
    execFile(bin, args, { cwd, timeout: timeoutMs, maxBuffer: 32 * 1024 * 1024 }, (err, stdout, stderr) => {
      if (err) {
        reject(new Error(`claude failed: ${err.message}\n${stderr}`));
        return;
      }
      try {
        resolve(JSON.parse(stdout));
      } catch {
        reject(new Error(`claude returned non-JSON output:\n${stdout}\n${stderr}`));
      }
    });
  });
}

// Claude Code writes each session to <config dir>/projects/<cwd slug>/<session id>.jsonl.
// Read it so tests can check what tools actually returned, not just what the model said.
function readToolCalls(sessionId) {
  const projects = path.join(process.env.CLAUDE_CONFIG_DIR ?? path.join(os.homedir(), '.claude'), 'projects');
  let file;
  try {
    file = fs
      .readdirSync(projects)
      .map((d) => path.join(projects, d, `${sessionId}.jsonl`))
      .find((f) => fs.existsSync(f));
  } catch {
    return [];
  }
  if (!file) return [];

  const calls = new Map();
  for (const line of fs.readFileSync(file, 'utf8').split('\n')) {
    let entry;
    try {
      entry = JSON.parse(line);
    } catch {
      continue;
    }
    const content = entry.message?.content;
    if (!Array.isArray(content)) continue;
    for (const part of content) {
      if (part.type === 'tool_use') {
        calls.set(part.id, { name: part.name, input: part.input, output: '' });
      } else if (part.type === 'tool_result' && calls.has(part.tool_use_id)) {
        const text = Array.isArray(part.content)
          ? part.content.map((c) => c.text ?? '').join('\n')
          : String(part.content ?? '');
        calls.get(part.tool_use_id).output = text;
      }
    }
  }
  return [...calls.values()];
}

export default class ClaudeCliProvider {
  constructor(options = {}) {
    this.config = options.config ?? {};
    this.providerId = options.id ?? 'claude-cli';
  }

  id() {
    return this.providerId;
  }

  async callApi(prompt, context = {}) {
    const vars = context.vars ?? {};
    const bin = this.config.claudeBin ?? 'claude';
    const model = this.config.model ?? process.env.CLAUDE_MODEL ?? 'claude-haiku-4-5';
    const timeoutMs = this.config.timeoutMs ?? 5 * 60 * 1000;
    const cwd = path.resolve(REPO_ROOT, vars.cwd ?? '.');
    const setup = vars.setup == null ? [] : [].concat(vars.setup);

    const sessionId = randomUUID();
    const turns = [];
    let cost = 0;
    let seenToolCalls = 0;

    try {
      for (const [i, turn] of [...setup, prompt].entries()) {
        const args = ['-p', turn, i === 0 ? '--session-id' : '--resume', sessionId];
        args.push('--model', model, '--output-format', 'json');
        if (vars.settings) args.push('--settings', vars.settings);

        const result = await runTurn(bin, args, cwd, timeoutMs);
        cost += result.total_cost_usd ?? 0;
        const toolCalls = readToolCalls(sessionId);
        turns.push({
          prompt: turn,
          output: result.result ?? '',
          isError: Boolean(result.is_error),
          toolCalls: toolCalls.slice(seenToolCalls),
        });
        seenToolCalls = toolCalls.length;
      }
    } catch (err) {
      return { error: err.message, metadata: { sessionId, cwd, turns, toolCalls: readToolCalls(sessionId) } };
    }

    const last = turns.at(-1);
    return {
      output: last.output,
      cost: Math.round(cost * 1e6) / 1e6,
      metadata: { sessionId, cwd, model, turns, toolCalls: readToolCalls(sessionId) },
    };
  }
}
