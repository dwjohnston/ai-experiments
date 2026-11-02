#!/bin/sh
# Used by promptfooconfig.macos.yaml: runs $1 from security/no-ai and prints
# its combined output followed by "exit=<code>". Always exits 0 so promptfoo
# scores the output instead of treating a failing command as a provider error.
cd "$(dirname "$0")/../../security/no-ai" || exit 1
sh -c "$1" 2>&1
echo "exit=$?"
