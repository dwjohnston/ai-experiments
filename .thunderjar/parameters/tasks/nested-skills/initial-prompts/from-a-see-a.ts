import { declareInitialPrompt } from "thunderjar";

// Started in a/, asking about the file in it. Expect 🟢 (a), and 🔴 if base's skill, one folder up,
// is picked up too.
export default declareInitialPrompt({
  prompt: "tell me about a.ts",
  timeoutSeconds: 300,
  applyParameter: () => "WORKDIR /workspace/a",
});
