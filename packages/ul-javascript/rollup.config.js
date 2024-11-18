import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';

const commonPlugins = [
  terser(),
];

const tsPlugin = (tsconfig, declaration, declarationDir) =>
  typescript({
    tsconfig,
    declaration,
    declarationDir,
  });

export default {
  input: 'src/index.ts',
  output: [
    {
      dir: 'dist',
      format: 'esm',
      sourcemap: true,
      preserveModules: true,
      exports: 'named',
    },
  ],
  external: ['zod'],
  plugins: [
    tsPlugin('./tsconfig.json', true, './dist'),
    ...commonPlugins,
  ],
};
