// Local
import { authorableComponent } from './templates/authorable-component.js';
import { helperComponent } from './templates/helper-component.js';
import { jest } from './templates/jest.js';
import { mockData } from './templates/mock-data.js';
import { storybook } from './templates/storybook.js';

export const scaffoldConfig: DullahanConfig = {
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
        path: './components/authorable/media',
        name: 'Media',
        dataComponent: 'authorable/media/',
        storybook: 'Authorable/Media/',
      },
      {
        path: './components/helpers',
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

export default scaffoldConfig;
