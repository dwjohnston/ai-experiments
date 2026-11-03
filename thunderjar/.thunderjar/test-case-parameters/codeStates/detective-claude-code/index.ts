import { declareCodeState } from "thunderjar";
import { copyFolderAtCommit, filesAtCommit } from "../../../lib/copyFolderAtCommit.ts";

// detective-skill/claude-code/ as /workspace. The detective skills in .claude/skills/, and the haystack/ stories.
// Pinned to a commit, so editing the folder doesn't change what an old run measured.
const config = { commit: "2b26f10c5e89dd04f8906902794c7ac602aca2d7", folder: "detective-skill/claude-code" };
const files = await filesAtCommit(config.commit, config.folder);

export default declareCodeState({
  config,
  applyParameter: (config, ctx) => copyFolderAtCommit(ctx, config.commit, config.folder, files),
});
