export const storybookConfig: DullaghanCli.Create.ModuleConfig = {
  scripts: [['storybook', 'start-storybook -s public -p 3000']],
  devDependencies: [
    ['@storybook/addon-actions', '^6.4.19'],
    ['@storybook/addon-essentials', '^6.4.19'],
    ['@storybook/addon-interactions', '^6.4.19'],
    ['@storybook/addon-links', '^6.4.19'],
    ['@storybook/react', '^6.4.19'],
    ['@storybook/testing-library', '0.0.9'],
  ],
};
