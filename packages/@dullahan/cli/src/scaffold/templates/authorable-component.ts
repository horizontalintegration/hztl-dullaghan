// Utils
import { getImportString } from '../get-import-string.js';
import { getDataComponentString } from '../get-data-component-string.js';

export const authorableComponent: DullahanCli.Scaffold.Template = ({
  name,
  subdirectory,
  hasPlaceholder,
  hasGetStaticProps,
}) => {
  /**
   * Imports
   */
  const imports: Record<DullahanCli.Scaffold.ImportCategories, string[]> = {
    components: [],
    global: [],
    lib: [],
    local: [],
    test: [],
  };

  // Different options want different parts of this lib
  const placeholderPartials = ['Placeholder'];
  const staticPropsPartials = ['GetStaticComponentProps', 'useComponentProps'];
  let allPartials: string[] = [];
  if (hasPlaceholder) {
    imports.components.push(
      `import PlaceholderEmpty from '@/components/helpers/PlaceholderEmpty';`
    );
    allPartials = allPartials.concat(placeholderPartials);
  }

  if (hasGetStaticProps) {
    imports.lib.push(`import GraphQLClientFactory from '@/lib/GraphQLClientFactory';`);
    imports.lib.push(`import query from './${name}.graphql';`);
    allPartials = allPartials.concat(staticPropsPartials);
  }

  if (allPartials.length > 0) {
    imports.global.push(
      `import { ${allPartials.join(', ')} } from '@sitecore-jss/sitecore-jss-nextjs';`
    );
  }

  /**
   * Static Props Type
   */
  const staticPropsType = hasGetStaticProps
    ? `
  interface ${name}StaticData {
    datasource: {},
  }
  `
    : '';

  /**
   * Static Props Data
   */
  const staticPropsData = hasGetStaticProps
    ? `
    const graphQlData = rendering?.uid ? useComponentProps<${name}StaticData>(rendering.uid) : undefined;
  `
    : '';

  /**
   * Placeholder Content
   */
  const placeholderContent = hasPlaceholder
    ? `<Placeholder
          rendering={rendering}
          name="placeholder-name"
          render={(components) => (
            <>{components}</>
          )}
          renderEmpty={(components) => {components}}
        />`
    : '';

  const propsType = hasGetStaticProps
    ? `export type ${name}Props = Sitecore.Override.ComponentBase & Components.${subdirectory.name}.Fields.${name};`
    : `export type ${name}Props = Components.${subdirectory.name}.Fields.${name};`;

  const jsxProps = hasGetStaticProps || hasPlaceholder ? 'fields, rendering' : 'fields';

  /**
   * Static Props Fetch
   */
  // @TODO: This would need to generate a GQL file too, but that seems bad
  // @TODO: Import our type from generated?
  const staticPropsFetch = hasGetStaticProps
    ? `
  /* istanbul ignore next - We aren't running E2E tests. */
  /**
   * Will be called during SSG
   * @param {ComponentRendering} rendering
   * @param {LayoutServiceData} layoutData
   * @param {GetStaticPropsContext} context
   */
  export const getStaticProps: GetStaticComponentProps = async (rendering, layoutData) => {
    const graphQLClient = GraphQLClientFactory();
  
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
  return `${getImportString(imports)}${propsType}
  ${staticPropsType}
  const ${name} = ({ ${jsxProps} }: ${name}Props): JSX.Element => {
    // Fail out if we don't have any fields
    if (!fields) { 
      return <></>;
    }
    ${staticPropsData}
    return (
      <Container size="standard" dataComponent="${getDataComponentString(name, subdirectory)}">
        ${placeholderContent || name}
      </Container>
    );
  };
  ${staticPropsFetch}
  export default ${name};
  `;
};
