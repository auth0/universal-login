import fs from 'fs';
import path from 'path';
import { Project } from 'ts-morph';

const CORE_SDK_PATH = path.resolve(__dirname, '../../auth0-acul-js');
const DOCS_OUTPUT_PATH = path.resolve(__dirname, '../docs/screens');

// kebab-case converter
function toKebabCase(str: string): string {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}

// ensure docs output folder
fs.mkdirSync(DOCS_OUTPUT_PATH, { recursive: true });

const project = new Project({
  tsConfigFilePath: path.join(CORE_SDK_PATH, 'tsconfig.json'),
});

const entryFile = project.getSourceFileOrThrow(
  path.join(CORE_SDK_PATH, 'src/screens/index.ts')
);

const screenExports = entryFile.getExportSymbols().filter((symbol) => {
  const aliasedSymbol = symbol.getAliasedSymbol?.();
  const classDecl = aliasedSymbol?.getDeclarations()[0];
  return classDecl?.getKindName() === 'ClassDeclaration';
});

for (const symbol of screenExports) {
  const screenName = symbol.getName();               // e.g., LoginId
  const kebabName = toKebabCase(screenName);         // e.g., login-id
  const hookName = `use${screenName}`;               // useLoginId

  const docPath = path.join(DOCS_OUTPUT_PATH, `${kebabName}.md`);

  const content = `---
title: ${kebabName}
sidebar_label: ${screenName}
---

# \`${kebabName}\`

This screen represents **${screenName}**.  
_Placeholder description — customize this for your team._

---

## 🔹 Hook Usage: \`${hookName}()\`

This gives you a new \`${screenName}\` instance:

\`\`\`tsx
import { ${hookName} } from '@auth0/auth0-acul-react/${kebabName}';

const screen = ${hookName}();
screen.login({ username: 'user', password: '***' });
\`\`\`

---

## 🔹 Provider Usage

Use context to share the instance across components.

\`\`\`tsx
import {
  Auth0Provider,
  useCurrentScreen
} from '@auth0/auth0-acul-react/${kebabName}';

<Auth0Provider>
  <LoginForm />
</Auth0Provider>
\`\`\`

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
} from '@auth0/auth0-acul-react/${kebabName}';
\`\`\`

> These types are re-exported from \`auth0-acul-js/${kebabName}\`

---

## ✅ Summary

- \`${hookName}()\`: creates a new instance
- \`Auth0Provider\`: shares the instance via React context
- \`useCurrentScreen()\`: access context instance
- All interfaces are available for typing support

`;

  fs.writeFileSync(docPath, content.trim() + '\n', 'utf-8');
}

console.log('📘 Docs generated at: docs/screens/');
