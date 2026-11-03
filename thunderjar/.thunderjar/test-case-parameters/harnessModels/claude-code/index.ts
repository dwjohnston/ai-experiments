import { claudeCodeReply, declareHarness } from "thunderjar";

// Claude Code, run as the image's non-root `node` user.
//
// No --dangerously-skip-permissions: the README runs `claude -p` in its default permission mode,
// where .claude/settings.json's allow and deny rules decide what the agent may do, and the
// security experiments are about exactly that.
export default declareHarness({
  applyParameter: (_config, ctx) => `RUN npm install -g @anthropic-ai/claude-code@${ctx.version}
RUN mkdir -p /thunderjar && chown -R node:node /workspace /thunderjar
USER node`,
  // Turn 0 starts the session and later turns resume it, like the README's
  // `--session-id "$SESSION_ID"`, then `--resume "$SESSION_ID"`.
  cli: (ctx) =>
    `claude -p "$(cat ${ctx.promptPath})" --model ${ctx.modelId} --output-format json` +
    ` ${ctx.turn === 0 ? "--session-id" : "--resume"} ${ctx.sessionId} > ${ctx.resultPath}`,
  collectReply: claudeCodeReply,
  requiredEnv: ["ANTHROPIC_API_KEY"],
});
