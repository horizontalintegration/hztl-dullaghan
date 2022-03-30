// Utils
import { getImportString } from '../get-import-string.js';
import { MOCK_DATA_DEFAULT, MOCK_DATA_STATIC_PROPS } from '../constants.js';

export const storybook: DullaghanCli.Scaffold.JSSTemplate = ({
  name,
  subdirectory,
  hasGetStaticProps,
  hasPlaceholder,
}) => {
  /**
   * Imports
   */
  const imports: Record<DullaghanCli.Scaffold.ImportCategories, string[]> = {
    components: [],
    global: [`import { Story, Meta } from '@storybook/react';`],
    lib: [],
    local: [`import ${name}, { ${name}Props } from './${name}';`],
    test: [],
  };

  if (hasGetStaticProps) {
    imports.global.push(
      `import { ComponentPropsContext } from '@sitecore-jss/sitecore-jss-nextjs';`
    );
    imports.local.push(
      `import ${MOCK_DATA_DEFAULT}, { ${MOCK_DATA_STATIC_PROPS} } from './${name}.mock-data';`
    );
  } else {
    imports.local.push(`import ${MOCK_DATA_DEFAULT} from './${name}.mock-data';`);
  }

  if (hasPlaceholder) {
    imports.global.push(`import { SitecoreContext } from '@sitecore-jss/sitecore-jss-react';`);
    imports.global.push(`import { createComponentFactory } from 'lib/mocks/mock-placeholder';`);
  }

  /**
   * Component Factory
   */
  const componentFactory = hasPlaceholder
    ? `const componentFactory = createComponentFactory();

`
    : '';

  /**
   * Decorators
   */
  const decorators = () => {
    if (!hasPlaceholder && !hasGetStaticProps) {
      return '';
    }

    const staticPropsDecorator = hasGetStaticProps
      ? `
    (Story) => <ComponentPropsContext value={staticPropsData}>{Story()}</ComponentPropsContext>,`
      : '';
    const placeholderDecorator = hasPlaceholder
      ? `
    (Story) => <SitecoreContext componentFactory={componentFactory}>{Story()}</SitecoreContext>,`
      : '';

    return `
  decorators: [${staticPropsDecorator}${placeholderDecorator}
  ],`;
  };

  /**
   * Output
   */
  return `${getImportString(imports)}${componentFactory}export default {
  title: '${subdirectory.storybook || ''}${name}',
  component: ${name},${decorators()}
} as Meta;

const Template: Story<${name}Props> = (props) => <${name} {...props} />;

export const Default = Template.bind({});
Default.args = defaultData;
`;
};
