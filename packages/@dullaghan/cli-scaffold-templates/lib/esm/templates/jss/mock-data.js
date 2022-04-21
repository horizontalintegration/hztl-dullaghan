// Global
import { kebabCase } from '@dullaghan/cli-shared-utils';
// Utils
import { getImportString } from '../../utils/get-import-string.js';
import { hasChoice } from '../../utils/has-choice.js';
export const jssMockDataTemplate = ({ name, jssOpts, }) => {
    const { hasGetStaticProps, hasPlaceholder } = hasChoice(['hasGetStaticProps', 'hasPlaceholder'], jssOpts);
    /**
     * Imports
     */
    const imports = {
        components: [],
        global: [],
        lib: [],
        local: [],
        test: [],
    };
    if (hasPlaceholder) {
        imports.lib.push(`import { getSampleRenderingContext } from 'lib/mocks/mock-placeholder';`);
    }
    /**
     * UID
     */
    const UID = hasGetStaticProps
        ? `const UID = '${kebabCase(name)}-uid';
`
        : '';
    /**
     * Rendering Data
     */
    let renderingData = '';
    if (hasGetStaticProps) {
        renderingData += `uid: UID,
`;
    }
    if (hasPlaceholder) {
        renderingData += `...getSampleRenderingContext('placeholder-name'),
`;
    }
    const rendering = !!renderingData
        ? `
  rendering: {
    ${renderingData}componentName: '${name}',
  },
`
        : '';
    /**
     * Static Props Dictionary
     */
    const staticProps = hasGetStaticProps
        ? `export const staticPropsData = {
  [UID]: {},
};

`
        : '';
    /**
     * Output
     */
    return `${getImportString(imports)}${UID}const defaultData = {${rendering}};
  
${staticProps}export default defaultData;
`;
};
