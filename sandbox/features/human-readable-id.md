---
name: human-readable-id
---

## Overview

A lightweight human-readable ID generator producing IDs in the format `adjective-noun-number` (e.g. `happy-tiger-42`).

## Requirements

- ~1000 unique combinations in v1 (collision avoidance is not a priority yet)
- Lightweight — no dependencies
- Designed so future versions can expand word lists or add collision detection without breaking the API

## v1 Design

**Format:** `{adjective}-{noun}-{number}`

**Combination target:** ~1000
- 10 adjectives × 10 nouns × 10 numbers (0–9) = 1000 combinations

**API:**
```ts
generateId(): string          // e.g. "happy-tiger-4"
```

**Location:** `src/b/generateId.ts` (functional style via b-agent)

## Future Considerations (not in v1)

- Expand word lists to increase combination space


## Out of Scope (v1)

- Collision guarantees
- Persistence / deduplication
