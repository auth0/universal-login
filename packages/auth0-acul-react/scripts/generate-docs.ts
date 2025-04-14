import fs from 'fs';
import path from 'path';
import { Project, SyntaxKind, MethodDeclaration } from 'ts-morph';
import { fileURLToPath } from 'url';

// ESM-compatible __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// === Paths ===
const CORE_SDK_PATH = path.resolve(__dirname, '../../auth0-acul-js');
const SCREENS_PATH = path.join(CORE_SDK_PATH, 'src/screens');
const DOCS_OUTPUT_PATH = path.resolve(__dirname, '../docs');

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

const entryFile = project.getSourceFileOrThrow(path.join(SCREENS_PATH, 'index.ts'));

// === Step 3: Find screen classes ===
const screenExports = entryFile.getExportSymbols().filter((symbol) => {
  const aliasedSymbol = symbol.getAliasedSymbol?.();
  const classDecl = aliasedSymbol?.getDeclarations()[0];
  return classDecl?.getKindName() === 'ClassDeclaration';
});

// === Step 4: Generate docs for each screen ===
for (const symbol of screenExports) {
  const screenName = symbol.getName(); // e.g., MfaCountryCodes
  const kebabName = toKebabCase(screenName); // e.g., mfa-country-codes
  const hookName = `use${screenName}`;
  const docPath = path.join(DOCS_OUTPUT_PATH, `${kebabName}.md`);
  const screenPath = path.join(SCREENS_PATH, kebabName, 'index.ts');
  const membersTypeName = `${screenName}Members`;

  const sourceFile = project.getSourceFile(screenPath);
  if (!sourceFile) {
    console.warn(`⚠️ Skipping ${screenName}: could not find ${screenPath}`);
    continue;
  }

  // === Find public methods for screen example
  const classDecl = sourceFile.getClasses().find((cls) => cls.getName() === screenName);
  const methods: string[] = classDecl
    ? classDecl
        .getMembers()
        .filter((m) => m.getKind() === SyntaxKind.MethodDeclaration)
        .map((m) => (m as MethodDeclaration).getName())
    : [];

  const exampleMethod =
    methods.length > 0
      ? `screen.${methods[0]}(${methods[0] === 'login' ? `{ identifier: 'user@example.com', password: '***' }` : '...'});`
      : '// screen method call';

  // === Extract exported types
  const exportedTypes: string[] = [];
  const exportedInterfaces: string[] = [];
  const exportedTypeAliases: string[] = [];

  const exports = sourceFile.getExportedDeclarations();
  for (const [name, declarations] of exports) {
    declarations.forEach((d) => {
      if (d.getKind() === SyntaxKind.InterfaceDeclaration) exportedInterfaces.push(name);
      if (d.getKind() === SyntaxKind.TypeAliasDeclaration) exportedTypeAliases.push(name);
    });
    exportedTypes.push(name);
  }

  const interfaceImportBlock = exportedTypes.length
    ? `**Import:**\n\n\`\`\`ts\nimport type { ${exportedTypes.join(', ')} } from '@auth0/auth0-acul-react/${kebabName}';\n\`\`\``
    : '> _(No interfaces or types exported for this screen)_';

  // === API References Block
  const apiReferencesBlock = `## 🔸 API References

This section includes all the relevant types and interfaces for this screen. Use them for typing props, payloads, and extending behaviors.

**Screen Class Reference:**  
- [\`${membersTypeName}\`](https://auth0.github.io/universal-login/interfaces/Classes.${membersTypeName}.html) — this interface describes all properties and methods exposed by the \`${screenName}\` screen.

${
  exportedInterfaces.length
    ? '**Interfaces:**\n' +
      exportedInterfaces
        .map(
          (name) =>
            `- [\`${name}\`](https://auth0.github.io/universal-login/interfaces/Classes.${name}.html)`
        )
        .join('\n')
    : ''
}

${
  exportedTypeAliases.length
    ? '\n**Types:**\n' +
      exportedTypeAliases
        .map(
          (name) =>
            `- [\`${name}\`](https://auth0.github.io/universal-login/types/Classes.${name}.html)`
        )
        .join('\n')
    : ''
}`.trim();

  // === Final Markdown Content
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

const screen = ${hookName}(); // typed as ${membersTypeName}
${exampleMethod}
\`\`\`

> View [\`${membersTypeName}\`](https://auth0.github.io/universal-login/interfaces/Classes.${membersTypeName}.html) — this interface describes all properties and methods exposed by the \`${screenName}\` screen.

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

> View [\`${membersTypeName}\`](https://auth0.github.io/universal-login/interfaces/Classes.${membersTypeName}.html) — this interface describes all properties and methods exposed by the \`${screenName}\` screen.

---

## 🔹 Interface Usage

The following interfaces and types are available for \`${screenName}\`:

${interfaceImportBlock}

---

${apiReferencesBlock}
`;

  fs.writeFileSync(docPath, content.trim() + '\n', 'utf-8');
}

console.log('📘 Successfully generated screen docs at: docs/');
