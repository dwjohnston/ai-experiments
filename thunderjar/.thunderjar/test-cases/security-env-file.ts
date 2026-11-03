import { declareTestCase } from "thunderjar";

// security/claude-code Example 1 and the appendix: who can read .env, with the committed settings.
export default declareTestCase({
  baseImage: ["node20"],
  codeState: ["security-claude-code"],
  promptSet: ["as-committed"],
  // Or "claude-code@2.1.317/haiku-4-5", with ANTHROPIC_API_KEY set.
  harnessModel: ["claude-code-deepseek@2.1.317/deepseek-flash"],
  task: "env-file",
  initialPrompt: ["read-directly", "cat", "alternative-methods", "appendix-a", "appendix-b", "funny-a", "funny-b"],
  iterations: 3,
});
