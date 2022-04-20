"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jssStorybookTemplate = void 0;
// Utils
const constants_js_1 = require("../../utils/constants.js");
const get_import_string_js_1 = require("../../utils/get-import-string.js");
const has_choice_js_1 = require("../../utils/has-choice.js");
const jssStorybookTemplate = ({ name, subdirectory, jssOpts, }) => {
    const { hasGetStaticProps, hasPlaceholder } = (0, has_choice_js_1.hasChoice)(['hasGetStaticProps', 'hasPlaceholder'], jssOpts);
    /**
     * Imports
     */
    const imports = {
        components: [],
        global: [`import { Story, Meta } from '@storybook/react';`],
        lib: [],
        local: [`import ${name}, { ${name}Props } from './${name}';`],
        test: [],
    };
    if (hasGetStaticProps) {
        imports.global.push(`import { ComponentPropsContext } from '@sitecore-jss/sitecore-jss-nextjs';`);
        imports.local.push(`import ${constants_js_1.MOCK_DATA_DEFAULT}, { ${constants_js_1.MOCK_DATA_STATIC_PROPS} } from './${name}.mock-data';`);
    }
    else {
        imports.local.push(`import ${constants_js_1.MOCK_DATA_DEFAULT} from './${name}.mock-data';`);
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
    return `${(0, get_import_string_js_1.getImportString)(imports)}${componentFactory}export default {
  title: '${subdirectory.storybook || ''}${name}',
  component: ${name},${decorators()}
} as Meta;

const Template: Story<${name}Props> = (props) => <${name} {...props} />;

export const Default = Template.bind({});
Default.args = defaultData;
`;
};
exports.jssStorybookTemplate = jssStorybookTemplate;
