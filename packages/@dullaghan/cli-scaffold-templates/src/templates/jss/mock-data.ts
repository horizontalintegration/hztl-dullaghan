// Global
import { DullaghanCli, kebabCase } from '@dullaghan/cli-shared-utils';
// Utils
import { getImportString } from '../../utils/get-import-string.js';
import { hasChoice } from '../../utils/has-choice.js';
// Local
import { JSSOpt, JSSTemplateArgs } from './jss-template.js';

export const jssMockDataTemplate: DullaghanCli.Scaffold.Template<JSSTemplateArgs> = ({
  name,
  jssOpts,
}) => {
  const { hasGetStaticProps, hasPlaceholder } = hasChoice<JSSOpt>(
    ['hasGetStaticProps', 'hasPlaceholder'],
    jssOpts
  );
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
