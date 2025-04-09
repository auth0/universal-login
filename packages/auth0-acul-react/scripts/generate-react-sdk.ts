import fs from 'fs';
import path from 'path';
import { Project } from 'ts-morph';

const CORE_SDK_PATH = path.resolve(__dirname, '../../auth0-acul-js');
const HOOKS_OUTPUT_PATH = path.resolve(__dirname, '../src/hooks');
const PACKAGE_JSON_PATH = path.resolve(__dirname, '../package.json');

// Utility: PascalCase → kebab-case
function toKebabCase(str: string): string {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}

// Ensure output directory
fs.mkdirSync(HOOKS_OUTPUT_PATH, { recursive: true });

// Load ts-morph project
const project = new Project({
  tsConfigFilePath: path.join(CORE_SDK_PATH, 'tsconfig.json'),
});

// Load core SDK screen exports
const entryFile = project.getSourceFileOrThrow(
  path.join(CORE_SDK_PATH, 'src/screens/index.ts')
);

// Find all exported screen classes
const screenExports = entryFile.getExportSymbols().filter((symbol) => {
  const aliasedSymbol = symbol.getAliasedSymbol?.();
  const classDecl = aliasedSymbol?.getDeclarations()[0];
  return classDecl?.getKindName() === 'ClassDeclaration';
});

const hooksGenerated: { key: string; file: string }[] = [];

for (const symbol of screenExports) {
  const screenName = symbol.getName();              // e.g., LoginId
  const kebabName = toKebabCase(screenName);        // e.g., login-id
  const hookName = `use${screenName}`;              // useLoginId
  const contextName = `${screenName}Context`;       // LoginIdContext
  const fileName = `${kebabName}.tsx`;              // login-id.tsx

  const content = `import React, { createContext, useContext, useMemo } from 'react';
import ${screenName} from '@auth0/auth0-acul-js/${kebabName}';

const ${contextName} = createContext<${screenName} | null>(null);

export function ${hookName}(): ${screenName} {
  return useMemo(() => new ${screenName}(), []);
}

export const Auth0Provider = ({ children }: { children: React.ReactNode }) => {
  const screen = ${hookName}();
  return <${contextName}.Provider value={screen}>{children}</${contextName}.Provider>;
};

export function useCurrentScreen(): ${screenName} {
  const screen = useContext(${contextName});
  if (!screen) {
    throw new Error('useCurrentScreen must be used within an <Auth0Provider>');
  }
  return screen;
}

export type * from '@auth0/auth0-acul-js/${kebabName}';
`;

  fs.writeFileSync(path.join(HOOKS_OUTPUT_PATH, fileName), content, 'utf-8');

  hooksGenerated.push({
    key: `./${kebabName}`,
    file: `hooks/${kebabName}`,
  });
}

// Update exports in package.json
const pkgRaw = fs.readFileSync(PACKAGE_JSON_PATH, 'utf-8');
const pkg = JSON.parse(pkgRaw);

pkg.exports = pkg.exports || {};
pkg.exports['.'] = pkg.exports['.'] || {
  import: './dist/index.js',
  types: './dist/index.d.ts',
};

// Add exports for each screen
for (const { key, file } of hooksGenerated) {
  pkg.exports[key] = {
    import: `./dist/${file}.js`,
    types: `./dist/${file}.d.ts`,
  };
}

// Write updated package.json
fs.writeFileSync(PACKAGE_JSON_PATH, JSON.stringify(pkg, null, 2), 'utf-8');
console.log(`✅ Generated ${hooksGenerated.length} screen hooks in kebab-case (.tsx) and updated exports cleanly.`);
