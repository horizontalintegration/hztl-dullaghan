// Global
import { DullaghanCli } from '@dullaghan/cli-shared-utils';
// Utils
import { getDataComponentString } from '../../utils/get-data-component-string.js';
import { getImportString } from '../../utils/get-import-string.js';
import { hasChoice } from '../../utils/has-choice.js';
// Local
import { JSSOpt, JSSTemplateArgs } from './jss-template.js';

export const jssAuthorableComponent: DullaghanCli.Scaffold.Template<JSSTemplateArgs> = ({
  name,
  subdirectory,
  jssOpts,
}) => {
  const { hasPlaceholder, hasGetStaticProps } = hasChoice<JSSOpt>(
    ['hasPlaceholder', 'hasGetStaticProps'],
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

  // Different options want different parts of this lib
  const staticPropsPartials = ['GetStaticComponentProps', 'useComponentProps'];
  let allPartials: string[] = [];

  if (hasGetStaticProps) {
    imports.lib.push(`import graphQLClientFactory from 'lib/graphql/client-factory';`);
    imports.lib.push(`import query from './${name}.graphql';`);
    allPartials = allPartials.concat(staticPropsPartials);
  }

  if (hasGetStaticProps || hasPlaceholder) {
    allPartials.push('ComponentRendering');
  }

  if (allPartials.length > 0) {
    imports.global.push(
      `import { ${allPartials.join(', ')} } from '@sitecore-jss/sitecore-jss-nextjs';`
    );
  }

  /**
   * Static Props Data
   */
  const staticPropsData = hasGetStaticProps
    ? `
    const renderingId = rendering?.uid || '';
    const graphQlData = useComponentProps<${name}StaticData>(renderingId);
  `
    : '';

  // Placeholder
  if (hasPlaceholder) {
    imports.components.push(
      `import PlaceholderWrapper from 'components/helpers/PlaceholderWrapper/PlaceholderWrapper';`
    );
  }

  const placeholderContent = hasPlaceholder
    ? `<PlaceholderWrapper
        rendering={rendering}
        name="placeholder-name"
        render={(components) => (
          <>{components}</>
        )}
        renderEmpty={(components) => ({ components })}
      />`
    : '';

  const componentInterface = `export interface ${name}Props {
  fields?: {};${
    hasGetStaticProps || hasPlaceholder
      ? `
  rendering: ComponentRendering;`
      : ''
  }
}
`;

  const staticPropsInterface = hasGetStaticProps
    ? `export interface ${name}StaticData {
  datasource: {}
}
`
    : '';

  const jsxProps = hasGetStaticProps || hasPlaceholder ? 'fields, rendering' : 'fields';

  /**
   * Static Props Fetch
   */
  const staticPropsFetch = hasGetStaticProps
    ? `
/* istanbul ignore next - We aren't running E2E tests. */
export const getStaticProps: GetStaticComponentProps = async (rendering, layoutData) => {
  const graphQLClient = graphQLClientFactory();
  
  const result = await graphQLClient.query({
    query,
    variables: {
      datasource: rendering.dataSource,
      contextItem: layoutData?.sitecore?.route?.itemId,
    },
  });
  
  return result.data;
};
`
    : '';

  /**
   * Template
   */
  return `${getImportString(imports)}${componentInterface}${staticPropsInterface}
const ${name} = ({ ${jsxProps} }: ${name}Props): JSX.Element => {
  ${staticPropsData}
  // Fail out if we don't have any fields
  if (!fields) { 
    return <></>;
  }
  
  return (
    <div data-component="${getDataComponentString(name, subdirectory)}">
      ${placeholderContent || name}
    </div>
  );
};
${staticPropsFetch}
export default ${name};
`;
};