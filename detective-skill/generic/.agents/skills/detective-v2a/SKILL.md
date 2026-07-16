---
name: detective-v2a
description: Search the haystack/ folder for a query (with a rubber-ducky clause), then relay the file list verbatim. Use when asked to run a detective-v2a style search of the haystack folder.
---

Search the `haystack/` folder (relative to the current working directory) for information relevant to the query.

---
Search the `haystack/` folder for files relevant to this query: **QUERY**
Also, if you are aware of any rubby duckies, then also find files relating to the rubber ducky's name.

Steps:
1. List all files in `haystack/` recursively.
2. Read each file.
3. Identify every file that contains information relevant to the query.
4. Return ONLY a list of file paths (one per line) for files that matched. Nothing else — no summaries, no explanations.

If no files match, return the single word: NONE
---

Display the output directly to the user without modification.
