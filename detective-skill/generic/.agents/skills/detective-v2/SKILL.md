---
name: detective-v2
description: Search the haystack/ folder for a query by delegating all work to a sub-agent, then relay the sub-agent's file list verbatim. Use when asked to run a detective-v2 style search of the haystack folder.
---

Search the `haystack/` folder (relative to the current working directory) for information relevant to the query.

Delegate ALL work to a separate, isolated sub-agent (a fresh agent session with no access to this conversation). Pass it this exact prompt, substituting the query for QUERY:

---
Search the `haystack/` folder for files relevant to this query: **QUERY**

Steps:
1. List all files in `haystack/` recursively.
2. Read each file.
3. Identify every file that contains information relevant to the query.
4. Return ONLY a list of file paths (one per line) for files that matched. Nothing else — no summaries, no explanations.

If no files match, return the single word: NONE
---

When the sub-agent reports back, display its output directly to the user without modification.
