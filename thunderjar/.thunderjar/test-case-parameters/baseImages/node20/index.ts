import { declareBaseImage } from "thunderjar";

// bubblewrap and socat: Claude Code's Linux sandbox, which the security experiments rely on.
// bun: security/claude-code's bun notes. ripgrep: Claude Code's Grep tool.
export default declareBaseImage({
  applyParameter: () => `FROM node:20-bookworm
RUN apt-get update && apt-get install -y --no-install-recommends bubblewrap socat ripgrep && rm -rf /var/lib/apt/lists/*
RUN npm install --global bun@1.3.14`,
  // bubblewrap makes user namespaces, which Docker's default seccomp and AppArmor profiles block,
  // and mounts a new /proc, which Docker's masked /proc paths block. Without these, every sandboxed
  // Bash command fails with "bwrap: Can't mount proc on /newroot/proc: Operation not permitted".
  runOptions: [
    "--security-opt", "seccomp=unconfined",
    "--security-opt", "apparmor=unconfined",
    "--security-opt", "systempaths=unconfined",
  ],
});
