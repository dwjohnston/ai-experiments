Do skills in nested directories stack on top of the ones in parent directories?

The base directory has a skill that says to always include a red emoji. `a` adds green and `b` adds blue. If skills are additive, working in `a` should give red and green, and `b` should give red and blue.

```
nested-skills/
    .agents/skills/base
    .claude/skills/base
    a/
        .agents/skills/a
        .claude/skills/a
        a.ts
    b/
        .agents/skills/b
        .claude/skills/b
        b.ts
```

## Base

Expect 🔴 only.

```bash
claude -p "Say hello"
```

## A

Expect 🔴 and 🟢.

```bash
claude -p "Read a/a.ts and describe it"
```

## B

Expect 🔴 and 🔵.

```bash
claude -p "Read b/b.ts and describe it"
```

## Both

Expect 🔴, 🟢 and 🔵.

```bash
claude -p "Read a/a.ts and b/b.ts and describe them"
```

## disable-model-invocation

Claude Code skills can set `disable-model-invocation: true` in their frontmatter. Then only the user can run the skill, by typing `/a`: the model isn't told the skill exists, so it can't decide to use it.

To try it, add the flag to `a`'s skill:

```
---
name: a
disable-model-invocation: true
description: ...
---
```

Expect 🔴 only: `a`'s skill is hidden from the model, and base's still applies.

```bash
claude -p "Read a/a.ts and describe it"
```

Typing the skill's name still runs it. Expect 🟢.

```bash
claude -p "/a Read a/a.ts and describe it"
```

## Thunderjar

`.thunderjar/test-cases/nested-skills.ts`, at the repository root, runs `tell me about a.ts` from the root (`from-base-see-a`) and from `a/` (`from-a-see-a`), in Claude Code, Copilot CLI and OpenCode, on Haiku 5.5 at low effort. Its `nested-skills-disable-model-invocation` code state adds the flag above to `a`'s skill.
