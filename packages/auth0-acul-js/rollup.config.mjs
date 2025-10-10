import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import replace from '@rollup/plugin-replace';
import json from '@rollup/plugin-json';
import fs from 'fs';
import path from 'path';

const pkg = JSON.parse(fs.readFileSync(path.resolve('./package.json'), 'utf-8'));

// Skip minification for faster builds in development
const nodeEnv = process.env.NODE_ENV || 'production';
const isDev = nodeEnv !== 'production';
const commonPlugins = isDev ? [] : [terser()];

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
      'process.env.NODE_ENV': JSON.stringify(nodeEnv),
    }),
    ...commonPlugins,
  ],
};
