import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import json from '@rollup/plugin-json';
import replace from '@rollup/plugin-replace';
import fs from 'fs';
import path from 'path';

// Read package.json for SDK name and version
const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

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
    replace({
      preventAssignment: true,
      __SDK_NAME__: JSON.stringify(pkg.name),
      __SDK_VERSION__: JSON.stringify(pkg.version),
    }),
    ...commonPlugins,
  ],
};