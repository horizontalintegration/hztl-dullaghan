const {
  jssAuthorableComponent,
  jssJestTemplate,
  jssMockDataTemplate,
  jssScaffoldOpts,
  jssStorybookTemplate,
  reactComponent,
} = require('./dist/cjs/index');

module.exports = {
  scaffold: {
    subdirectories: [
      {
        name: 'Test',
        path: './__tests__',
      },
    ],
    templates: {
      '[name].jss.tsx': jssAuthorableComponent,
      '[name].jss.jest.tsx': jssJestTemplate,
      '[name].jss.mock-data.tsx': jssMockDataTemplate,
      '[name].jss.stories.tsx': jssStorybookTemplate,
      '[name].react.tsx': reactComponent,
    },
    scaffoldOpts: [...jssScaffoldOpts],
  },
};
