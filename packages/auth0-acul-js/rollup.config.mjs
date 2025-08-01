import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import replace from '@rollup/plugin-replace';
import json from '@rollup/plugin-json';
import fs from 'fs';
import path from 'path';

const pkg = JSON.parse(fs.readFileSync(path.resolve('./package.json'), 'utf-8'));

const commonPlugins = [terser()];

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
    json(),
    typescript({
      tsconfig: './tsconfig.json',
    }),
    replace({
      preventAssignment: true,
      __SDK_NAME__: JSON.stringify(pkg.name),
      __SDK_VERSION__: JSON.stringify(pkg.version),
    }),
    ...commonPlugins,
  ],
};
