// Utils
import { kebabCase } from '../../utils/string-utils.js';
import { getImportString } from '../get-import-string.js';

export const mockData: DullaghanCli.Scaffold.Template = ({
  name,
  hasGetStaticProps,
  hasPlaceholder,
}) => {
  /**
   * Imports
   */
  const imports: Record<DullaghanCli.Scaffold.ImportCategories, string[]> = {
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
