import fs from 'fs';
import path from 'path';
import {
  Project,
  SyntaxKind,
  PropertySignature,
  JSDoc
} from 'ts-morph';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CORE_SDK_PATH = path.resolve(__dirname, '../../auth0-acul-js');
const SCREENS_PATH = path.join(CORE_SDK_PATH, 'src/screens');
const INTERFACE_PATH = path.join(CORE_SDK_PATH, 'interfaces/screens');
const OUTPUT_PATH = path.resolve(__dirname, '../examples');

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
  return `'<${name}>'`;
}

function buildPayload(props: PropertySignature[]): string {
  return (
    '{ ' +
    props.map(p => `${p.getName()}: ${getMockValue(p.getName())}`).join(', ') +
    ' }'
  );
}

function getComment(jsDocs: JSDoc[]): string {
  const c = jsDocs[0]?.getComment();
  return c ? `// ${c}` : '';
}

// Clean up old .md files
if (fs.existsSync(OUTPUT_PATH)) {
  fs.readdirSync(OUTPUT_PATH)
    .filter(f => f.endsWith('.md'))
    .forEach(f => fs.unlinkSync(path.join(OUTPUT_PATH, f)));
} else {
  fs.mkdirSync(OUTPUT_PATH, { recursive: true });
}

// Load project
const project = new Project({
  tsConfigFilePath: path.join(CORE_SDK_PATH, 'tsconfig.json'),
});
project.addSourceFilesAtPaths(path.join(SCREENS_PATH, '**/*.ts'));
project.addSourceFilesAtPaths(path.join(INTERFACE_PATH, '**/*.ts'));

const indexFile = project.getSourceFileOrThrow(path.join(SCREENS_PATH, 'index.ts'));
const screenSymbols = indexFile.getExportSymbols().filter(sym => {
  const aliased = sym.getAliasedSymbol?.();
  const decl = aliased?.getDeclarations()[0];
  return decl?.getKind() === SyntaxKind.ClassDeclaration;
});

for (const sym of screenSymbols) {
  const screenName = sym.getName();
  const kebab = toKebabCase(screenName);
  const mdPath = path.join(OUTPUT_PATH, `${kebab}.md`);
  const implFile = path.join(SCREENS_PATH, kebab, 'index.ts');

  const factoryHook = `use${screenName}Instance`;
  const provider = `${screenName}Provider`;
  const contextHook = `use${screenName}Context`;
  const membersIface = `${screenName}Members`;

  const sf = project.getSourceFile(implFile);
  if (!sf) continue;
  const cls = sf.getClass(screenName);
  const methods = cls?.getMethods().filter(m => m.getScope() === 'public') || [];

  // Build example calls
  const examples = methods.length
    ? methods
        .map(m => {
          const name = m.getName();
          const comment = getComment(m.getJsDocs());
          const ifaceFile = project.getSourceFile(path.join(INTERFACE_PATH, `${kebab}.ts`));
          const membersInterface = ifaceFile?.getInterface(membersIface);
          let props: PropertySignature[] = [];
          if (membersInterface) props = membersInterface.getProperties();
          if (!props.length) {
            return `${comment}\nscreen.${name}({ /* args */ });`;
          }
          const payload = buildPayload(props);
          return `${comment}\nscreen.${name}(${payload});`;
        })
        .join('\n\n')
    : '// invoke screen methods here';

  // Collect exported interfaces & type aliases
  const exportedInterfaces: string[] = [];
  const exportedTypeAliases: string[] = [];
  sf.getExportedDeclarations().forEach((decls, name) => {
    decls.forEach(d => {
      if (d.getKind() === SyntaxKind.InterfaceDeclaration) exportedInterfaces.push(name);
      if (d.getKind() === SyntaxKind.TypeAliasDeclaration) exportedTypeAliases.push(name);
    });
  });

  const markdown = `# \`${kebab}\` Screen

> This screen represents the **${screenName}** flow in Auth0 Universal Login.

---

## 🔹 Factory Hook
### Root import
\`\`\`tsx
import { ${factoryHook} } from '@auth0/auth0-acul-react/${kebab}';

const screen = ${factoryHook}(); // typed as ${membersIface}
${examples}
\`\`\`

### Partial import
\`\`\`tsx
import { ${factoryHook} } from '@auth0/auth0-acul-react';

const screen = ${factoryHook}(); // typed as ${membersIface}
\`\`\`

---

## 🔹 Context Usage

### Root import
\`\`\`tsx
import { ${provider}, ${contextHook} } from '@auth0/auth0-acul-react/${kebab}';

function App() {
  return (
    <${provider}>
      <ScreenComponent />
    </${provider}>
  );
}

function ScreenComponent() {
  const screen = ${contextHook}(); // typed as ${membersIface}
  // use screen methods here
  return <div>{/* UI */}</div>;
}
\`\`\`


### Partial import
\`\`\`tsx
import { ${provider}, ${contextHook} } from '@auth0/auth0-acul-react';

function App() {
  return (
    <${provider}>
      <ScreenComponent />
    </${provider}>
  );
}

function ScreenComponent() {
  const screen = ${contextHook}(); // typed as ${membersIface}
  return <div />;
}
\`\`\`

---
`;

  fs.writeFileSync(mdPath, markdown.trim() + '\n', 'utf-8');
}

console.log('✅ Examples generated in:', OUTPUT_PATH);
