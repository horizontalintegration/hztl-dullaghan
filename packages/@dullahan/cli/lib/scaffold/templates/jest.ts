// Interfaces
import type { DullahanCli } from '../../../dullahan-cli';
// Utils
import getImportString from '../utils/get-import-string';
import getDataComponentString from '../utils/get-data-component-string';
import { MOCK_DATA_DEFAULT, MOCK_DATA_STATIC_PROPS, PACKAGE_JEST } from '../utils/constants';

const jest = ({
  hasGetStaticProps,
  hasNextDynamic,
  name,
  subdirectory,
}: DullahanCli.Scaffold.TemplateArgs): string => {
  /**
   * Imports
   */
  const imports: Record<DullahanCli.Scaffold.ImportCategories, string[]> = {
    components: [],
    generated: [],
    global: [],
    lib: [],
    local: [`import ${name} from './${name}';`],
    test: [],
  };

  const dullahanJestPartials = ['hasDataComponent', 'snapshot'];
  if (hasNextDynamic) {
    dullahanJestPartials.push('mockDynamic');
  }
  imports.global.push(
    `import { ${dullahanJestPartials.sort().join(', ')} } from '${PACKAGE_JEST}';`
  );

  const mockDataImport = hasGetStaticProps
    ? `import ${MOCK_DATA_DEFAULT}, { ${MOCK_DATA_STATIC_PROPS} } from './${name}.mock-data';`
    : `import ${MOCK_DATA_DEFAULT} from './${name}.mock-data';`;
  imports.local.push(mockDataImport);

  /**
   * Mock Dynamic
   */
  const mockDynamic = (): string =>
    hasNextDynamic
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

export default jest;
