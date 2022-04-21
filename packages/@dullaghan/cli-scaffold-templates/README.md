# `@dullaghan/cli-scaffold-templates`

Default scaffold templates to use in your dullaghan config file.

## Usage

Install the package as a dev dependency

```
npm i -D @dullaghan/cli-scaffold-templates
```

Set the desired templates in your `dullaghan.config.js` file

```js
import { reactComponent } from '@dullaghan/cli-scaffold-templates';

export const config = {
  projectType: 'React',
  scaffold: {
    subdirectories: [...],
    templates: {
      '[name].tsx': reactComponent,
    }
  }
}
```

### JSS

With JSS templates you'll also want to include the `jssScaffoldOpts` so the values can be populated in the templates

```js
import { jssAuthorableComponent, jssScaffoldOpts } from '@dullaghan/cli-scaffold-templates';

export const config = {
  projectType: 'JSS',
  scaffold: {
    subdirectories: [...],
    templates: {
      '[name].tsx': jssAuthorableComponent,
    }
    scaffoldOpts [...jssScaffoldOpts],
  }
}
```
