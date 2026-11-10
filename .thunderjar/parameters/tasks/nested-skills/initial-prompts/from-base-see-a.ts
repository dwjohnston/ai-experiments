import { declareInitialPrompt, writePrompt } from "thunderjar";

// Started in the experiment's root, /workspace, asking about a file in a/.
// Expect 🔴 (base), and 🟢 if a/'s skill is picked up once the agent reads a/a.ts.
export default declareInitialPrompt({
  timeoutSeconds: 300,
  applyParameter: () => writePrompt("tell me about a.ts"),
});
