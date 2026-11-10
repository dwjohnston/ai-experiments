import { declareHarness } from "thunderjar";

// OpenCode on OpenCode Zen at low reasoning effort: the starter opencode-1.19.5 harness, with
// `--variant low`. e.g. "opencode-1.19.5-low/opencode/claude-haiku-5-5". OPENCODE_API_KEY is an OpenCode Zen key.
export default declareHarness({
  version: "1.19.5",
  applyParameter: (_config, ctx) => `RUN npm install -g opencode-ai@${ctx.version}
RUN mkdir -p /thunderjar && chown -R node:node /workspace /thunderjar
USER node`,
  cli: (ctx) =>
    `opencode run --model ${ctx.modelId} --variant low --format json${ctx.turn === 0 ? "" : " --continue"}` +
    ` "$(cat ${ctx.promptPath})" > ${ctx.resultPath}`,
  // `--format json` writes one JSON event per line. The reply is the text of its "text" events.
  collectReply: (raw) =>
    raw
      .split("\n")
      .filter((line) => line.trim().startsWith("{"))
      .map((line) => JSON.parse(line) as { type?: string; part?: { text?: string } })
      .filter((event) => event.type === "text" && typeof event.part?.text === "string")
      .map((event) => event.part!.text)
      .join("\n"),
  requiredEnv: ["OPENCODE_API_KEY"],
});
