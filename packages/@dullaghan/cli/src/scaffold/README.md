# scaffold

Quickly build a custom set of files for components.

## Usage

```
dullaghan scaffold <ComponentName>
```

## Customizing for your project

Adding a `scaffold` key to your `dullaghan.config` file allows you to customize what files get built where. It also provides a consistent baseline so projects with multiple developers don't end up with a messy project architecture.

```js
// Import my local template files
const { myComponentTemplate } = require('./templates/my-component-template.js');
const { myTestTemplate } = require('./templates/my-test-template.js');

module.exports = {
  // Declare my custom scaffold config
  scaffold: {
    subdirectories: [{ name: 'Components', path: './src/components/' }],
    templates: {
      '[name].tsx': myComponentTemplate,
      '[name].test.js': myTestTemplate,
    },
    scaffoldOpts: [
      {
        type: 'checkbox',
        name: 'hasGraphQL',
        message: 'Does this component use client-side GraphQL?',
      },
    ],
  },
};
```

| Key            | Type                                       | Description                                                                                                                                                                                                                                                                                                                                                                           |
| -------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| subdirectories | `DullaghanCli.Scaffold.Subdirectory[]`     | An array of subdirectories components may be created in. Data in these objects will be available in the template methods via the `subdirectory` option. You can also provide subdirectory specific template additions and overrides by adding a `templates` key to the specific subdirectory object. If a name matches one in the global `templates` object, it will be used instead. |
| templates      | `DullaghanCli.Scaffold.TemplateDictionary` | An object containing template methods keyed by desired filename. The token `[name]` is replaced by the component name provided to the scaffold command.                                                                                                                                                                                                                               |
| scaffoldOpts   | `inquirer.QuestionCollection<any>`         | An array of [inquirer](https://www.npmjs.com/package/inquirer) questions to prompt the user with. The values will be added to the template method arguments based on their `name` value.                                                                                                                                                                                              |

[DullaghanCli type definitions](https://github.com/horizontalintegration/hztl-dullaghan/blob/main/packages/%40dullaghan/cli-shared-utils/src/dullaghan-cli.ts)

### @dullaghan/cli-scaffold-templates

Check out the [@dullaghan/cli-scaffold-templates](https://www.npmjs.com/package/@dullaghan/cli-scaffold-templates) package if you want to use some of the defaults we've provided.
