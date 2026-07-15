
These experiments show how various LLM Harness sandboxing tools work. 

I'm a developer on MacOS - sorry Linux and Windows users, I haven't create experiments for there. 

Claude Code makes use of MacOS's Seatbelt sandboxing tool - which interestingly enough - really is not well documented:

If you search 'macos seatbelt' - you will not see any developer documentation from Apple on the front page of search results. 

- https://news.ycombinator.com/item?id=44283454
- 

## Example 1 - no-ai

This demonstrating how Macos `sandbox-exec` works. 

There we have a script `01-read-env-node.ts` that will print the contents of our `.env` file. 

The `no-env.sb` file prevents processes from being able to read it. 

This is the mechanism that [claude code uses to prevent the AI from reading sensitive files](https://code.claude.com/docs/en/sandbox-environments#sandbox-runtime)


## Example 2 - claude-code

This demonstrate Claude Code's sandboxing in action. 







