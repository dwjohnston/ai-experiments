import { claudeCodeReply, declareHarness } from "thunderjar";

// Claude Code, on DeepSeek's Anthropic-compatible API, so the experiments can run without an
// Anthropic key. Otherwise the same as ../claude-code: see there.
//
// Sub-agents (the detective-v2 skills use one) would otherwise ask for a Haiku model, so they're
// pointed at the same DeepSeek model.
export default declareHarness({
  applyParameter: (_config, ctx) => `RUN npm install -g @anthropic-ai/claude-code@${ctx.version}
RUN mkdir -p /thunderjar && chown -R node:node /workspace /thunderjar
USER node
RUN echo '{"projects":{"/workspace":{"hasTrustDialogAccepted":true}}}' > /home/node/.claude.json`,
  cli: (ctx) =>
    `ANTHROPIC_BASE_URL=https://api.deepseek.com/anthropic ANTHROPIC_AUTH_TOKEN="$DEEPSEEK_API_KEY"` +
    ` ANTHROPIC_DEFAULT_HAIKU_MODEL=${ctx.modelId} CLAUDE_CODE_SUBAGENT_MODEL=${ctx.modelId}` +
    ` claude -p "$(cat ${ctx.promptPath})" --model ${ctx.modelId} --output-format json` +
    ` ${ctx.turn === 0 ? "--session-id" : "--resume"} ${ctx.sessionId} > ${ctx.resultPath}`,
  collectReply: claudeCodeReply,
  requiredEnv: ["DEEPSEEK_API_KEY"],
});
