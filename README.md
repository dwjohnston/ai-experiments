This is a series of experiments that demonstrate the behaviour of ai. 

The project structure is as follows: 

```
[experiment-name]/
   README.md - High level details about what the experiment is 
   [ai-tool]/
      README.md - specific demonstrations with runnable code blocks 
      specific AI prompts etc here 
       
      
```

The default tool I have been using is Claude Code. 

## How to use this project

The README.md files will contain bash code blocks with AI instructions. 

```bash 
claude -p "tell me a joke"
```

For VSCode users, I recommend install the [`markdown-shell-runner`](https://marketplace.visualstudio.com/items?itemName=shepherd-dev.markdown-shell-runner) extension. 

Then you can just click the 'run' button to run the command directly from the markdown file. The commands run in the directory that the .md file is contained. 

I also recommend [claude-devtools](https://claude-dev.tools/). This will let you view what happened in the headless session. 

_If you know of other visualisation tools for other harnesses, please let me know!_



**Important instructions**

Recommend running your LLM harness via CLI **not from the repository root** run from the `[ai-tool]` directory instead. You want the AI to be seeing that as the project root. 



