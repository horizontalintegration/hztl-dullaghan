import type { DullahanCli } from '../../dullahan-cli';
// Scaffold
import authorableComponent from './templates/authorable-component';
import helperComponent from './templates/helper-component';
import jest from './templates/jest';
import mockData from './templates/mock-data';
import storybook from './templates/storybook';

const config: DullahanCli.Scaffold.Config = {
  scaffold: {
    subdirectories: [
      {
        path: '/src/components/authorable/general',
        name: 'General',
        dataComponent: 'authorable/general/',
        storybook: 'Authorable/General/',
      },
      {
        path: '/src/components/authorable/listing',
        name: 'Listing',
        dataComponent: 'authorable/listing/',
        storybook: 'Authorable/Listing/',
      },
      {
        path: '/src/components/authorable/media',
        name: 'Media',
        dataComponent: 'authorable/media/',
        storybook: 'Authorable/Media/',
      },
      {
        path: '/src/components/helpers',
        name: 'Helpers',
        dataComponent: 'helpers/',
        storybook: 'Helpers/',
        templates: {
          '[name].tsx': helperComponent,
        },
      },
    ],
    templates: {
      '[name].mock-data.ts': mockData,
      '[name].stories.tsx': storybook,
      '[name].test.js': jest,
      '[name].tsx': authorableComponent,
    },
  },
};

export default config;
