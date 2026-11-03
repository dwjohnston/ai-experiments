import { declareTestCase } from "thunderjar";

// security/claude-code Example 2: regular-file.txt denied by permissions only.
export default declareTestCase({
  baseImage: ["node20"],
  codeState: ["security-claude-code"],
  promptSet: ["settings-no-sandbox"],
  // Or "claude-code@2.1.317/haiku-4-5", with ANTHROPIC_API_KEY set.
  harnessModel: ["claude-code-deepseek@2.1.317/deepseek-flash"],
  task: "regular-file",
  initialPrompt: ["node", "bun"],
  iterations: 3,
});
