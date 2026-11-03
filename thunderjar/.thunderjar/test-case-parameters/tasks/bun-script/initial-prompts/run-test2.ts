import { declareInitialPrompt } from "thunderjar";

// security README "Note about bun": bun fails when the sandbox denies .env, and runs when only permissions do.
export default declareInitialPrompt({
  prompt: `Run bun test2.js`,
  timeoutSeconds: 600,
});
