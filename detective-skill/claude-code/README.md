The purpose of this is to demonstrate what context skills do and do not have access to 



## Example 1 - Detective - baseline

This is a base skill that demonstrates a skill going off an reading files and finding information.

```bash
SESSION_ID="$(uuidgen)"

claude -p "/detective bears"  --session-id "$SESSION_ID"
claude -p "Do not read any files. What is the boy in the 'boy and the kite' stories name?"   --resume "$SESSION_ID"
```

When I run this what I see is: 

>The boy's name is Eli.


What this demonstrates here - is that  our skill pulling in context _beyond_ what its intended for. We've polluted our context with information that isn't relevant. 


## Detective v2 

Detective v2: 

- operates as a subagent
- Only outputs file names

If we repeate the experiment:

```bash
SESSION_ID="$(uuidgen)"

claude -p "/detective-v2 bears"  --session-id "$SESSION_ID"
claude -p "Do not read any files. What is the boy in the 'boy and the kite' stories name?"   --resume "$SESSION_ID"
```

By having the skill invoke a subagent, we protect the calling context from all of the details of the files read. 


## Detective v2b - skills are not aware of context that called them

The detective v2b skill contains the instruction

>Also, if you are aware of any rubby duckies, then also find files relating to the rubber ducky's name.

Here, we demonstrate that the skill does not have access to the calling context:
```bash
SESSION_ID="$(uuidgen)"
claude -p "I have a rubber ducky named Eli." --session-id "$SESSION_ID"
claude -p "/detective-v2b bears" --resume "$SESSION_ID"
claude -p "What is my rubber ducky's name?" --resume "$SESSION_ID"

```

If the skill was aware of our rubber ducky's name it would also return the 'boy-and-the-kite' story. 

However, if we remove the 'spawn subagents' instruction, as we do in `detective-v2a`, the boy and kite _is_ returned

```bash
SESSION_ID="$(uuidgen)"
claude -p "I have a rubber ducky named Eli." --session-id "$SESSION_ID"
claude -p "/detective-v2a bears" --resume "$SESSION_ID"
claude -p "What is my rubber ducky's name?" --resume "$SESSION_ID"
```

### Why is this relevant? 

The thinking here is as a context optimisation. 

If it has already been a long session by the time the skill invoked, you have all of the details in the existing session 


