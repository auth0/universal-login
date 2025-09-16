import fs from 'fs';
import path from 'path';
import { Project, SyntaxKind, InterfaceDeclaration } from 'ts-morph';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CORE_SDK_PATH = path.resolve(__dirname, '../../auth0-acul-js');
const DOCS_INDEX_PATH = path.join(CORE_SDK_PATH, 'docs', 'index.json');

const SCREENS_OUTPUT_PATH = path.resolve(__dirname, '../src/screens');
const HOOKS_FOLDER = path.resolve(__dirname, '../src/hooks');
const CONTEXT_HOOKS_PATH = path.resolve(HOOKS_FOLDER, 'context/index.tsx');
const UTILITY_HOOKS_PATH = path.resolve(HOOKS_FOLDER, 'utility/resend-manager.ts');
const COMMON_HOOKS_PATH = path.resolve(HOOKS_FOLDER, 'common/index.ts');
const INDEX_FILE_PATH = path.resolve(__dirname, '../src/index.ts');
const PACKAGE_JSON_PATH = path.resolve(__dirname, '../package.json');
const EXAMPLES_PATH = path.resolve(__dirname, '../examples');

const CONTEXT_MODELS = [
  'user', 'tenant', 'branding', 'client', 'organization',
  'prompt', 'screen', 'transaction', 'untrustedData'
];

// Types for exported method discovery
type ExportedMethodParam = { name: string; type: string; isOptional: boolean };
type ExportedMethod = { name: string; params: ExportedMethodParam[] };

function toKebabCase(str: string): string {
  // Handle special cases: WebAuthn and OTP acronyms
  return str
    .replace(/WebAuthn/g, 'Webauthn')
    .replace(/OTP/g, 'Otp')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase();
}

