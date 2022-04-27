# `@dullaghan/cli`

==This package is currently a work in progress and is changing frequently as we field test it internally.==

## Usage

Install the CLI globally

```
npm i -g @dullaghan/cli

```

List available methods

```
dullaghan help
```

### create

Builds our JSS starter template for you.

See the [create docs](https://github.com/horizontalintegration/hztl-dullaghan/tree/main/packages/%40dullaghan/cli/src/create) for more info.

### git-hooks

Initializes git and configures [husky](https://www.npmjs.com/package/husky) for running our preferred set of pre-commit and pre-push hooks.

See the [git-hooks docs](https://github.com/horizontalintegration/hztl-dullaghan/tree/main/packages/%40dullaghan/cli/src/git-hooks) for more info.

### scaffold

Scaffold allows you to quickly create a set of files needed for each component in your project.

See the [scaffold docs](https://github.com/horizontalintegration/hztl-dullaghan/tree/main/packages/%40dullaghan/cli/src/scaffold) for more info on configuring your specific project.
