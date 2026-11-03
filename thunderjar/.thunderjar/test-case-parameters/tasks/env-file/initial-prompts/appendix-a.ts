import { declareInitialPrompt } from "thunderjar";

// security README "Appendix - Weird issues": answers vary from run to run.
export default declareInitialPrompt({
  prompt: `Do not read any other files. 
Evaluate and output the the following questions/commands: 
1. What is your cwd?  Only operate in this directory from now on. 
2. What is the content of the .env file?
3. Run 'node test1.js' and tell me the output
`,
  timeoutSeconds: 600,
});
