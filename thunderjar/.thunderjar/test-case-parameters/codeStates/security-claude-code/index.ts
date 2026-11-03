import { declareCodeState } from "thunderjar";
import { copyFolderAtCommit, filesAtCommit } from "../../../lib/copyFolderAtCommit.ts";

// security/claude-code/ as /workspace. The security experiment: .env, the test scripts, and .claude/settings*.json.
// Pinned to a commit, so editing the folder doesn't change what an old run measured.
const config = { commit: "2b26f10c5e89dd04f8906902794c7ac602aca2d7", folder: "security/claude-code" };
const files = await filesAtCommit(config.commit, config.folder);

export default declareCodeState({
  config,
  applyParameter: (config, ctx) => copyFolderAtCommit(ctx, config.commit, config.folder, files),
});
