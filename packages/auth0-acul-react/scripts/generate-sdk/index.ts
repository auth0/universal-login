import fs from 'fs';
import path from 'path';
import { logger } from '../logger';

import { Project, SyntaxKind, InterfaceDeclaration } from 'ts-morph';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CORE_SDK_PATH = path.resolve(__dirname, '../../../auth0-acul-js');
const DOCS_INDEX_PATH = path.join(CORE_SDK_PATH, 'docs', 'index.json');
const UTILITY_MAP_PATH = path.resolve(__dirname, './utility-map.json');

const SCREENS_OUTPUT_PATH = path.resolve(__dirname, '../../src/screens');
const INDEX_FILE_PATH = path.resolve(__dirname, '../../src/index.ts');

const CONTEXT_MODELS = [
  'user',
  'tenant',
  'branding',
  'client',
  'organization',
  'prompt',
  'screen',
  'transaction',
  'untrustedData',
];

let errorCount = 0;

// Types for exported method discovery
type ExportedMethodParam = { name: string; type: string; isOptional: boolean };
type ExportedMethod = { name: string; params: ExportedMethodParam[]; isUtility?: boolean };

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
  return str
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
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

const project = new Project({ tsConfigFilePath: path.join(CORE_SDK_PATH, 'tsconfig.json') });
const entry = project.getSourceFileOrThrow(path.join(CORE_SDK_PATH, 'src/screens/index.ts'));

const utilityMap = JSON.parse(fs.readFileSync(UTILITY_MAP_PATH, 'utf8'));

const screenSymbols = entry.getExportSymbols().filter((symbol) => {
  const aliased = symbol.getAliasedSymbol?.();
  const decl = aliased?.getDeclarations()[0];
  return decl?.getKind() === SyntaxKind.ClassDeclaration;
});

const indexExports: string[] = [];
const indexTypes: string[] = [];

let screenCount = 0;

