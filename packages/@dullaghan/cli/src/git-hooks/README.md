# git-hooks

This command installs and configures husky to run several git hooks. It should be run once at the root of your project, ideally as part of the original project commit.

## Additional setup

`git-hooks` only installs a simple shell for the hooks, you'll need to do some additional configuration after it's complete in order to get the most out of your process.

Three scripts are added to your project's `package.json` that can and should be configured to meet your project's needs.

- **prepare** - An out of the box [npm lifecycle hook](https://docs.npmjs.com/cli/v8/using-npm/scripts#life-cycle-scripts) that will install husky for each subsequent team member who installs the project. If team members are already working on the project in parallel, have them run `npm run prepare` once the changes included here are pushed.
- **pre-commit** - This will attempt to use a `lint` command if it already exists within your `package.json`. It should be configured for shorter tasks like linting or running [prettier](https://www.npmjs.com/package/prettier).
- **pre-publish** - This will attempt to use a `test` command if it already exists within your `package.json`. It should be configured for longer tasks like unit tests and typescript compilation.

### Removing hooks

If you want to remove one or more of these hooks, you can remove the script from the `package.json` and delete the respective file from the `.husky` directory.
