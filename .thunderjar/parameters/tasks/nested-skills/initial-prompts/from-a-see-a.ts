import { declareInitialPrompt, writePrompt } from "thunderjar";

// Started in a/, asking about the file in it. Expect 🟢 (a), and 🔴 if base's skill, one folder up,
// is picked up too.
export default declareInitialPrompt({
  timeoutSeconds: 300,
  applyParameter: () => [writePrompt("tell me about a.ts"), "WORKDIR /workspace/a"].join("\n"),
});
