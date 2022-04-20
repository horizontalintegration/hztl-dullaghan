"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImportString = void 0;
// TODO: Add extensibility via config
const importOrder = ['global', 'generated', 'test', 'lib', 'components', 'local'];
const getImportString = (imports) => {
    // Fail out if no imports
    if (Object.keys(imports).length === 0) {
        return '';
    }
    let importString = '';
    importOrder.forEach((key) => {
        const items = imports[key];
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
exports.getImportString = getImportString;
