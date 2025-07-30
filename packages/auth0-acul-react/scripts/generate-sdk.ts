import fs from 'fs';
import path from 'path';
import { Project, SyntaxKind } from 'ts-morph';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CORE_SDK_PATH = path.resolve(__dirname, '../../auth0-acul-js');
const DOCS_INDEX_PATH = path.join(CORE_SDK_PATH, 'docs', 'index.json');

const SCREENS_OUTPUT_PATH = path.resolve(__dirname, '../src/screens');
const HOOKS_FOLDER = path.resolve(__dirname, '../src/hooks');
const CONTEXT_HOOKS_PATH = path.resolve(HOOKS_FOLDER, 'context-hooks.tsx');
const UTILITY_HOOKS_PATH = path.resolve(HOOKS_FOLDER, 'utility-hooks.tsx');
const COMMON_HOOKS_PATH = path.resolve(HOOKS_FOLDER, 'common-hooks.tsx');
const INDEX_FILE_PATH = path.resolve(__dirname, '../src/index.ts');
const PACKAGE_JSON_PATH = path.resolve(__dirname, '../package.json');

const CONTEXT_MODELS = [
  'user', 'tenant', 'branding', 'client', 'organization',
  'prompt', 'screen', 'transaction', 'untrustedData'
];

function toKebabCase(str: string): string {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

function toPascal(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function toPascalFromKebab(str: string): string {
  return str.split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

function collectTypedocExports(): Set<string> {
  const valid = new Set<string>();
  if (!fs.existsSync(DOCS_INDEX_PATH)) return valid;
  const docJson = JSON.parse(fs.readFileSync(DOCS_INDEX_PATH, 'utf8'));

  function walk(node: any) {
    if (node.kind === 256 && typeof node.name === 'string') {
      valid.add(node.name);
    }
    if (node.children) node.children.forEach(walk);
  }

  walk(docJson);
  return valid;
}

const VALID_TYPEDOC_EXPORTS = collectTypedocExports();

fs.mkdirSync(SCREENS_OUTPUT_PATH, { recursive: true });
fs.mkdirSync(HOOKS_FOLDER, { recursive: true });
fs.writeFileSync(UTILITY_HOOKS_PATH, '// Manual utility hooks go here\n', 'utf8');
fs.writeFileSync(COMMON_HOOKS_PATH, '// Manual common hooks go here\n', 'utf8');

const project = new Project({ tsConfigFilePath: path.join(CORE_SDK_PATH, 'tsconfig.json') });
const entry = project.getSourceFileOrThrow(path.join(CORE_SDK_PATH, 'src/screens/index.ts'));

const screenSymbols = entry.getExportSymbols().filter(symbol => {
  const aliased = symbol.getAliasedSymbol?.();
  const decl = aliased?.getDeclarations()[0];
  return decl?.getKind() === SyntaxKind.ClassDeclaration;
});

const pkg = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, 'utf8'));
pkg.exports ||= {};
pkg.exports['.'] = { import: './dist/index.js', types: './dist/index.d.ts' };

const sharedHooks = `// AUTO-GENERATED FILE - DO NOT EDIT
export class ContextHooks<T> {
  constructor(private instance: T) {}
  ${CONTEXT_MODELS.filter(m => !['screen', 'transaction'].includes(m))
    .map(m => `use${toPascal(m)} = () => this.instance.${m} as T['${m}'];`)
    .join('\n  ')}
}`;
fs.writeFileSync(CONTEXT_HOOKS_PATH, sharedHooks + '\n', 'utf8');

const indexExports: string[] = [];
const indexTypes: string[] = [];

for (const symbol of screenSymbols) {
  const screenName = symbol.getName();
  const kebab = toKebabCase(screenName);

  const screenFile = project.getSourceFile(path.join(CORE_SDK_PATH, `src/screens/${kebab}/index.ts`));
  if (!screenFile) continue;

  const cls = screenFile.getClass(screenName);
  if (!cls) continue;

  const allProps = new Set<string>();
  let proto = cls;
  while (proto) {
    proto.getInstanceProperties()
      .filter(p => p.getKind() === SyntaxKind.PropertyDeclaration)
      .forEach(p => allProps.add(p.getName()));
    const baseType = proto.getBaseClass();
    if (!baseType) break;
    proto = baseType;
  }

  const ifaceFile = project.getSourceFile(path.join(CORE_SDK_PATH, `interfaces/screens/${kebab}.ts`));
  const typedInterfaces = new Set<string>();
  const allExportedInterfaces = new Set<string>();

  if (ifaceFile) {
    for (const [name, decls] of ifaceFile.getExportedDeclarations()) {
      for (const d of decls) {
        if (d.getKind() === SyntaxKind.InterfaceDeclaration && VALID_TYPEDOC_EXPORTS.has(name)) {
          typedInterfaces.add(name);
          allExportedInterfaces.add(name);
        }
      }
    }
  }

  const usedInterfaces = new Set<string>();
  const instanceHook = `use${screenName}`;
  const baseInterface = `${screenName}Members`;
  const screenLines: string[] = [];

  screenLines.push(`// AUTO-GENERATED FILE - DO NOT EDIT`);
  screenLines.push(`import { useMemo } from 'react';`);
  screenLines.push(`import ${screenName} from '@auth0/auth0-acul-js/${kebab}';`);
  screenLines.push(`import { ContextHooks } from '../hooks/context-hooks';\n`);

  usedInterfaces.add(baseInterface);

  screenLines.push(`export const ${instanceHook} = (): ${baseInterface} => useMemo(() => new ${screenName}(), []);\n`);
  screenLines.push(`const instance = ${instanceHook}();`);
  screenLines.push(`const factory = new ContextHooks<${baseInterface}>(instance);\n`);

  const shared = CONTEXT_MODELS.filter(m => !['screen', 'transaction'].includes(m));
  screenLines.push(`export const {\n  ${shared.map(m => `use${toPascal(m)}`).join(',\n  ')}\n} = factory;\n`);

  for (const model of ['screen', 'transaction']) {
    if (!allProps.has(model)) continue;
    const pascal = toPascal(model);
    const specific = `${pascal}MembersOn${screenName}`;
    const hookName = `use${pascal}`;
    if (typedInterfaces.has(specific)) {
      screenLines.push(`export const ${hookName}: () => ${specific} = () => instance.${model};`);
      usedInterfaces.add(specific);
    } else {
      screenLines.push(`export const ${hookName} = () => instance.${model};`);
    }
  }

  const usedTypeImports = Array.from(usedInterfaces);
  if (usedTypeImports.length) {
    screenLines.splice(3, 0, `import type { ${usedTypeImports.join(', ')} } from '@auth0/auth0-acul-js/${kebab}';`);
  }

  // Export all valid interfaces from Typedoc
  if (allExportedInterfaces.size) {
    // convert screenName to PascalCase from kebab-case
    const pascalScreenName = toPascalFromKebab(screenName);
    screenLines.push(`\nexport type { ${Array.from(allExportedInterfaces).map(interfaceName => {
      // check if the interface name endswith the screen name
      if (interfaceName.endsWith(pascalScreenName)) {
        return interfaceName;
      } else {
        return `${interfaceName} as ${interfaceName}On${pascalScreenName}`;
      }
    }).join(', ')} } from '@auth0/auth0-acul-js/${kebab}';`);
  }

  fs.writeFileSync(
    path.join(SCREENS_OUTPUT_PATH, `${kebab}.tsx`),
    screenLines.join('\n'),
    'utf8'
  );

  pkg.exports[`./${kebab}`] = {
    import: `./dist/screens/${kebab}.js`,
    types: `./dist/screens/${kebab}.d.ts`
  };

  indexExports.push(`export { ${instanceHook} } from './screens/${kebab}';`);
  if (allExportedInterfaces.size > 0) {
    indexTypes.push(`// ${screenName}`);
    // convert screenName to PascalCase from kebab-case
    const pascalScreenName = toPascalFromKebab(screenName);
    indexTypes.push(`export type { ${Array.from(allExportedInterfaces).map(interfaceName => {
      // check if the interface name endswith the screen name
      if (interfaceName.endsWith(pascalScreenName)) {
        return interfaceName;
      } else {
        return `${interfaceName}On${pascalScreenName}`;
      }
    }).join(', ')} } from './screens/${kebab}';`);
  }

  console.log(`✅ ${screenName}: clean exports with shared + overridden context hooks`);
}

fs.writeFileSync(PACKAGE_JSON_PATH, JSON.stringify(pkg, null, 2), 'utf8');

fs.writeFileSync(
  INDEX_FILE_PATH,
  `// AUTO-GENERATED INDEX - DO NOT EDIT\n\n${indexExports.join('\n')}\n\n${indexTypes.join('\n')}\n`,
  'utf8'
);

console.log('\n🏁 Done: Shared + overridden hook exports + root index updated.');
