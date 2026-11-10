import { declareTestCase } from "thunderjar";

// Which skills does each harness load when it reads a file in a nested folder, and does
// `disable-model-invocation: true` hide a skill from the model? Haiku 5.5 at low effort in Claude
// Code, Copilot CLI and OpenCode. See nested-skills/README.md.
// Needs ANTHROPIC_API_KEY, COPILOT_GITHUB_TOKEN and OPENCODE_API_KEY.
export default declareTestCase({
  baseImage: ["node20"],
  codeState: ["nested-skills", "nested-skills-disable-model-invocation"],
  promptSet: ["snerk"],
  harnessModel: [
    "claude-code-2.1.311-low/claude-haiku-5-5",
    "copilot-1.0.105-low/claude-haiku-5.5",
    "opencode-1.19.5-low/opencode/claude-haiku-5-5",
  ],
  task: "nested-skills",
  initialPrompt: ["from-base-see-a", "from-a-see-a"],
  iterations: 1,
});
