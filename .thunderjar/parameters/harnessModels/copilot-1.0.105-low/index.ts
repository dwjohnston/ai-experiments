import { declareHarness, writeModel, writeRunScript } from "thunderjar";

// GitHub Copilot CLI at low reasoning effort: the starter copilot-1.0.105 harness, with
// `--reasoning-effort low`, and `-s` so the result file holds only the agent's reply.
// e.g. "copilot-1.0.105-low/claude-haiku-5.5". COPILOT_GITHUB_TOKEN is a GitHub token with Copilot access.
export default declareHarness({
  version: "1.0.105",
  applyParameter: (_config, ctx) =>
    [
      `RUN npm install -g @github/copilot@${ctx.version}`,
      "RUN mkdir -p /thunderjar && chown -R node:node /workspace /thunderjar",
      writeModel(ctx.modelId),
      writeRunScript(
        'copilot -p "$(cat /thunderjar/prompt.txt)" --model "$(cat /thunderjar/model.txt)" --reasoning-effort low --allow-all-tools --no-color -s > /thunderjar/result.json',
      ),
      "USER node",
    ].join("\n"),
  collectReply: (raw) => raw.trim(),
  requiredEnv: ["COPILOT_GITHUB_TOKEN"],
});
