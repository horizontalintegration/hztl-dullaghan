"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jssJestTemplate = void 0;
// Utils
const constants_js_1 = require("../../utils/constants.js");
const get_data_component_string_js_1 = require("../../utils/get-data-component-string.js");
const get_import_string_js_1 = require("../../utils/get-import-string.js");
const has_choice_js_1 = require("../../utils/has-choice.js");
const jssJestTemplate = ({ jssOpts, name, subdirectory, }) => {
    const { hasGetStaticProps, hasNextDynamic } = (0, has_choice_js_1.hasChoice)(['hasGetStaticProps', 'hasNextDynamic'], jssOpts);
    /**
     * Imports
     */
    const imports = {
        components: [],
        global: [],
        lib: [],
        local: [`import ${name} from './${name}';`],
        test: [],
    };
    imports.global.push(`import { hasDataComponent, snapshot } from 'lib/jest/test-utils';`);
    if (hasNextDynamic) {
        imports.global.push(`import dynamic from 'next/dynamic';`);
        imports.components.push(`import IconNewTab from 'components/helpers/SvgIcon/icons/icon--new-tab';`);
    }
    const mockDataImport = hasGetStaticProps
        ? `import ${constants_js_1.MOCK_DATA_DEFAULT}, { ${constants_js_1.MOCK_DATA_STATIC_PROPS} } from './${name}.mock-data';`
        : `import ${constants_js_1.MOCK_DATA_DEFAULT} from './${name}.mock-data';`;
    imports.local.push(mockDataImport);
    /**
     * Mock Dynamic
     */
    const mockDynamic = () => hasNextDynamic
        ? `// Mock out the SvgIcon dynamic import
jest.mock('next/dynamic');
      
beforeAll(() => {
  dynamic.mockImplementation(() => IconNewTab);
});

`
        : '';
    /**
     * Rendering Options Data
     */
    const renderingOptionsData = [`componentProps: ${constants_js_1.MOCK_DATA_DEFAULT}`];
    if (hasGetStaticProps) {
        renderingOptionsData.push(`staticProps: ${constants_js_1.MOCK_DATA_STATIC_PROPS}`);
    }
    /**
     * Template
     */
    return `${(0, get_import_string_js_1.getImportString)(imports)}${mockDynamic()}it('renders correctly', () => {
  const component = snapshot(${name}, { ${renderingOptionsData.join(', ')} });
  hasDataComponent(component, '${(0, get_data_component_string_js_1.getDataComponentString)(name, subdirectory)}');
});
`;
};
exports.jssJestTemplate = jssJestTemplate;
