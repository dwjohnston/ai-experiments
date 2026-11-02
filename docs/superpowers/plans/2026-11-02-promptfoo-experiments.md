# promptfoo experiment reproduction — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Run every experiment in the catalogue as a scored promptfoo test.

**Architecture:** `promptfoo/` holds a pinned promptfoo install, a custom
provider (`providers/claude-cli.js`) that runs `claude -p` turns in one
session, and test files per experiment folder. A separate macOS-only config
runs the non-LLM `no-ai` Seatbelt checks through promptfoo's `exec:` provider.

**Tech Stack:** Node 22, promptfoo 0.125.1, Claude Code CLI.

**Spec:** docs/superpowers/specs/2026-11-02-eval-harnesses-design.md

## Global Constraints

- Default model `claude-haiku-4-5`; override with `CLAUDE_MODEL`.
- Experiment folders are read, never modified.
- Every non-observational test must be able to fail.

## Review Focus

- Session continuity: setup turns and the scored turn share one session id.
- Working directory: each test runs `claude` from the experiment's tool folder.
- Untrusted workspace silently drops `permissions.allow`.
- Platform differences (EPERM vs EACCES, bun on Linux).
- Cost: the full suite should stay around $1 on Haiku.

## Tasks

### Task 1: provider with unit test
- [ ] Write `test/claude-cli.test.mjs` using a fake `claude` on PATH that
      echoes its args as JSON; assert first turn uses `--session-id`, later
      turns use `--resume` with the same id, `--settings`/`--model` passed,
      cwd resolved relative to the repo root, result text returned.
- [ ] Run it, see it fail.
- [ ] Implement `providers/claude-cli.js`; run test, see it pass. Commit.

### Task 2: detective tests
- [ ] `tests/detective.yaml` with the 5 detective rows. Run
      `npx promptfoo eval --filter-pattern detective`. Commit.

### Task 3: security tests
- [ ] `tests/security.yaml` with security rows incl. observational appendix.
      Run. Commit.

### Task 4: macOS no-ai config
- [ ] `promptfooconfig.macos.yaml` using `exec:` provider. Validate config
      (`promptfoo validate`); cannot be run on Linux. Commit.

### Task 5: README + results
- [ ] `promptfoo/README.md`: how to run, what each test checks, results from
      a Linux run, platform notes. Link from root README. Commit, push, PR.
