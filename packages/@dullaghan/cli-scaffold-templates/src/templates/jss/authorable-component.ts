// Global
import { DullaghanCli } from '@dullaghan/cli-shared-utils';
// Utils
import { getDataComponentString } from '../../utils/get-data-component-string.js';
import { getImportString } from '../../utils/get-import-string.js';
import { hasChoice } from '../../utils/has-choice.js';
// Local
import { JSSOpt, JSSTemplateArgs } from './jss-template.js';

export const jssAuthorableComponent: DullaghanCli.Scaffold.Template<
  JSSTemplateArgs
> = ({ name, subdirectory, jssOpts }) => {
  const { hasPlaceholder, hasGetStaticProps } = hasChoice<JSSOpt>(
    ['hasPlaceholder', 'hasGetStaticProps'],
    jssOpts
  );

  const STATIC_PROPS_INTERFACE = `${name}StaticProps`;

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
  let allPartials: string[] = [];

  if (hasGetStaticProps) {
    imports.lib.push(
      `import graphQLClientFactory from 'lib/graphql/client-factory';`
    );
    imports.local.push(`import query from './${name}.graphql';`);
    imports.global.push(
      `import { ComponentPropsFetchFunction } from '@sitecore-jss/sitecore-jss-nextjs/types/sharedTypes/component-props';`
    );
    imports.global.push(`import { GetStaticPropsContext } from 'next';`);
  }

  if (hasPlaceholder) {
    allPartials.push('ComponentRendering');
  }

  if (allPartials.length > 0) {
    imports.global.push(
      `import { ${allPartials.join(
        ', '
      )} } from '@sitecore-jss/sitecore-jss-nextjs';`
    );
  }

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

  const componentInterface = `export interface ${name}Props${
    hasGetStaticProps ? ` extends ${STATIC_PROPS_INTERFACE}` : ''
  } {
  fields?: {};${
    hasPlaceholder
      ? `
  rendering: ComponentRendering;`
      : ''
  }
}
`;

  // Static props interface
  const staticPropsInterface = hasGetStaticProps
    ? `interface ${STATIC_PROPS_INTERFACE} {
  staticProps: {}
}

`
    : '';

  const jsxProps = hasPlaceholder ? 'fields, rendering' : 'fields';

  /**
   * Static Props Fetch
   */
  const staticPropsFetch = hasGetStaticProps
    ? `
/* istanbul ignore next - We aren't running E2E tests. */
export const getStaticProps: ComponentPropsFetchFunction<
 GetStaticPropsContext,
 ${STATIC_PROPS_INTERFACE}
> = async (rendering, layoutData) => {
 const graphQLClient = graphQLClientFactory();

 const result = await graphQLClient.query({
   query,
   variables: {
     datasource: rendering.dataSource,
     language: layoutData.sitecore.context.language,
   },
 });

 return {
   staticProps: result.data,
 };
};
`
    : '';

  /**
   * Template
   */
  return `${getImportString(
    imports
  )}${staticPropsInterface}${componentInterface}
const ${name} = ({ ${jsxProps} }: ${name}Props) => {
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
