import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import json from '@rollup/plugin-json';
import fs from 'fs';
import path from 'path';

const screensDir = 'src/screens';
const screenFiles = fs.readdirSync(screensDir).filter(file => file.endsWith('.ts') || file.endsWith('.tsx'));
const screenInputs = Object.fromEntries(
  screenFiles.map(file => {
    const name = path.basename(file, path.extname(file));
    return [`screens/${name}`, `${screensDir}/${file}`];
  })
);

const commonPlugins = [terser()];

export default {
  input: {
    'index': 'src/index.ts',
    ...screenInputs,
  },
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
    ...commonPlugins,
  ],
};