function toPascal(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function toPascalFromKebab(str: string): string {
  return str.split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

// Handle reserved keywords that can't be used as variable names
function getSafeMethodName(name: string): string {
  // Reserved keywords in JavaScript/TypeScript
  const reservedKeywords = ['continue', 'break', 'case', 'catch', 'const'];

  if (reservedKeywords.includes(name)) {
    return `${name}Method`;
  }
  return name;
}

function generateExampleContent(
  screenName: string,
  kebab: string,
  contextHooks: string[],
  screenMethods: string[]
): string {
  const mainHook = `use${screenName}`;

  const primaryMethodCandidates = ['login', 'submit', 'continue', 'send', 'verify', 'challenge', 'resend', 'select'];
  let primaryMethod = screenMethods.find(m => primaryMethodCandidates.includes(m)) || screenMethods[0] || 'submit';
  primaryMethod = getSafeMethodName(primaryMethod);

  const availableContextHooks = CONTEXT_MODELS
    .filter(m => !['screen', 'transaction'].includes(m))
    .map(m => `use${toPascal(m)}`);

  const componentName = `${screenName}`;

  const tsxExample = `import React, { useState } from 'react';
import {
  ${mainHook},
  ${availableContextHooks.join(',\n  ')}
} from '@auth0/auth0-acul-react/${kebab}';

export const ${componentName}: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Main hook for screen logic
  const screen = ${mainHook}();

  // Context hooks
  ${availableContextHooks.map(hook => `const ${hook.replace('use', '').toLowerCase()}Data = ${hook}();`).join('\n  ')}

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // TODO: Gather data from form inputs
      const payload = {};
      await screen.${primaryMethod}(payload);
      // On success, the core SDK handles redirection.
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>${screenName}</h1>

      {/* TODO: Add form inputs for the '${primaryMethod}' payload */}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Processing...' : 'Continue'}
      </button>
    </form>
  );
};`;

  return `# \`${kebab}\`

The \`${kebab}\` screen is used to handle [purpose of the screen].

## ⚛️ React Example

This example demonstrates how to build a React component for the \`${kebab}\` screen.

### 1. Create the Component

Create a component file (e.g., \`${componentName}.tsx\`) and add the following code:

\`\`\`tsx
${tsxExample}
\`\`\`

### 2. How It Works

1.  **Imports**: We import \`${mainHook}\` and various context hooks from the dedicated \`@auth0/auth0-acul-react/${kebab}\` entry point.
2.  **Hooks**:
    *   \`${mainHook}()\`: Provides the core screen object with methods like \`${primaryMethod}()\`.
    *   Context hooks like \`useUser()\` and \`useTenant()\` provide read-only data about the current state.
3.  **State Management**: \`useState\` is used to manage form state, such as loading indicators and error messages.
4.  **Form Submission**:
    *   The \`handleSubmit\` function calls \`screen.${primaryMethod}(payload)\`.
    *   You must replace the empty \`payload\` object with the actual data from your form inputs.
    *   The core SDK will handle the API request and subsequent redirection on success.
    *   Errors are caught and can be displayed to the user.
`;
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
fs.mkdirSync(path.dirname(UTILITY_HOOKS_PATH), { recursive: true });
fs.mkdirSync(path.dirname(COMMON_HOOKS_PATH), { recursive: true });
fs.mkdirSync(path.dirname(CONTEXT_HOOKS_PATH), { recursive: true });
fs.mkdirSync(EXAMPLES_PATH, { recursive: true });

// Only create utility hooks file if it doesn't exist (preserve existing content)
if (!fs.existsSync(UTILITY_HOOKS_PATH)) {
  fs.writeFileSync(UTILITY_HOOKS_PATH, '// Manual utility hooks go here\n', 'utf8');
}

// Only create common hooks file if it doesn't exist (preserve existing content)  
if (!fs.existsSync(COMMON_HOOKS_PATH)) {
  fs.writeFileSync(COMMON_HOOKS_PATH, '// Manual common hooks go here\n', 'utf8');
}

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

const commonHooksContent = `import { getCurrentScreenOptions, getCurrentThemeOptions, getErrors, CurrentScreenOptions, FlattenedTheme, type Error as TransactionError } from '@auth0/auth0-acul-js';

export const useCurrentScreen = (): CurrentScreenOptions | null => {
  return getCurrentScreenOptions();
};

export const useAuth0Themes = (): FlattenedTheme | null => {
  return getCurrentThemeOptions();
};

export const useErrors = (): TransactionError[] | null => {
  return getErrors();
};
`;

// Only write common hooks if the file doesn't exist or contains placeholder content
const existingContent = fs.existsSync(COMMON_HOOKS_PATH) ? fs.readFileSync(COMMON_HOOKS_PATH, 'utf8') : '';
if (!fs.existsSync(COMMON_HOOKS_PATH) || existingContent.includes('// Manual common hooks go here')) {
  fs.writeFileSync(COMMON_HOOKS_PATH, commonHooksContent, 'utf8');
  console.log('✅ Common hooks generated in common/index.ts');
} else {
  console.log('✅ Common hooks preserved (existing content found)');
}

const sharedHooks = `import { type BaseMembers } from "@auth0/auth0-acul-js";

// AUTO-GENERATED FILE - DO NOT EDIT
export class ContextHooks<T extends BaseMembers> {
  constructor(private instance: () => T) {}
  ${CONTEXT_MODELS.filter(m => !['screen', 'transaction'].includes(m))
    .map(m => `use${toPascal(m)} = () => this.instance().${m} as T['${m}'];`)
    .join('\n  ')}
}`;

fs.writeFileSync(CONTEXT_HOOKS_PATH, sharedHooks + '\n', 'utf8');

const indexExports: string[] = [];
const indexTypes: string[] = [];

indexExports.push(`export { useCurrentScreen, useAuth0Themes, useErrors2 } from './hooks/common';`);

let screenCount = 0;

for (const symbol of screenSymbols) {
  const screenName = symbol.getName();
  const kebab = toKebabCase(screenName);

  const exampleFilePath = path.join(EXAMPLES_PATH, `${kebab}.md`);
  if (!fs.existsSync(exampleFilePath)) {
    const ifaceFile = project.getSourceFile(path.join(CORE_SDK_PATH, `interfaces/screens/${kebab}.ts`));
    const screenMethods: string[] = [];

    if (ifaceFile) {
      for (const [name, decls] of ifaceFile.getExportedDeclarations()) {
        for (const d of decls) {
          if (name === `${screenName}Members` && d instanceof InterfaceDeclaration) {
            d.getMembers()
              .filter(member => member.getKind() === SyntaxKind.MethodSignature)
              .forEach(method => {
                screenMethods.push(method.getSymbol()?.getName() || '');
              });
          }
        }
      }
    }

    const exampleContent = generateExampleContent(screenName, kebab, CONTEXT_MODELS, screenMethods);
    fs.writeFileSync(exampleFilePath, exampleContent, 'utf8');
  }

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
  const exportedMethods: ExportedMethod[] = [];

  if (ifaceFile) {
    for (const [name, decls] of ifaceFile.getExportedDeclarations()) {
      for (const d of decls) {
        if (d.getKind() === SyntaxKind.InterfaceDeclaration && VALID_TYPEDOC_EXPORTS.has(name)) {
          typedInterfaces.add(name);
          allExportedInterfaces.add(name);
          if (name === `${screenName}Members` && d instanceof InterfaceDeclaration) {
            d.getMembers()
              .filter(member => member.getKind() === SyntaxKind.MethodSignature)
              .forEach(method => {
                const methodSignature = method.asKindOrThrow(SyntaxKind.MethodSignature);
                const methodName = methodSignature.getName();
                const params = methodSignature.getParameters().map(p => {
                  const paramType = p.getTypeNode()?.getText() || p.getType().getText(p);
                  return {
                    name: p.getName(),
                    type: paramType,
                    isOptional: p.isOptional(),
                  } as ExportedMethodParam;
                });
                exportedMethods.push({ name: methodName, params });
              });
          }
        }
      }
    }
  }

  const usedInterfaces = new Set<string>();
  const instanceHook = `use${screenName}`;
  const baseInterface = `${screenName}Members`;
  const screenLines: string[] = [];

  const hasDefaultExport = !!screenFile.getDefaultExportSymbol();
  screenLines.push(`import { useMemo } from 'react';`);
  screenLines.push(
    hasDefaultExport
      ? `import ${screenName} from '@auth0/auth0-acul-js/${kebab}';`
      : `import { ${screenName} } from '@auth0/auth0-acul-js/${kebab}';`
  );
  screenLines.push(`import { ContextHooks } from '../hooks/context';\n`);

  usedInterfaces.add(baseInterface);
  
  // Extract type identifiers from method parameters for imports
  // Transform "LoginOptions | undefined" → ["LoginOptions"], "Promise<T>" → ["Promise", "T"], etc.
  const PRIMITIVES = new Set(['any', 'string', 'number', 'boolean', 'undefined', 'void', 'null']);
  
  exportedMethods.forEach(m => m.params.forEach(p => {
    const typeTokens = p.type
      .replace(/\[\]/g, '')                    // Remove arrays: Type[] → Type
      .replace(/[<>|&]/g, ',')                 // Split on: generics, unions, intersections
      .split(',')                              // Split into tokens
      .map(t => t.trim())                      // Clean whitespace
      .filter(t => t && !PRIMITIVES.has(t) && !t.startsWith('{')); // Keep only importable types
    
    typeTokens.forEach(t => usedInterfaces.add(t));
  }));

  // Lazy singleton instance
  screenLines.push(`let instance: ${baseInterface} | null = null;`);
  screenLines.push(`const getInstance = (): ${baseInterface} => {`);
  screenLines.push(`  if (!instance) {`);
  screenLines.push(`    instance = new ${screenName}();`);
  screenLines.push(`  }`);
  screenLines.push(`  return instance;`);
  screenLines.push(`};\n`);

  // Main hook (memoized)
  screenLines.push(`export const ${instanceHook} = (): ${baseInterface} => useMemo(() => getInstance(), []);\n`);

  // Context hooks factory (unchanged logic but now uses singleton)
  screenLines.push(`const factory = new ContextHooks<${baseInterface}>(getInstance);\n`);
  const shared = CONTEXT_MODELS.filter(m => !['screen', 'transaction'].includes(m));
  screenLines.push(`export const {`);
  screenLines.push(`  ${shared.map(m => `use${toPascal(m)}`).join(',\n  ')}`);
  screenLines.push(`} = factory;\n`);

  // screen / transaction hooks with useMemo
  for (const model of ['screen', 'transaction']) {
    if (!allProps.has(model)) continue;
    const pascal = toPascal(model);
    const specific = `${pascal}MembersOn${screenName}`;
    const hookName = `use${pascal}`;
    if (typedInterfaces.has(specific)) {
      screenLines.push(`export const ${hookName}: () => ${specific} = () => useMemo(() => getInstance().${model}, []);`);
      usedInterfaces.add(specific);
    } else {
      screenLines.push(`export const ${hookName} = () => useMemo(() => getInstance().${model}, []);`);
    }
  }

  if (exportedMethods.length) {
    screenLines.push(`\n// Screen methods`);
    for (const method of exportedMethods) {
      const safe = getSafeMethodName(method.name);
      const args = method.params.map(p => `${p.name}${p.isOptional ? '?' : ''}: ${p.type}`).join(', ');
      const argNames = method.params.map(p => p.name).join(', ');
      screenLines.push(`export const ${safe} = (${args}) => getInstance().${method.name}(${argNames});`);
    }
  }

  // Check if this screen has resendManager method and add useResend hook
  const hasResendManager = exportedMethods.some(method => method.name === 'resendManager');
  if (hasResendManager) {
    // Add resend utility import after context hooks import
    const contextImportIndex = screenLines.findIndex(line => line.includes("import { ContextHooks } from '../hooks/context';"));
    if (contextImportIndex !== -1) {
      screenLines.splice(contextImportIndex + 1, 0, `import { resendManager as resendUtility } from '../hooks/utility/resend-manager';`);
      screenLines.splice(contextImportIndex + 2, 0, `import type { UseResendParams, UseResendReturn } from '../interfaces/common';`);
      screenLines.splice(contextImportIndex + 3, 0, ``); // Add empty line after imports
    }

    // Add useResend hook after screen methods
    screenLines.push(`\n// Resend hook`);
    screenLines.push(`export const useResend = (payload?: UseResendParams): UseResendReturn => {`);
    screenLines.push(`  const screenInstance = useMemo(() => getInstance(), []);`);
    screenLines.push(`  return resendUtility(screenInstance, payload);`);
    screenLines.push(`};`);
  }

  // Insert type import after imports
  const usedTypeImports = Array.from(usedInterfaces);
  if (usedTypeImports.length) {
    // After comment + useMemo import + class import => index 3
    screenLines.splice(3, 0, `import type { ${usedTypeImports.join(', ')} } from '@auth0/auth0-acul-js/${kebab}';`);
  }

  if (allExportedInterfaces.size) {
    screenLines.push(`\nexport type { ${Array.from(allExportedInterfaces).join(', ')} } from '@auth0/auth0-acul-js/${kebab}';`);
  }

  screenLines.push(`\nexport type * from '@auth0/auth0-acul-js/${kebab}';`)

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

  console.log(`✅ ${screenName}: Exports with shared + overridden context hooks and methods`);
  screenCount++; // <- Count increment
}

fs.writeFileSync(PACKAGE_JSON_PATH, JSON.stringify(pkg, null, 2), 'utf8');

// Add common types from core SDK
indexTypes.push('\n// Common types from core SDK');
indexTypes.push(`export type * from '@auth0/auth0-acul-js';`);

fs.writeFileSync(
  INDEX_FILE_PATH,
  `${indexExports.join('\n')}\n\n${indexTypes.join('\n')}\n`,
  'utf8'
);

const FUNCTIONS_TS_PATH = path.resolve(__dirname, '../src/classes.ts');
const INTERFACES_TS_PATH = path.resolve(__dirname, '../src/interfaces.ts');
const EXPORT_TS_PATH = path.resolve(__dirname, '../src/export.ts');

const functionLines: string[] = [];
const screenFiles = fs.readdirSync(SCREENS_OUTPUT_PATH).filter(f => f.endsWith('.tsx'));

for (const file of screenFiles) {
  const kebab = file.replace('.tsx', '');
  const pascal = toPascalFromKebab(kebab);
  const screenPath = `./screens/${kebab}`;
  const source = fs.readFileSync(path.join(SCREENS_OUTPUT_PATH, file), 'utf8');

  const exportRegex = /^export\s+(const|function)\s+([a-zA-Z0-9_]+)\s*[(:=]/gm;
  const reExportRegex = /^export\s+\{\s*([a-zA-Z0-9_,\s]+)\s*\}\s+from\s+['"][^'"]+['"]/gm;
  let match;
  const exports: string[] = [];

  while ((match = exportRegex.exec(source)) !== null) {
    exports.push(match[2]);
  }

  while ((match = reExportRegex.exec(source)) !== null) {
    match[1].split(',').map(e => e.trim()).forEach(e => {
      if (e) exports.push(e);
    });
  }

  if (exports.length) {
    const aliasedImports = exports.map(identifier => {
      return `${identifier} as ${identifier}_${pascal}`;
    });
    functionLines.push(`import { ${aliasedImports.join(', ')} } from '${screenPath}';`);
    functionLines.push(`export namespace ${pascal} {`);
    exports.forEach(identifier => {
      functionLines.push(`  export const ${identifier} = ${identifier}_${pascal};`);
    });
    functionLines.push('}\n');
  }
}
  functionLines.push(`import { useCurrentScreen as use_currentScreen, useAuth0Themes as use_Auth0Themes, useErrors2 as use_Errors } from '../src/hooks/common';`);
  functionLines.push(`export namespace CommonHooks {
    export const useCurrentScreen = use_currentScreen;
    export const useAuth0Themes = use_Auth0Themes;
    export const useErrors = use_Errors;
  }\n`);

const screenFilesForInterfaces = fs.readdirSync(SCREENS_OUTPUT_PATH).filter(f => f.endsWith('.tsx'));
const INTERFACES_OUTPUT_PATH = path.resolve(__dirname, '../src/interfaces');
fs.mkdirSync(INTERFACES_OUTPUT_PATH, { recursive: true });

const screenInterfaceExports: string[] = [];

for (const file of screenFilesForInterfaces) {
  const kebab = file.replace('.tsx', '');
  const pascal = toPascalFromKebab(kebab);

  // Find all type exports for this screen in the generated screen file
  const source = fs.readFileSync(path.join(SCREENS_OUTPUT_PATH, file), 'utf8');
  const typeExportRegex = /^export\s+type\s+\{\s*([^}]+)\s*\}\s+from\s+['"]([^'"]+)['"]/gm;
  let match;
  const types: string[] = [];

  while ((match = typeExportRegex.exec(source)) !== null) {
    match[1].split(',').map(e => e.trim()).forEach(e => {
      if (e) types.push(e);
    });
  }

  if (types.length) {
    const interfaceFilePath = path.join(INTERFACES_OUTPUT_PATH, `${kebab}.ts`);
    const interfaceContent = `export type { ${types.join(', ')} } from '@auth0/auth0-acul-js/${kebab}';
`;
    fs.writeFileSync(interfaceFilePath, interfaceContent, 'utf8');
    screenInterfaceExports.push(`export * as ${pascal} from './interfaces/${kebab}';`);
    console.log(`✅ interfaces/${kebab}.ts generated`);
  }
}

// Add Common interfaces export
screenInterfaceExports.push('export * as Common from \'./interfaces/common\';');

fs.writeFileSync(
  INTERFACES_TS_PATH,
  `${screenInterfaceExports.join('\n')}\n` + 'export {}',
  'utf8'
);
console.log('✅ interfaces.ts generated with grouped screenwise exports');
fs.writeFileSync(
  FUNCTIONS_TS_PATH,
  '/* eslint-disable @typescript-eslint/no-namespace */\n' + functionLines.join('\n'),
  'utf8'
);

const exportLines: string[] = [];
exportLines.push(`export * as Classes from './classes';`);
exportLines.push(`export * as Interfaces from './interfaces';`);
fs.writeFileSync(EXPORT_TS_PATH, exportLines.join('\n'), 'utf8');

console.log(`\n🏁 Done: ${screenCount} screen${screenCount === 1 ? '' : 's'} generated with shared + overridden hook exports. Root index updated.`);
