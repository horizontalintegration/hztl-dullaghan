import { DullaghanCli } from '@dullaghan/cli-shared-utils';

export const storybookPackageConfig: DullaghanCli.Create.ModulePackageConfig = {
  scripts: [['storybook', 'start-storybook -p 3000']],
  devDependencies: [
    ['@storybook/addon-actions', '^6.4.22'],
    ['@storybook/addon-essentials', '^6.4.22'],
    ['@storybook/addon-interactions', '^6.4.22'],
    ['@storybook/addon-links', '^6.4.22'],
    ['@storybook/react', '^6.4.22'],
    ['@storybook/addon-postcss', '^2.0.0'],
    ['storybook-addon-next', '^1.6.2'],
  ],
};
