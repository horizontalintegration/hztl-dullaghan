# scaffold

## Customizing for your project

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

| Key            | Type                                       | Description                                                                                                                                             |
| -------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| projectName    | `JSS` or `React`                           | Controls the config options passed to the template files.                                                                                               |
| subdirectories | `DullaghanCli.Scaffold.Subdirectory[]`     | An array of subdirectory objects to create components in.                                                                                               |
| templates      | `DullaghanCli.Scaffold.TemplateDictionary` | An object containing template methods keyed by desired filename. The token `[name]` is replaced by the component name provided to the scaffold command. |

### @dullaghan/cli-scaffold-templates

TODO: Add a link here
Check out the @dullaghan/cli-scaffold-templates package if you want to use some of the defaults we've provided.
