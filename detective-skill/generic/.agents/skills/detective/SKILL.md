---
name: detective
description: Search the haystack/ folder for information relevant to a query and summarize findings directly, without delegating to a sub-agent. Use when asked to search the haystack folder for a topic.
---

Search the `haystack/` folder (relative to the current working directory) for information relevant to the query.

Steps:
1. List all files in `haystack/` recursively.
2. Read each file.
3. Extract and summarise every piece of information that is relevant to the query.
4. Present your findings clearly. If nothing relevant is found, say so.

Do not invent facts. Only report what you find in the haystack files.
