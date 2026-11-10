import { declareCodeState } from "thunderjar";

// The project's repository, cloned into /workspace at a commit. The commit must be pushed, so the
// build can fetch it. Pin a commit, never a branch: the same text must always build the same thing.
export default declareCodeState({
  config: {
    repo: "https://github.com/dwjohnston/ai-experiments",
    commit: "2acaef1caf637192df4ccc1a89f42a468eba6f1c",
  },
  applyParameter: (config) => `RUN git clone --quiet ${config.repo} /workspace \\
  && git -C /workspace checkout --quiet --detach ${config.commit} \\
  && git -C /workspace remote remove origin`,
});
