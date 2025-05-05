// This script generates React hooks, exports, and typedoc-friendly namespaces.

import fs from 'fs';
import path from 'path';
import { Project, SyntaxKind } from 'ts-morph';
import { fileURLToPath } from 'url';

// Setup __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const CORE_SDK_PATH = path.resolve(__dirname, '../../auth0-acul-js');
const HOOKS_OUTPUT_PATH = path.resolve(__dirname, '../src/hooks');
const INDEX_FILE_PATH = path.resolve(__dirname, '../src/index.ts');
const PACKAGE_JSON_PATH = path.resolve(__dirname, '../package.json');
const EXPORTS_DIR = path.resolve(__dirname, '../src/exports');

// Utility: PascalCase -> kebab-case
function toKebabCase(str: string): string {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}

// Ensure directories exist
fs.mkdirSync(HOOKS_OUTPUT_PATH, { recursive: true });
fs.mkdirSync(EXPORTS_DIR, { recursive: true });

// Load core SDK project
const project = new Project({
  tsConfigFilePath: path.join(CORE_SDK_PATH, 'tsconfig.json'),
});
const entryFile = project.getSourceFileOrThrow(
  path.join(CORE_SDK_PATH, 'src/screens/index.ts')
);

// Collect exported screen classes
const screenExports = entryFile.getExportSymbols().filter(symbol => {
  const aliased = symbol.getAliasedSymbol?.();
  const decl = aliased?.getDeclarations()[0];
  return decl?.getKind() === SyntaxKind.ClassDeclaration;
});

// Typed metadata array
const hooksGenerated: {
  key: string;
  file: string;
  factoryHook: string;
  provider: string;
  contextHook: string;
  screenName: string;
  kebab: string;
}[] = [];

// === Generate individual hook files ===
for (const symbol of screenExports) {
  const screenName = symbol.getName();
  const kebab = toKebabCase(screenName);
  const factoryHook = `use${screenName}Instance`;
  const provider = `${screenName}Provider`;
  const contextHook = `use${screenName}Context`;
  const contextName = `${screenName}Context`;
  const fileName = `${kebab}.tsx`;

  const content = `// AUTO-GENERATED FILE - DO NOT EDIT
// Hooks and provider for the ${screenName} screen

import React, { createContext, useContext, useMemo } from 'react';
import ${screenName} from '@auth0/auth0-acul-js/${kebab}';
import type { ${screenName}Members } from '@auth0/auth0-acul-js';

/**
 * React context for a shared ${screenName} instance.
 */
const ${contextName} = createContext<${screenName}Members | null>(null);

/**
 * Creates a new, independent ${screenName} instance.
 * @returns A fresh ${screenName}.
 */
export function ${factoryHook}(): ${screenName}Members {
  return useMemo(() => new ${screenName}(), []);
}

/**
 * Provider component that supplies a shared ${screenName} instance.
 */
export const ${provider} = ({ children }: { children: React.ReactNode }) => {
  const instance = useMemo(() => new ${screenName}(), []);
  return <${contextName}.Provider value={instance}>{children}</${contextName}.Provider>;
};

/**
 * Retrieves the shared ${screenName} instance from React context.
 *
 * @returns The shared ${screenName} instance provided by _${provider}_.
 * @throws If used outside of _${provider}_.
 */
export function ${contextHook}(): ${screenName}Members {
  const ctx = useContext(${contextName});
  if (!ctx) {
    throw new Error('${contextHook} must be used within _${provider}_');
  }
  return ctx;
}

export type * from '@auth0/auth0-acul-js/${kebab}';
`;

  fs.writeFileSync(path.join(HOOKS_OUTPUT_PATH, fileName), content, 'utf-8');
  hooksGenerated.push({ key: `./${kebab}`, file: `hooks/${kebab}`, factoryHook, provider, contextHook, screenName, kebab });
}

// === Collect core SDK interfaces ===
const coreIdx = project.getSourceFileOrThrow(path.join(CORE_SDK_PATH, 'src/index.ts'));
const exportedInterfaces: string[] = [];
for (const [name, decls] of coreIdx.getExportedDeclarations()) {
  for (const d of decls) {
    if (d.getKind() === SyntaxKind.InterfaceDeclaration) {
      exportedInterfaces.push(name);
    }
  }
}

// === Generate src/index.ts (wrapper exports) ===
const hookExports = hooksGenerated.map(h => `export { 
  ${h.factoryHook},
  ${h.contextHook},
  ${h.provider}
} from './${h.file}';`).join('\n');
const interfaceExports = exportedInterfaces.length
  ? `export type {\n  ${exportedInterfaces.join(',\n  ')}\n} from '@auth0/auth0-acul-js';`
  : '';
const wrapperIndex = `// AUTO-GENERATED INDEX FILE\n${hookExports}\n\nexport { getCurrentScreen } from '@auth0/auth0-acul-js';\n\n${interfaceExports}\n`;
fs.writeFileSync(INDEX_FILE_PATH, wrapperIndex, 'utf-8');

// === Update package.json exports ===
const pkg = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, 'utf-8'));
pkg.exports = pkg.exports || {};
if (!pkg.exports['.']) {
  pkg.exports['.'] = { import: './dist/index.js', types: './dist/index.d.ts' };
}
hooksGenerated.forEach(({ key, file }) => {
  pkg.exports[key] = { import: `./dist/${file}.js`, types: `./dist/${file}.d.ts` };
});
fs.writeFileSync(PACKAGE_JSON_PATH, JSON.stringify(pkg, null, 2), 'utf-8');

// === Generate documentation-only exports ===
// Create screens namespace folder
const SCREENS_DOC_DIR = path.join(EXPORTS_DIR, 'screens');
fs.mkdirSync(SCREENS_DOC_DIR, { recursive: true });

// 1. One file per screen under exports/screens
for (const { factoryHook, provider, contextHook, kebab } of hooksGenerated) {
  const screenDoc =
    `export { ${factoryHook}, ${provider}, ${contextHook} } from '../../hooks/${kebab}';\n`;
  fs.writeFileSync(
    path.join(SCREENS_DOC_DIR, `${kebab}.ts`),
    screenDoc + '',
    'utf-8'
  );
}

// 2. Generate exports/screens/index.ts
const screensIndex = hooksGenerated
  .map(({ screenName, kebab }) => `export * as ${screenName} from './${kebab}';`)
  .join('\n');
fs.writeFileSync(
  path.join(SCREENS_DOC_DIR, 'index.ts'),
  screensIndex + '\n',
  'utf-8'
);

// 3. Interfaces doc
const ifaceDoc = exportedInterfaces.length
  ? `export type {
  ${exportedInterfaces.join(',')}
} from '../index';` : '';
fs.writeFileSync(
  path.join(EXPORTS_DIR, 'interfaces.ts'),
  ifaceDoc,
  'utf-8'
);

// 4. Root docs index
const docsRootIndex =
  `export * as Screens from './screens';\n` +
  `export * as Interfaces from './interfaces';
`;
fs.writeFileSync(
  path.join(EXPORTS_DIR, 'index.ts'),
  docsRootIndex,
  'utf-8'
);

console.log(`✅ Generated ${hooksGenerated.length} screen hooks, providers, contexts, and updated docs under exports namespace.`);
