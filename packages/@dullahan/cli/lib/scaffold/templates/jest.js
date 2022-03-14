// Utils
import { getImportString } from '../get-import-string.js';
import { getDataComponentString } from '../get-data-component-string.js';
import { MOCK_DATA_DEFAULT, MOCK_DATA_STATIC_PROPS } from '../constants.js';
export const jest = ({ hasGetStaticProps, hasNextDynamic, name, subdirectory, }) => {
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
    const dullahanJestPartials = ['hasDataComponent', 'snapshot'];
    if (hasNextDynamic) {
        dullahanJestPartials.push('mockDynamic');
    }
    imports.global.push(`import { ${dullahanJestPartials.sort().join(', ')} } from 'lib/jest/test-utils';`);
    const mockDataImport = hasGetStaticProps
        ? `import ${MOCK_DATA_DEFAULT}, { ${MOCK_DATA_STATIC_PROPS} } from './${name}.mock-data';`
        : `import ${MOCK_DATA_DEFAULT} from './${name}.mock-data';`;
    imports.local.push(mockDataImport);
    /**
     * Mock Dynamic
     */
    const mockDynamic = () => hasNextDynamic
        ? `mockDynamic();

`
        : '';
    /**
     * Rendering Options Data
     */
    const renderingOptionsData = [`componentProps: ${MOCK_DATA_DEFAULT}`];
    if (hasGetStaticProps) {
        renderingOptionsData.push(`staticProps: ${MOCK_DATA_STATIC_PROPS}`);
    }
    /**
     * Template
     */
    return `${getImportString(imports)}${mockDynamic()}it('renders correctly', () => {
  const component = snapshot(${name}, { ${renderingOptionsData.join(', ')} });
  hasDataComponent(component, '${getDataComponentString(name, subdirectory)}');
});
`;
};
