Do skills in nested directories stack on top of the ones in parent directories?

The base directory has a skill that says to always include a red emoji. `a` adds green and `b` adds blue. If skills are additive, working in `a` should give red and green, and `b` should give red and blue.

```
nested-skills/
    .agents/skills/base
    .claude/skills/base
    a/
        .agents/skills/a
        .claude/skills/a
        foo.ts
    b/
        .agents/skills/b
        .claude/skills/b
        bar.ts
```

## Base

Expect 🔴 only.

```bash
claude -p "Say hello"
```

## A

Expect 🔴 and 🟢.

```bash
claude -p "Read a/foo.ts and describe it"
```

## B

Expect 🔴 and 🔵.

```bash
claude -p "Read b/bar.ts and describe it"
```

## Both

Expect 🔴, 🟢 and 🔵.

```bash
claude -p "Read a/foo.ts and b/bar.ts and describe them"
```
