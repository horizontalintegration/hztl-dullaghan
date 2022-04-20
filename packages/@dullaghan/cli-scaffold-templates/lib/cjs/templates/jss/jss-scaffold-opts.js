"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jssScaffoldOpts = void 0;
exports.jssScaffoldOpts = [
    {
        name: 'scaffoldOptSelections',
        type: 'checkbox',
        message: 'Select any customizations needed for your component:',
        choices: [
            { name: 'Contains a Placeholder component', value: 'hasPlaceholder' },
            {
                name: 'Uses data from getStaticProps (connected GraphQL or other server-side API calls)',
                value: 'hasGetStaticProps',
            },
            { name: 'Contains a next/dynamic import', value: 'hasNextDynamic' },
        ],
    },
];
