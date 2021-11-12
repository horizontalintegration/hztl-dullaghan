// TODO: Add extensibility via config
import type { DullahanCli } from '../../../dullahan-cli';
const importOrder = ['global', 'generated', 'test', 'lib', 'components', 'local'];

const getImportString = (
  imports: Record<DullahanCli.Scaffold.ImportCategories, string[]>
): string => {
  // Fail out if no imports
  if (Object.keys(imports).length === 0) {
    return '';
  }

  let importString = '';
  importOrder.forEach((key) => {
    const items = imports[key as DullahanCli.Scaffold.ImportCategories];
    if (items && items.length > 0) {
      importString += `// ${key.charAt(0).toUpperCase()}${key.slice(1)}
${items.sort().join(`
`)}
`;
    }
  });

  return !!importString
    ? `${importString}
`
    : '';
};

export default getImportString;
