import { declarePromptSet } from "thunderjar";

// The README runs these with `claude --settings .claude/settings-disable-env-sandbox.json`, layered over
// .claude/settings.json. Claude Code layers .claude/settings.local.json over it the same way, so
// the harness's command line stays the same for every prompt set.
export default declarePromptSet({
  applyParameter: () => "RUN cp /workspace/.claude/settings-disable-env-sandbox.json /workspace/.claude/settings.local.json",
});