for (const symbol of screenSymbols) {
  const screenName = symbol.getName();
  const kebab = toKebabCase(screenName);

  const screenFile = project.getSourceFile(
    path.join(CORE_SDK_PATH, `src/screens/${kebab}/index.ts`)
  );
  if (!screenFile) continue;

  const cls = screenFile.getClass(screenName);
  if (!cls) continue;

  const allProps = new Set<string>();
  let proto = cls;
  while (proto) {
    proto
      .getInstanceProperties()
      .filter((p) => p.getKind() === SyntaxKind.PropertyDeclaration)
      .forEach((p) => allProps.add(p.getName()));
    const baseType = proto.getBaseClass();
    if (!baseType) break;
    proto = baseType;
  }

  const ifaceFile = project.getSourceFile(
    path.join(CORE_SDK_PATH, `interfaces/screens/${kebab}.ts`)
  );
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
              .filter((member) => member.getKind() === SyntaxKind.MethodSignature)
              .forEach((method) => {
                const methodSignature = method.asKindOrThrow(SyntaxKind.MethodSignature);
                const methodName = methodSignature.getName();
                const params = methodSignature.getParameters().map((p) => {
                  const paramType = p.getTypeNode()?.getText() || p.getType().getText(p);
                  return {
                    name: p.getName(),
                    type: paramType,
                    isOptional: p.isOptional(),
                  } as ExportedMethodParam;
                });
                exportedMethods.push({ name: methodName, params });
              });

            if (cls) {
              cls.getMethods().forEach((method) => {
                const methodName = method.getName();
                const docs = method.getJsDocs();
                const hasUtilityTag = docs.some((doc) =>
                  doc.getTags().some((tag) => {
                    const isUtility = tag.getTagName() === 'utilityFeature';
                    return isUtility;
                  })
                );
                const match = exportedMethods.find((m) => m.name === methodName);
                if (match) match.isUtility = hasUtilityTag;
              });
            }
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
  screenLines.push(`import ${screenName} from '@auth0/auth0-acul-js/${kebab}';`);
  screenLines.push(`import { ContextHooks } from '../hooks';`);
  if (exportedMethods.length) {
    // We need `errorManager` only if there are exported methods
    screenLines.push(`import { errorManager } from '../hooks';`);
  }
  screenLines.push(`import { registerScreen } from '../state/instance-store';`);
  usedInterfaces.add(baseInterface);

  // Extract type identifiers from method parameters for imports
  // Transform "LoginOptions | undefined" → ["LoginOptions"], "Promise<T>" → ["Promise", "T"], etc.
  const PRIMITIVES = new Set(['any', 'string', 'number', 'boolean', 'undefined', 'void', 'null']);

  exportedMethods.forEach((m) => {
    if (m.isUtility) return;
    return m.params.forEach((p) => {
      const typeTokens = p.type
        .replace(/\[\]/g, '') // Remove arrays: Type[] → Type
        .replace(/[<>|&]/g, ',') // Split on: generics, unions, intersections
        .split(',') // Split into tokens
        .map((t) => t.trim()) // Clean whitespace
        .filter((t) => t && !PRIMITIVES.has(t) && !t.startsWith('{')); // Keep only importable types

      typeTokens.forEach((t) => usedInterfaces.add(t));
    });
  });

  // Lazy singleton instance
  screenLines.push(`\n// Register the singleton instance of ${screenName}`);
  screenLines.push(`const instance = registerScreen<${baseInterface}>(${screenName})!;`);

  if (exportedMethods.length) {
    screenLines.push(`\n// Error wrapper`);
    screenLines.push(`const { withError } = errorManager;`);
  }
  // Context hooks factory (unchanged logic but now uses singleton)
  screenLines.push(`\n// Context hooks`);
  screenLines.push(`const factory = new ContextHooks<${baseInterface}>(instance);`);
  screenLines.push(`export const {`);
  screenLines.push(`  ${CONTEXT_MODELS.map((m) => `use${toPascal(m)}`).join(',\n  ')}`);
  screenLines.push(`} = factory;`);

  if (exportedMethods.length) {
    screenLines.push(`\n// Submit functions`);
    const utilityMethods: ExportedMethod[] = [];
    for (const method of exportedMethods) {
      if (method.isUtility) {
        utilityMethods.push(method);
        continue;
      }
      const safe = getSafeMethodName(method.name);
      const args = method.params
        .map((p) => `${p.name}${p.isOptional ? '?' : ''}: ${p.type}`)
        .join(', ');
      const argNames = method.params.map((p) => p.name).join(', ');
      screenLines.push(
        `export const ${safe} = (${args}) => withError(instance.${method.name}(${argNames}));`
      );
    }

    if (utilityMethods.length) {
      for (const method of utilityMethods) {
        const hookConfig = utilityMap[method.name];

        if (!hookConfig) {
          logger.error(
            `No utility map entry found for method '${method.name}' in screen '${screenName}'. Skipping export.`
          );
          errorCount++;
          continue;
        }

        const { name, path, types } = hookConfig || {};
        screenLines.push(`\n// Utility Hooks`);
        screenLines.push(`export { ${name} } from '${path}';`);

        // ALso export the types
        if (Array.isArray(types) && types.length > 0) {
          //screenLines.push(`export type { ${types.join(', ')} } from '${path}';`);
          // types.forEach((t: string) => usedInterfaces.add(t));
        }
      }
    }
  }

  // Insert type import after imports
  const usedTypeImports = Array.from(usedInterfaces);
  if (usedTypeImports.length) {
    // After comment + useMemo import + class import => index 3
    screenLines.splice(
      3,
      0,
      `import type { ${usedTypeImports.join(', ')} } from '@auth0/auth0-acul-js/${kebab}';`
    );
  }
  screenLines.push(`\n// Common hooks`);
  screenLines.push(
    `export { useCurrentScreen, useErrors, useAuth0Themes, type UseErrorOptions, type UseErrorsResult, type ErrorsResult, type ErrorType } from '../hooks';`
  );

  // Main hook (memoized)
  screenLines.push(`\n// Main instance hook. Returns singleton instance of ${screenName}`);
  screenLines.push(
    `export const ${instanceHook} = (): ${baseInterface} => useMemo(() => instance, []);`
  );

  screenLines.push(`\n// Export all types from the core SDK for this screen`);
  // screenLines.push(`export type * from '@auth0/auth0-acul-js/${kebab}';`);

  fs.writeFileSync(path.join(SCREENS_OUTPUT_PATH, `${kebab}.tsx`), screenLines.join('\n'), 'utf8');

  indexExports.push(`export { ${instanceHook} } from './screens/${kebab}';`);

  logger.info(`${screenName}: Exports with shared + overridden context hooks and methods`);
  screenCount++;
}

// Add common types from core SDK
indexTypes.push('\n// Common types from core SDK');
// indexTypes.push(`export type * from '@auth0/auth0-acul-js';`);

indexExports.push(`export { useCurrentScreen, useErrors, useAuth0Themes } from './hooks';`);
indexExports.splice(0, 0, `import './telemetry';\n`);
indexExports.splice(0, 0, `// Initialize telemetry FIRST, before any Core SDK imports`);

fs.writeFileSync(
  INDEX_FILE_PATH,
  `${indexExports.join('\n')}\n\n${indexTypes.join('\n')}\n`,
  'utf8'
);

if (errorCount > 0) {
  logger.error(
    `SDK generation completed with ${errorCount} error(s). Please review the logs above.`
  );
  process.exit(1);
} else {
  logger.success(
    `SDK generation completed successfully with ${screenCount} screens processed.`,
    true
  );
  logger.info(
    `Running "npm run lint:fix" to apply code formatting to generated files...`,
    true
  );
  // Trigger `npm run lint:fix` to clean up formatting
  const { execSync } = await import('child_process');
  try {
    execSync('npm run lint:fix', { stdio: 'inherit', cwd: path.resolve(__dirname, '../../') });
    logger.success('Code formatting applied via `npm run lint:fix`.', true);
  } catch (e) {
    logger.error('Failed to apply code formatting via `npm run lint:fix`. Please run it manually.');
  }
}
