# Harbor experiment reproduction — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Every catalogue experiment that can run on Linux is a Harbor task
whose verifier encodes the README claim.

**Architecture:** `harbor/build_tasks.py` holds the experiment list as data
and writes one task folder per experiment under `harbor/tasks/`. Multi-turn
experiments are multi-step tasks; Harbor's `claude-code` agent resumes the
same session between steps (`--resume-trajectory`). Each step's verifier runs
`check.py`, which reads the turn's stream-json log
(`/logs/agent/claude-code.txt`) and applies JSON rules to the final answer and
the main agent's tool calls. Each step has a reference solution that writes
the log the README describes, so the `oracle` agent should score 1 and the
`nop` agent 0.

**Tech Stack:** Harbor 0.25.0, Docker, Python 3 stdlib, node:22 image with
bun, bubblewrap and socat.

**Spec:** docs/superpowers/specs/2026-11-02-eval-harnesses-design.md

## Global Constraints

- Default model `anthropic/claude-haiku-4-5`.
- Experiment folders are read, never modified; tasks hold copies made by the generator.
- `security/no-ai` is skipped (macOS only).
- Harbor runs Claude Code with `bypassPermissions`; README runs are in a
  trusted workspace where node/bun are allowed, so outcomes should match. Noted in README.
- `--settings <file>` in the README becomes `.claude/settings.local.json` in the task (same layering).

## Review Focus

- A verifier that passes on an empty or missing log.
- Subagent events (parent_tool_use_id set) counted as main-agent tool calls.
- Steps after the first not resuming the session.
- Generated tasks drifting from the experiment folders (`build_tasks.py --check`).
- bubblewrap inside Docker may not have the privileges it needs.

## Tasks

### Task 1: verifier rules (TDD)
- [ ] `harbor/verifier/test_check.py` (unittest): answer regex rules,
      tool_calls some/none/all, subagent events ignored, missing/empty log → 0,
      observational → 1 only if an answer exists.
- [ ] See it fail; implement `harbor/verifier/check.py`; see it pass. Commit.

### Task 2: generator + tasks
- [ ] `harbor/build_tasks.py` with all experiments; writes task.toml,
      instructions, Dockerfile, fixtures, tests, reference solutions; `--check`.
- [ ] `harbor task lint`/schema-valid; build tasks. Commit.

### Task 3: harness validation
- [ ] `harbor run -a oracle` on all tasks → all reward 1.
- [ ] `harbor run -a nop` → all reward 0.
- [ ] Check bubblewrap works in the image. Commit.

### Task 4: README, job config, push, PR
