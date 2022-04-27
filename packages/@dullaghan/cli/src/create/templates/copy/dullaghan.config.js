const { 
  jssAuthorableComponent, 
  jssJestTemplate, 
  jssMockDataTemplate, 
  jssStorybookTemplate,
  jssScaffoldOpts,
  reactComponent 
} = require('@dullaghan/cli-scaffold-templates')

module.exports = {
  projectType: 'JSS',
  scaffold: {
    subdirectories: [
      {
        path: './components/authorable/general',
        name: 'General',
        dataComponent: 'authorable/general/',
        storybook: 'Authorable/General/',
      },
      {
        path: './components/authorable/layout',
        name: 'Layout',
        dataComponent: 'authorable/layout/',
        storybook: 'Authorable/Layout/',
      },
      {
        path: './components/authorable/listing',
        name: 'Listing',
        dataComponent: 'authorable/listing/',
        storybook: 'Authorable/Listing/',
      },
      {
        path: './components/authorable/site',
        name: 'Site',
        dataComponent: 'authorable/site/',
        storybook: 'Authorable/Site/',
      },
      {
        path: './components/helpers',
        name: 'Helpers',
        dataComponent: 'helpers/',
        storybook: 'Helpers/',
        templates: {
          '[name].tsx': reactComponent,
        },
      },
    ],
    templates: {
      '[name].tsx': jssAuthorableComponent,
      '[name].test.js': jssJestTemplate,
      '[name].mock-data.js': jssMockDataTemplate,
      '[name].stories.jsx': jssStorybookTemplate,
    },
    scaffoldOpts: jssScaffoldOpts,
  },
};