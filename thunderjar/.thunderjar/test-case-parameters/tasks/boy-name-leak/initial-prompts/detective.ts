import { declareInitialPrompt } from "thunderjar";

// README "Example 1 - Detective - baseline": the skill reads every story into the main session.
export default declareInitialPrompt({
  turns: ["/detective bears", "Do not read any files. What is the boy in the 'boy and the kite' stories name?"],
  timeoutSeconds: 600,
});
