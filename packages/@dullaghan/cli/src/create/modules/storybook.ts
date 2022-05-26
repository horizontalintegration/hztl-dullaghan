import { DullaghanCli } from '@dullaghan/cli-shared-utils';

export const storybookPackageConfig: DullaghanCli.Create.ModulePackageConfig = {
  scripts: [['storybook', 'start-storybook -p 3000']],
  devDependencies: [
    ['@storybook/manager-webpack5', '^6.5.5'],
    ['@storybook/builder-webpack5', '^6.5.5'],
    ['@storybook/addon-actions', '^6.5.5'],
    ['@storybook/addon-essentials', '^6.5.5'],
    ['@storybook/addon-interactions', '^6.5.5'],
    ['@storybook/addon-links', '^6.5.5'],
    ['@storybook/react', '^6.5.5'],
    ['@storybook/addon-postcss', '^2.0.0'],
    ['storybook-addon-next', '^1.6.4'],
  ],
};
