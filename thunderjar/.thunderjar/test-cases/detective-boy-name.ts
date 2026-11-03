import { declareTestCase } from "thunderjar";

// detective-skill: does a skill's reading leak into the main session? /detective vs /detective-v2,
// with the skills where Claude Code loads them (.claude/skills) and where it doesn't (.agents/skills).
export default declareTestCase({
  baseImage: ["node20"],
  codeState: ["detective-claude-code", "detective-generic"],
  promptSet: ["as-committed"],
  // Or "claude-code@2.1.317/haiku-4-5", with ANTHROPIC_API_KEY set.
  harnessModel: ["claude-code-deepseek@2.1.317/deepseek-flash"],
  task: "boy-name-leak",
  initialPrompt: ["detective", "detective-v2"],
  iterations: 3,
});
