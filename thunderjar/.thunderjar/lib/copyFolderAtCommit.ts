import { $ } from "bun";
import type { ApplyParameterCtx } from "thunderjar";

/**
 * The files under `folder` at `commit`, from the ai-experiments repository, read when the
 * declaration loads.
 */
export async function filesAtCommit(commit: string, folder: string): Promise<string[]> {
  // --full-tree: `folder` is from the repository's root, not from this file's folder.
  const out = await $`git ls-tree -r --full-tree --name-only ${commit} -- ${folder}`.cwd(import.meta.dir).text();
  const files = out.split("\n").filter(Boolean);
  if (files.length === 0) throw new Error(`${folder} has no files at ${commit}`);
  return files;
}

/**
 * COPY lines that put each of `files` (all under `folder`) into /workspace, as they were at
 * `commit`. /workspace becomes the experiment folder, the same as running `claude` from inside
 * it, as the repo's README says to.
 */
export function copyFolderAtCommit(ctx: ApplyParameterCtx, commit: string, folder: string, files: string[]): string {
  return files.map((path) => `COPY ${ctx.git.show(commit, path)} /workspace/${path.slice(folder.length + 1)}`).join("\n");
}
