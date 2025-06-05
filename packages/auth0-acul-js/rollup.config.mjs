import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import replace from '@rollup/plugin-replace';
import json from '@rollup/plugin-json';
import fs from 'fs';
import path from 'path';
import { nodeResolve } from '@rollup/plugin-node-resolve';

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
      entryFileNames: chunk =>
        chunk.name.includes('interfaces/schema') || chunk.name.includes('interfaces/screens')
          ? '[name].js'
          : '[name].js',
      preserveModulesRoot: 'src'
    },
  ],
  plugins: [
    json(),
    nodeResolve({
      extensions: ['.ts', '.js', '.json'],
      modulesOnly: true
    }),
    typescript({
      tsconfig: './tsconfig.json',
      include: ['src/**/*', 'interfaces/**/*'],
      outputToFilesystem: true
    }),
    replace({
      preventAssignment: true,
      __SDK_NAME__: JSON.stringify(pkg.name),
      __SDK_VERSION__: JSON.stringify(pkg.version),
    }),
    ...commonPlugins,
  ],
  external: ['zod']
};
