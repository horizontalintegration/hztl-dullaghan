# @dullahan/cli

Quickly create projects or component files.

## Create

```
dullahan create <ProjectName>
```

## Scaffold

```
dullahan scaffold <ComponentName>
```

### Configuration

#### Subdirectories

The scaffold method is configured with a default set of subdirectories for your components. We reccomend matching these subdirectories to the subdirectories in the Sitecore instance if possible.

If you want to customize the subdirectories available, you can add them in the `dullahan.config.js` file like so:

```js
scaffold: {
  subdirectories: [
    {
      path: '/path/to/subdirectory/',
      name: 'MySubdirectory',
      dataComponent: 'authorable/my-subdirectory/',
      storybook: 'Authorable/MySubdirectory',
    },
  ],
}
```

#### Templates

You can customize templates globally, and/or on a per subdirectory basis. Templates should be keyed by the desired filename, and have a value of the scaffold template file. The string `[name]` in filenames will be replaced with the supplied component name.

Scaffold templates should be a method that takes params of type `DullahanCli.Scaffold.TemplateArgs` and returns a string.

**Globally**

```js
import myComponentTemplate from './path/to/template';

{
  scaffold: {
    ...
    templates: {
      '[name].tsx': myComponentTemplate,
    },
  }
}

```

**Per subdirectory**

```js
import myHelperComponentTemplate from './path/to/template';

{
  scaffold: {
    subdirectories: [
      {
        ...
        templates: {
          '[name].tsx': myHelperComponentTemplate,
        }
      },
    ],
    ...
  }
}
```
