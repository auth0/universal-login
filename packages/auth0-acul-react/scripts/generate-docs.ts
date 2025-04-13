import fs from 'fs';
import path from 'path';
import { Project } from 'ts-morph';
import { fileURLToPath } from 'url';

// ESM-compatible __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// === Paths ===
const CORE_SDK_PATH = path.resolve(__dirname, '../../auth0-acul-js');
const DOCS_OUTPUT_PATH = path.resolve(__dirname, '../docs/screens');

// === Utility: Convert PascalCase to kebab-case ===
function toKebabCase(str: string): string {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}

// === Step 1: Clean existing docs ===
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

const entryFile = project.getSourceFileOrThrow(
  path.join(CORE_SDK_PATH, 'src/screens/index.ts')
);

// === Step 3: Filter screen classes ===
const screenExports = entryFile.getExportSymbols().filter((symbol) => {
  const aliasedSymbol = symbol.getAliasedSymbol?.();
  const classDecl = aliasedSymbol?.getDeclarations()[0];
  return classDecl?.getKindName() === 'ClassDeclaration';
});

// === Step 4: Generate docs per screen ===
for (const symbol of screenExports) {
  const screenName = symbol.getName();               // e.g., LoginId
  const kebabName = toKebabCase(screenName);         // e.g., login-id
  const hookName = `use${screenName}`;               // e.g., useLoginId
  const docPath = path.join(DOCS_OUTPUT_PATH, `${kebabName}.md`);

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
const screen = useCurrentScreen(); // typed as ${screenName}
\`\`\`

---

## 🔹 Interface Usage

\`\`\`ts
import type {
  ${screenName}Options,
  ${screenName}Properties,
  ${screenName}ScreenData
} from '@auth0/auth0-acul-js/${kebabName}';
\`\`\`

> These types are re-exported from the original \`auth0-acul-js\` core SDK.

---

## ✅ Summary

- \`${hookName}()\` — instantiates the screen class
- \`Auth0AculProvider\` — provides it via context
- \`useCurrentScreen()\` — context consumer (typed)
- Type interfaces: \`${screenName}Options\`, \`${screenName}Properties\`, \`${screenName}ScreenData\`

---

ℹ️ **Note:** Only one screen instance should be active per page load. These docs reflect partial import usage, which supports tree-shaking and per-screen optimization.
`;

  fs.writeFileSync(docPath, content.trim() + '\n', 'utf-8');
}

console.log('📘 Successfully generated screen docs at: docs/screens/');
