import { declareCodeState } from "thunderjar";
import { copyFolderAtCommit, filesAtCommit } from "../../../lib/copyFolderAtCommit.ts";

// detective-skill/generic/ as /workspace. The same skills, but in .agents/skills/ (the agentskills.io location), which Claude Code doesn't load.
// Pinned to a commit, so editing the folder doesn't change what an old run measured.
const config = { commit: "2b26f10c5e89dd04f8906902794c7ac602aca2d7", folder: "detective-skill/generic" };
const files = await filesAtCommit(config.commit, config.folder);

export default declareCodeState({
  config,
  applyParameter: (config, ctx) => copyFolderAtCommit(ctx, config.commit, config.folder, files),
});
