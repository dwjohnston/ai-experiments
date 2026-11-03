import { declareTestCase } from "thunderjar";

// security/claude-code "Note about bun": bun under the .env sandbox rule, and with only a permissions rule.
export default declareTestCase({
  baseImage: ["node20"],
  codeState: ["security-claude-code"],
  promptSet: ["as-committed", "settings-disable-env-sandbox"],
  // Or "claude-code@2.1.317/haiku-4-5", with ANTHROPIC_API_KEY set.
  harnessModel: ["claude-code-deepseek@2.1.317/deepseek-flash"],
  task: "bun-script",
  initialPrompt: ["run-test2"],
  iterations: 3,
});
