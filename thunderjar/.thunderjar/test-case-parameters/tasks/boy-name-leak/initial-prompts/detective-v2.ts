import { declareInitialPrompt } from "thunderjar";

// README "Detective v2": the skill reads the stories in a sub-agent, and only file names come back.
export default declareInitialPrompt({
  turns: ["/detective-v2 bears", "Do not read any files. What is the boy in the 'boy and the kite' stories name?"],
  timeoutSeconds: 600,
});
