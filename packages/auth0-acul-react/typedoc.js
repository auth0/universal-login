// typedoc.js
export default {
  out: 'docs',
  entryPoints: ['./src/index.ts'],
  tsconfig: './tsconfig.json',
  exclude: ['**/*.test.ts', '**/*.spec.ts'],
  hideGenerator: true,
  readme: './README.md',
  excludePrivate: true,
  excludeProtected: true,
  excludeExternals: true,
  includeVersion: true,
  categorizeByGroup: true
};
