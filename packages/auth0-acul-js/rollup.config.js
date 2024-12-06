import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';

const commonPlugins = [
  terser(),
];

export default {
  input: 'src/index.ts',
  output: [
    {
      dir: './dist',
      format: 'esm',
      sourcemap: true,
      preserveModules: true,
      exports: 'named',
    },
  ],
  plugins: [
    typescript({
      tsconfig: './tsconfig.json'
    }),
    ...commonPlugins,
  ],
};
