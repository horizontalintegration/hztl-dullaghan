import { DullaghanCli } from '@dullaghan/cli-shared-utils';

export const preCommit: DullaghanCli.CommitHooks.Template = () => `#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

echo "Running pre-commit checks 🔎"

# Run short tasks like prettier and linting
npm run pre-commit`;
