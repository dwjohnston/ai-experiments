

The purpose of this is to demonstrate how well or not, various AI harnesses respect the [agentskills.io format skills](https://agentskills.io/skill-creation/quickstart). 


## Claude

❌ Claude does not respect `.agents/skills` files 
```bash
SESSION_ID="$(uuidgen)"
claude -p "I have a rubber ducky named Eli." --session-id "$SESSION_ID"
claude -p "/detective-v2b bears" --resume "$SESSION_ID"
claude -p "What is my rubber ducky's name?" --resume "$SESSION_ID"
```


## Open Code


```bash
TITLE="detective-bears-$(date +%s)"
opencode run --command detective bears --title "$TITLE" --model anthropic/claude-haiku-4-5-20251001
SESSION_ID=$(opencode session list --format json -n 1 | jq -r '.[0].id')
opencode run --session "$SESSION_ID" "Do not read any files. What is the boy in the 'boy and the kite' stories name?" --model anthropic/claude-haiku-4-5-20251001
```
✅ Behaves the same as Claude

---



```bash
TITLE="detective-bears-$(date +%s)"
opencode run --command detective-v2 bears --title "$TITLE"  --model anthropic/claude-haiku-4-5-20251001
SESSION_ID=$(opencode session list --format json -n 1 | jq -r '.[0].id')
opencode run --session "$SESSION_ID" "Do not read any files. What is the boy in the 'boy and the kite' stories name?"  --model anthropic/claude-haiku-4-5-20251001
```
✅ Behaves the same as Claude



**Gemini:**
```bash
TITLE="detective-bears-$(date +%s)"
opencode run --command detective-v2 bears --title "$TITLE"  --model anthropic/claude-haiku-4-5-20251001
SESSION_ID=$(opencode session list --format json -n 1 | jq -r '.[0].id')
opencode run --session "$SESSION_ID" "Do not read any files. What is the boy in the 'boy and the kite' stories name?"  --model google/gemini-3.5-flash
```
The agent doesn't obey the 'do not read any files' command. 🫤


---
```bash
TITLE="detective-bears-$(date +%s)"
opencode run "I have a rubber ducky named Eli" --title "$TITLE"  --model anthropic/claude-haiku-4-5-20251001
SESSION_ID=$(opencode session list --format json -n 1 | jq -r '.[0].id')
opencode run  --session "$SESSION_ID"  --command detective-v2b bears  --model anthropic/claude-haiku-4-5-20251001
opencode run --session "$SESSION_ID" "What is my rubber ducky's name?"  --model anthropic/claude-haiku-4-5-20251001
```

✅ Behaves the same as Claude

--- 
