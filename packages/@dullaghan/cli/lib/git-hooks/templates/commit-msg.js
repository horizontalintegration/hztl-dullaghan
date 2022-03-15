export const commitMsg = () => `#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

echo "Running commit-msg checks 🔎"

# Validate commit message is in the correct format
npx commitlint --edit 
`;
