// The nested-skills experiment folder, as /workspace. It's cloned from this repository at a pinned
// commit, so editing the folder doesn't change what an old run measured. /workspace is made its own
// git repository, so harnesses that stop at the git root (Copilot, OpenCode) see the same tree
// Claude Code does. Its README is left out: it says which emojis to expect.
export type NestedSkillsConfig = { repo: string; commit: string; folder: string };

export const NESTED_SKILLS: NestedSkillsConfig = {
  repo: "https://github.com/dwjohnston/ai-experiments.git",
  commit: "2acaef1caf637192df4ccc1a89f42a468eba6f1c",
  folder: "nested-skills",
};

/** The RUN lines that copy the folder into /workspace. `then` runs in /workspace before the commit. */
export const copyNestedSkills = (config: NestedSkillsConfig, then?: string) => `RUN git clone --quiet ${config.repo} /tmp/repo \\
  && git -C /tmp/repo checkout --quiet --detach ${config.commit} \\
  && cp -a /tmp/repo/${config.folder}/. /workspace/ \\
  && rm -rf /tmp/repo \\
  && cd /workspace \\
  && rm README.md${then ? ` \\\n  && ${then}` : ""} \\
  && git init --quiet && git add -A && git commit --quiet -m "nested-skills"`;
