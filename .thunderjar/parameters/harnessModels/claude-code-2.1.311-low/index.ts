import { CLAUDE_CODE_COMMAND, claudeCode } from "thunderjar";

// Claude Code at low effort: the starter claude-code-2.1.311 harness, with `--effort low`.
// e.g. "claude-code-2.1.311-low/claude-haiku-5-5".
export default claudeCode({
  version: "2.1.311",
  command: CLAUDE_CODE_COMMAND.replace(" --output-format", " --effort low --output-format"),
});
