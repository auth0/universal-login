export default {
  name: '@auth0/auth0-acul-react',
  out: 'docs',
  entryPoints: ['./src/export/getting-started.ts', './src/export/index.ts'],
  tsconfig: './tsconfig.json',
  exclude: ['**/*.test.ts', '**/*.spec.ts'],
  hideGenerator: true,
  readme: 'README.md',
  excludePrivate: true,
  excludeProtected: true,
  excludeExternals: true,
  includeVersion: true,
  categorizeByGroup: true,
  json: 'docs/index.json',
  sort: ['source-order'],
  highlightLanguages: ['javascript', 'typescript', 'jsx', 'tsx', 'bash']
};
