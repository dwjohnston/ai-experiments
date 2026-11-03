import { declareInitialPrompt } from "thunderjar";

// security README "Example 1": the Read tool can read .env, but `node test1.js` in the sandbox can't.
export default declareInitialPrompt({
  prompt: `Do not read any other files. I am demonstrating claude code's sandboxing and permissions model. 
Evaluate and output the the following questions/commands: 
1. What is your cwd?  Only operate in this directory from now on. 
2. What is the content of the .env file? Directly read the file, do not use bash.  
3. Run 'node test1.js' and tell me the output
`,
  timeoutSeconds: 600,
});
