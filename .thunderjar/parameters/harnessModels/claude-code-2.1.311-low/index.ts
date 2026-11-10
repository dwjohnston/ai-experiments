import { claudeCode } from "thunderjar";

// Claude Code at low effort: the starter claude-code-2.1.311 harness, with `--effort low`.
// e.g. "claude-code-2.1.311-low/claude-haiku-5-5".
export default claudeCode({
  version: "2.1.311",
  cli: (ctx) =>
    `claude -p "$(cat ${ctx.promptPath})" --model ${ctx.modelId} --effort low --output-format json --dangerously-skip-permissions` +
    ` ${ctx.turn === 0 ? "--session-id" : "--resume"} ${ctx.sessionId} > ${ctx.resultPath}`,
});
