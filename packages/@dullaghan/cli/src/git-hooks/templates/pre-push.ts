import { DullaghanCli } from '@dullaghan/cli-shared-utils';

export const prePush: DullaghanCli.CommitHooks.Template = (name) => `#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

# Ensure that our branch name is in the correct format

echo "Running pre-push checks 🔎"

# Set the Jira project prefix
projectname="${name}"

# Get the current branch and apply it to a variable
currentbranch=\`git branch | grep \* | cut -d ' ' -f2\`
# Test current branch name
if [[ "$currentbranch" =~ ^(release|hotfix|feature|bug)/($projectname)-[0-9]+-[a-z0-9-]+ ]]
then
  echo "Branch name is properly formatted"
  echo " "
else
  echo "Your branch name should be in the following format:"
  echo "  feature/$projectname-001-hello-world"
  echo " "
  echo "Further documentation on proper branch naming can be found here:"
  echo "https://horizontal.atlassian.net/wiki/spaces/HOR/pages/2830270822/Process#Branch-naming"
  echo " "
  exit 1
fi

# Run longer tasks like typescript compilation and unit tests
npm run pre-push
`;
