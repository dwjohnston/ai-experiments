import { declareInitialPrompt } from "thunderjar";

// README "Detective v2b", second half: without a sub-agent the skill sees the ducky's name, so
// boy-and-the-kite is listed.
export default declareInitialPrompt({
  turns: ["I have a rubber ducky named Eli.", "/detective-v2a bears", "What is my rubber ducky's name?"],
  timeoutSeconds: 600,
});
