import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import alias from '@rollup/plugin-alias';
import path from 'path';

const commonPlugins = [
  terser(),
  alias({
    entries: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
    ],
  }),
];

const tsPlugin = (tsconfig, declaration, declarationDir) =>
  typescript({
    tsconfig,
    declaration,
    declarationDir,
  });

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        dir: 'dist/cjs',
        format: 'cjs',
        sourcemap: true,
        preserveModules: true,
        exports: 'named'
      },
    ],
    external: ['zod'],
    plugins: [
      tsPlugin('./tsconfig.cjs.json', true, './dist/cjs'),
      ...commonPlugins,
    ],
  },
  {
    input: 'src/index.ts',
    output: [
      {
        dir: 'dist/esm',
        format: 'esm',
        sourcemap: true,
        preserveModules: true,
        exports: 'named'
      },
    ],
    external: ['zod'],
    plugins: [
      tsPlugin('./tsconfig.esm.json', true, './dist/esm'),
      ...commonPlugins,
    ],
  }
];
