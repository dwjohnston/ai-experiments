import { declareInitialPrompt } from "thunderjar";

// Control for v2b: the same turns, with no ducky to know about.
export default declareInitialPrompt({
  turns: ["Hello.", "/detective-v2b bears", "What is my rubber ducky's name?"],
  timeoutSeconds: 600,
});
