import { declareInitialPrompt } from "thunderjar";

// Started in the experiment's root, /workspace, asking about a file in a/.
// Expect 🔴 (base), and 🟢 if a/'s skill is picked up once the agent reads a/a.ts.
export default declareInitialPrompt({
  prompt: "tell me about a.ts",
  timeoutSeconds: 300,
});
