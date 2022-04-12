import { terser } from 'rollup-plugin-terser';
import cleanup from 'rollup-plugin-cleanup';
import commonjs from '@rollup/plugin-commonjs';
import dts from 'rollup-plugin-dts';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

const packageJson = require('./package.json');

export default [
  {
    input: 'src/index.tsx',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
        exports: 'auto',
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      terser(),
      cleanup({ comments: 'none' }),
    ],
    external: ['react', 'react-dom'],
  },
  {
    input: 'lib/esm/index.d.ts',
    output: [{ file: 'lib/index.d.ts', format: 'esm' }],
    plugins: [dts()],
  },
];
