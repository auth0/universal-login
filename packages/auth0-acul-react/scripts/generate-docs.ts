import fs from 'fs';
import path from 'path';
import {
  Project,
  SyntaxKind,
  InterfaceDeclaration,
  PropertySignature,
  JSDoc
} from 'ts-morph';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// === Paths ===
const CORE_SDK_PATH = path.resolve(__dirname, '../../auth0-acul-js');
const SCREENS_PATH = path.join(CORE_SDK_PATH, 'src/screens');
const INTERFACE_PATH = path.join(CORE_SDK_PATH, 'interfaces/screens');
const DOCS_OUTPUT_PATH = path.resolve(__dirname, '../docs');

// === Helpers ===
function toKebabCase(str: string): string {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}

function getMockValue(name: string): string {
  const lower = name.toLowerCase();
  if (lower.includes('email')) return `'user@example.com'`;
  if (lower.includes('username')) return `'demo-user'`;
  if (lower.includes('password')) return `'<password>'`;
  if (lower.includes('captcha')) return `'abc123'`;
  if (lower.includes('connection')) return `'google-oauth2'`;
  if (lower.includes('code')) return `'123456'`;
  if (lower.includes('token')) return `'abc.def.ghi'`;
  if (lower.includes('id')) return `'user_abc123'`;
  return `'${name}_value'`;
}

function buildPayloadExample(properties: PropertySignature[]): string {
  return (
    '{ ' +
    properties
      .map((prop) => {
        const key = prop.getName();
        return `${key}: ${getMockValue(key)}`;
      })
      .join(', ') +
    ' }'
  );
}

function getJSDocText(jsDocs: JSDoc[]): string {
  const comment = jsDocs[0]?.getComment();
  return comment ? `// ${comment}` : '';
}

// === Step 1: Cleanup
if (fs.existsSync(DOCS_OUTPUT_PATH)) {
  for (const file of fs.readdirSync(DOCS_OUTPUT_PATH)) {
    if (file.endsWith('.md')) {
      fs.unlinkSync(path.join(DOCS_OUTPUT_PATH, file));
    }
  }
} else {
  fs.mkdirSync(DOCS_OUTPUT_PATH, { recursive: true });
}

// === Step 2: Load Project
const project = new Project({
  tsConfigFilePath: path.join(CORE_SDK_PATH, 'tsconfig.json'),
});
project.addSourceFilesAtPaths(path.join(SCREENS_PATH, '**/*.ts'));
project.addSourceFilesAtPaths(path.join(INTERFACE_PATH, '**/*.ts'));

const entryFile = project.getSourceFileOrThrow(path.join(SCREENS_PATH, 'index.ts'));
const screenExports = entryFile.getExportSymbols().filter((symbol) => {
  const aliased = symbol.getAliasedSymbol?.();
  const decl = aliased?.getDeclarations()[0];
  return decl?.getKindName() === 'ClassDeclaration';
});

// === Step 3: For each screen
for (const symbol of screenExports) {
  const screenName = symbol.getName();
  const kebabName = toKebabCase(screenName);
  const docPath = path.join(DOCS_OUTPUT_PATH, `${kebabName}.md`);
  const screenPath = path.join(SCREENS_PATH, kebabName, 'index.ts');
  const hookName = `use${screenName}`;
  const membersName = `${screenName}Members`;

  const sourceFile = project.getSourceFile(screenPath);
  if (!sourceFile) continue;

  const classDecl = sourceFile.getClasses().find((cls) => cls.getName() === screenName);
  const methods = classDecl
    ? classDecl.getMethods().filter((m) => m.getScope() === 'public')
    : [];

  // Get corresponding interface for parameter structure
  const interfaceFile = project.getSourceFile(path.join(INTERFACE_PATH, `${kebabName}.ts`));
  const membersInterface = interfaceFile?.getInterface(membersName);

  // Build example block with JSDoc
  const examples =
    methods.length && membersInterface
      ? methods
          .map((method) => {
            const name = method.getName();
            const memberMethod = membersInterface.getMethod(name);
            const params = memberMethod?.getParameters();
            const jsDocComment = getJSDocText(method.getJsDocs());
            if (!params?.length) {
              return `${jsDocComment}\nscreen.${name}();`;
            }

            const paramType = params[0].getType().getSymbol()?.getDeclarations()[0];
            if (!paramType || !paramType.getKindName().includes('Interface')) {
              return `${jsDocComment}\nscreen.${name}({ /* args */ });`;
            }

            const props = (paramType as InterfaceDeclaration).getProperties();
            const payload = buildPayloadExample(props);
            return `${jsDocComment}\nscreen.${name}(${payload});`;
          })
          .join('\n\n')
      : '// screen method call';

  // Extract exports
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
    ? `**Import:**\n\n\`\`\`ts\nimport type {\n  ${exportedTypes.join(',\n  ')}\n} from '@auth0/auth0-acul-react/${kebabName}';\n\`\`\``
    : '> _(No interfaces or types exported for this screen)_';

  const apiReferencesBlock = `## 🔸 API References

📝 **Documentation:**  
- [\`${membersName}\`](https://auth0.github.io/universal-login/interfaces/Classes.${membersName}.html) — documents all methods and properties available on the \`${screenName}\` screen.

${
  exportedInterfaces.length
    ? '📃 **Interfaces:**\n' +
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
    ? '\n📃 **Types:**\n' +
      exportedTypeAliases
        .map(
          (name) =>
            `- [\`${name}\`](https://auth0.github.io/universal-login/types/Classes.${name}.html)`
        )
        .join('\n')
    : ''
}`.trim();

  const markdown = `
# \`${kebabName}\` Screen

> This screen represents the **${screenName}** flow in the Auth0 Universal Login.

---

## 🔹 Hook Usage: \`${hookName}()\`

\`\`\`tsx
import { ${hookName} } from '@auth0/auth0-acul-react/${kebabName}';

const screen = ${hookName}(); // typed as ${membersName}
${examples}
\`\`\`

> View [\`${membersName}\`](https://auth0.github.io/universal-login/interfaces/Classes.${membersName}.html) — this interface documents the full API for the \`${screenName}\` hook.

---

## 🔹 Provider Usage

\`\`\`tsx
import {
  Auth0AculProvider,
  useCurrentScreen
} from '@auth0/auth0-acul-react/${kebabName}';

<Auth0AculProvider>
  <YourScreenComponent />
</Auth0AculProvider>
\`\`\`

Then access the screen instance via context:

\`\`\`tsx
const screen = useCurrentScreen(); // typed as ${membersName}
\`\`\`

> View [\`${membersName}\`](https://auth0.github.io/universal-login/interfaces/Classes.${membersName}.html) — this interface documents the full API for the \`${screenName}\` context.

---

## 🔹 Interface Usage

${interfaceImportBlock}

---

${apiReferencesBlock}
`;

  fs.writeFileSync(docPath, markdown.trim() + '\n', 'utf-8');
}

console.log('📘 Successfully generated screen docs at: docs/');
