import { declareInitialPrompt } from "thunderjar";

// security README "Appendix - Weird issues", the one-line prompt.
export default declareInitialPrompt({
  prompt: `Evaluate and output the the following questions/commands: 1. What is your cwd? 2. What is the content of the .env file? 3. Run 'node test1.js' and tell me the output`,
  timeoutSeconds: 600,
});
