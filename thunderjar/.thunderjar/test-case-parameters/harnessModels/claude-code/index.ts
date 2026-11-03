import { claudeCodeReply, declareHarness } from "thunderjar";

// Claude Code, run as the image's non-root `node` user.
//
// No --dangerously-skip-permissions: the README runs `claude -p` in its default permission mode,
// where .claude/settings.json's allow and deny rules decide what the agent may do, and the
// security experiments are about exactly that.
//
// /workspace is marked as trusted, as the README's folder is on a machine where you've run
// `claude` before. In an untrusted workspace, Claude Code ignores .claude/settings.json's
// `permissions.allow`, so `bun test2.js` waits for an approval nobody can give.
export default declareHarness({
  applyParameter: (_config, ctx) => `RUN npm install -g @anthropic-ai/claude-code@${ctx.version}
RUN mkdir -p /thunderjar && chown -R node:node /workspace /thunderjar
USER node
RUN echo '{"projects":{"/workspace":{"hasTrustDialogAccepted":true}}}' > /home/node/.claude.json`,
  // Turn 0 starts the session and later turns resume it, like the README's
  // `--session-id "$SESSION_ID"`, then `--resume "$SESSION_ID"`.
  cli: (ctx) =>
    `claude -p "$(cat ${ctx.promptPath})" --model ${ctx.modelId} --output-format json` +
    ` ${ctx.turn === 0 ? "--session-id" : "--resume"} ${ctx.sessionId} > ${ctx.resultPath}`,
  collectReply: claudeCodeReply,
  requiredEnv: ["ANTHROPIC_API_KEY"],
});
