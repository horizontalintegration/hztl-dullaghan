// Global
import { DullaghanCli } from '@dullaghan/cli-shared-utils';
// Utils
import { MOCK_DATA_DEFAULT, MOCK_DATA_STATIC_PROPS } from '../../utils/constants.js';
import { getDataComponentString } from '../../utils/get-data-component-string.js';
import { getImportString } from '../../utils/get-import-string.js';
import { hasChoice } from '../../utils/has-choice.js';
// Local
import { JSSTemplateArgs, JSSOpt } from './jss-template.js';

export const jssJestTemplate: DullaghanCli.Scaffold.Template<JSSTemplateArgs> = ({
  jssOpts,
  name,
  subdirectory,
}) => {
  const { hasGetStaticProps, hasNextDynamic } = hasChoice<JSSOpt>(
    ['hasGetStaticProps', 'hasNextDynamic'],
    jssOpts
  );

  /**
   * Imports
   */
  const imports: Record<DullaghanCli.Scaffold.ImportCategories, string[]> = {
    components: [],
    global: [],
    lib: [],
    local: [`import ${name} from './${name}';`],
    test: [],
  };

  imports.global.push(`import { hasDataComponent, snapshot } from 'lib/jest/test-utils';`);

  if (hasNextDynamic) {
    imports.global.push(`import dynamic from 'next/dynamic';`);
    imports.components.push(
      `import IconNewTab from 'components/helpers/SvgIcon/icons/icon--new-tab';`
    );
  }

  const mockDataImport = hasGetStaticProps
    ? `import ${MOCK_DATA_DEFAULT}, { ${MOCK_DATA_STATIC_PROPS} } from './${name}.mock-data';`
    : `import ${MOCK_DATA_DEFAULT} from './${name}.mock-data';`;
  imports.local.push(mockDataImport);

  /**
   * Mock Dynamic
   */
  const mockDynamic = (): string =>
    hasNextDynamic
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
