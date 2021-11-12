// Interfaces
import type { DullahanCli } from '../../../dullahan-cli';
// Utils
import { kebabCase } from '../utils/string-utils';
import { PACKAGE_MOCK_PLACEHOLDER } from '../utils/constants';
import getImportString from '../utils/get-import-string';

const mockData = ({
  name,
  hasGetStaticProps,
  hasPlaceholder,
}: DullahanCli.Scaffold.TemplateArgs): string => {
  /**
   * Imports
   */
  const imports: Record<DullahanCli.Scaffold.ImportCategories, string[]> = {
    components: [],
    generated: [],
    global: [],
    lib: [],
    local: [],
    test: [],
  };

  if (hasPlaceholder) {
    imports.lib.push(`import { getSampleRenderingContext } from '${PACKAGE_MOCK_PLACEHOLDER}';`);
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
    renderingData += `
    uid: UID,`;
  }

  if (hasPlaceholder) {
    renderingData += `
    ...getSampleRenderingContext('placeholder-name'),`;
  }

  const rendering = !!renderingData
    ? `
  rendering: {${renderingData}
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

export default mockData;
