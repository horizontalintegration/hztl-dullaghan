"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jssMockDataTemplate = void 0;
// Global
const cli_shared_utils_1 = require("@dullaghan/cli-shared-utils");
// Utils
const get_import_string_js_1 = require("../../utils/get-import-string.js");
const has_choice_js_1 = require("../../utils/has-choice.js");
const jssMockDataTemplate = ({ name, jssOpts, }) => {
    const { hasGetStaticProps, hasPlaceholder } = (0, has_choice_js_1.hasChoice)(['hasGetStaticProps', 'hasPlaceholder'], jssOpts);
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
        ? `const UID = '${(0, cli_shared_utils_1.kebabCase)(name)}-uid';
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
    return `${(0, get_import_string_js_1.getImportString)(imports)}${UID}const defaultData = {${rendering}};
  
${staticProps}export default defaultData;
`;
};
exports.jssMockDataTemplate = jssMockDataTemplate;
