export const storybookPackageConfig = {
    scripts: [['storybook', 'start-storybook -s public -p 3000']],
    devDependencies: [
        ['@storybook/addon-actions', '^6.5.0-alpha.50'],
        ['@storybook/addon-essentials', '^6.5.0-alpha.50'],
        ['@storybook/addon-interactions', '^6.5.0-alpha.50'],
        ['@storybook/addon-links', '^6.5.0-alpha.50'],
        ['@storybook/react', '^6.5.0-alpha.50'],
        ['@storybook/addon-postcss', '^2.0.0'],
        ['storybook-addon-next', '^1.6.2'],
    ],
};
