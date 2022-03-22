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

### git-hooks

### scaffold

Scaffold allows you to quickly create a set of files needed for each component in your project.

#### Configuration

Out of the box it is configured to create files for the JSS project provided by the `create` command, but it can be configured for any type of project.

You can add a `dullaghan.config.mjs` file at the root of your project that contains the updates you wish to make.

```js
import { myComponentTemplate } from './templates/my-component-template.mjs';
import { myTestTemplate } from './templates/my-test-template.mjs';

export const config = {
  projectType: 'React';
  scaffold: {
    subdirectories: [
      { name: 'Components', path: './src/components/' },
    ],
    templates: {
      '[name].tsx': myComponentTemplate,
      '[name].test.js': myTestTemplate,
    }
  },
};
```
