import { declareTestCase } from "thunderjar";

// detective-skill "Detective v2b": can a skill see the session that called it?
export default declareTestCase({
  baseImage: ["node20"],
  codeState: ["detective-claude-code"],
  promptSet: ["as-committed"],
  // Or "claude-code-deepseek@2.1.317/deepseek-flash", with DEEPSEEK_API_KEY set.
  harnessModel: ["claude-code@2.1.317/haiku-4-5"],
  task: "ducky-context",
  initialPrompt: ["v2b", "v2a", "v2b-no-ducky"],
  iterations: 3,
});
