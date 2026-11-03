import { declareInitialPrompt } from "thunderjar";

// README "Detective v2b": the skill's sub-agent can't see the ducky's name, so boy-and-the-kite isn't listed.
export default declareInitialPrompt({
  turns: ["I have a rubber ducky named Eli.", "/detective-v2b bears", "What is my rubber ducky's name?"],
  timeoutSeconds: 600,
});
