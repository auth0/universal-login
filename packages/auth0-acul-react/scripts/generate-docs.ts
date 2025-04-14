import fs from 'fs';
import path from 'path';
import { Project, SyntaxKind } from 'ts-morph';
import { fileURLToPath } from 'url';

// ESM-compatible __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// === Paths ===
const CORE_SDK_PATH = path.resolve(__dirname, '../../auth0-acul-js');
const SCREENS_PATH = path.join(CORE_SDK_PATH, 'src/screens');
const DOCS_OUTPUT_PATH = path.resolve(__dirname, '../docs/screens');

// === Utility: PascalCase → kebab-case
function toKebabCase(str: string): string {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}

// === Step 1: Clean old docs ===
if (fs.existsSync(DOCS_OUTPUT_PATH)) {
  for (const file of fs.readdirSync(DOCS_OUTPUT_PATH)) {
    if (file.endsWith('.md')) {
      fs.unlinkSync(path.join(DOCS_OUTPUT_PATH, file));
    }
  }
} else {
  fs.mkdirSync(DOCS_OUTPUT_PATH, { recursive: true });
}

// === Step 2: Load ts-morph project ===
const project = new Project({
  tsConfigFilePath: path.join(CORE_SDK_PATH, 'tsconfig.json'),
});
project.addSourceFilesAtPaths(path.join(SCREENS_PATH, '**/*.ts'));

// === Step 3: Load exported screen classes from index
const entryFile = project.getSourceFileOrThrow(path.join(SCREENS_PATH, 'index.ts'));

const screenExports = entryFile.getExportSymbols().filter((symbol) => {
  const aliasedSymbol = symbol.getAliasedSymbol?.();
  const classDecl = aliasedSymbol?.getDeclarations()[0];
  return classDecl?.getKindName() === 'ClassDeclaration';
});

// === Step 4: Generate markdown per screen
for (const symbol of screenExports) {
  const screenName = symbol.getName(); // e.g., MfaCountryCodes
  const kebabName = toKebabCase(screenName); // e.g., mfa-country-codes
  const hookName = `use${screenName}`; // useMfaCountryCodes
  const docPath = path.join(DOCS_OUTPUT_PATH, `${kebabName}.md`);
  const screenPath = path.join(SCREENS_PATH, kebabName, 'index.ts');

  const sourceFile = project.getSourceFile(screenPath);
  if (!sourceFile) {
    console.warn(`⚠️ Skipping ${screenName}: could not find ${screenPath}`);
    continue;
  }

  // Extract exported interfaces/types
  const exportedTypes: string[] = [];
  const exports = sourceFile.getExportedDeclarations();
  for (const [name, declarations] of exports) {
    const isType = declarations.some((d) =>
      [SyntaxKind.InterfaceDeclaration, SyntaxKind.TypeAliasDeclaration].includes(d.getKind())
    );
    if (isType) exportedTypes.push(name);
  }

  const interfaceImportBlock = exportedTypes.length
    ? `\`\`\`ts
import type { ${exportedTypes.join(', ')} } from '@auth0/auth0-acul-react/${kebabName}';
\`\`\``
    : '> _(No interfaces exported for this screen)_';

  const interfaceLinksBlock = exportedTypes.length
    ? `### 🔸 Interface Documentation
  
  You can find detailed documentation for the available interfaces below.  
  These types help with typing screen inputs, properties, and screen-specific data models:\n\n${exportedTypes
    .map(
      (name) =>
        `- [\`${name}\`](https://auth0.github.io/universal-login/interfaces/Classes.${name}.html)`
    )
    .join('\n')}`
    : '';

  const membersTypeName = `${screenName}Members`;

  const content = `---
title: ${kebabName}
sidebar_label: ${screenName}
---

# \`${kebabName}\` Screen

> This screen represents the **${screenName}** flow in the Auth0 Universal Login.

---

## 🔹 Hook Usage: \`${hookName}()\`

This creates a new \`${screenName}\` instance:

\`\`\`tsx
import { ${hookName} } from '@auth0/auth0-acul-react/${kebabName}';

const screen = ${hookName}();
screen.login({ identifier: 'user@example.com', password: '***' });
\`\`\`

---

## 🔹 Provider Usage

Wrap your component tree using the screen-specific provider:

\`\`\`tsx
import {
  Auth0AculProvider,
  useCurrentScreen
} from '@auth0/auth0-acul-react/${kebabName}';

<Auth0AculProvider>
  <YourScreenComponent />
</Auth0AculProvider>
\`\`\`

Then access the screen instance anywhere via context:

\`\`\`tsx
const screen = useCurrentScreen(); // typed as ${membersTypeName}
\`\`\`

> View [\`${membersTypeName}\`](https://auth0.github.io/universal-login/interfaces/Classes.${membersTypeName}.html) — provides all contextual properties for this screen.

---

## 🔹 Interface Usage

The following interfaces are supported by \`${screenName}\` and are useful for typing inputs, outputs, and screen properties.

${interfaceImportBlock}

${interfaceLinksBlock}
`;

  fs.writeFileSync(docPath, content.trim() + '\n', 'utf-8');
}

console.log('📘 Successfully generated screen docs at: docs/screens/');
