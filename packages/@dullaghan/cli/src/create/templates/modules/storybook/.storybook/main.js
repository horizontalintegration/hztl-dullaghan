const path = require('path');

module.exports = {
  core: {
    builder: 'webpack5',
  },
  stories: ['../components/**/*.stories.mdx', '../components/**/*.stories.@(js|jsx|ts|tsx)'],
  staticDirs: ['../public'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-postcss',
    'storybook-addon-next',
  ],
  framework: '@storybook/react',
  webpackFinal: async (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      lib: path.resolve(__dirname, '../lib'),
      components: path.resolve(__dirname, '../components'),
      temp: path.resolve(__dirname, '../temp'),
    };

    return config;
  },
};
