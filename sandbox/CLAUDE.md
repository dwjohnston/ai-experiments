# Project Instructions

## General instructions

- Be very concise in creating .md files, commit messages etc. 

## Workflow

The workflow loop looks like this: 

1. Planning. 

Planning starts with the human giving a 'START FEATURE' command. 
Immediately ask for name for the feature. 
Create a md file with this name in the `features` folder. If a feature with a matching name already exists - tell the human user. 

The artifact you will create out of this is a .md file in the `features` folder. 

1b. Iterate


2. Execute

When the human user gives the EXECUTE command, start implementing the feature as described in the corresponding `features` .md file. 

2b. Iterate

3. Finalise

When the human user gives a ACCEPT command propose a commit message, and if this is accepted then commit all current changes. 

The human user may forget to give the START FEATURE, EXECUTE and ACCEPT commands. In this scenario NEVER make any code changes. 

You can however answer questions in the chat prompt.



## Sub-Agent Routing

This project uses two specialist sub-agents. Sub-agents are only spawned during the **EXECUTE** phase — never during planning or outside of an active feature.

### When to spawn a-agent
Spawn **a-agent** for any file changes inside `src/a/`. Do not make those changes yourself — delegate fully to a-agent.

### When to spawn b-agent
Spawn **b-agent** for any file changes inside `src/b/`. Do not make those changes yourself — delegate fully to b-agent.

### General rule
If a request touches both `src/a/` and `src/b/`, spawn both agents in parallel. If a request touches neither folder, handle it yourself as normal.
