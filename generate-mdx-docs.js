#!/usr/bin/env node

/**
 * Script to convert TypeDoc JSON output to MDX files for Mintlify documentation
 * Generates files in the structure: screens/, functions/, hooks/, interfaces/, types/
 *
 * Usage: node generate-mdx-docs.js [input-json-path] [output-directory]
 */

import fs from 'fs';
import path from 'path';

const DEFAULT_INPUT = 'packages/auth0-acul-react/docs/index.json';
const DEFAULT_OUTPUT = 'docs/customize/login-pages/advanced-customizations/reference/react-sdk';

const KIND = {
  PROJECT: 1,
  MODULE: 2,
  ENUM: 4,
  VARIABLE: 6,
  FUNCTION: 7,
  CLASS: 8,
  INTERFACE: 20,
  TYPE_LITERAL: 18,
  TYPE_ALIAS: 16,
  REFERENCE: 256,
  FUNCTION_LIKE: 64,
};

class MintlifyMDXGenerator {
  constructor(inputPath, outputPath) {
    this.inputPath = inputPath;
    this.outputPath = outputPath;
    this.data = null;
    this.idMap = new Map();
    this.typeMap = new Map(); // Map type IDs to their categories
  }

  loadJSON() {
    try {
      const rawData = fs.readFileSync(this.inputPath, 'utf-8');
      this.data = JSON.parse(rawData);
      console.log(`✓ Loaded JSON from ${this.inputPath}`);
    } catch (error) {
      console.error(`✗ Error loading JSON: ${error.message}`);
      process.exit(1);
    }
  }

  buildIdMap(obj = this.data) {
    if (obj && typeof obj === 'object') {
      if (obj.id !== undefined) {
        this.idMap.set(obj.id, obj);
      }
      if (Array.isArray(obj)) {
        obj.forEach(item => this.buildIdMap(item));
      } else {
        Object.values(obj).forEach(value => this.buildIdMap(value));
      }
    }
  }

  ensureOutputDir() {
    const dirs = ['screens', 'functions', 'hooks', 'interfaces', 'types'];
    dirs.forEach(dir => {
      const dirPath = path.join(this.outputPath, dir);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }
    });
    console.log(`✓ Created output directories`);
  }

  /**
   * Extract comment text
   */
  commentToText(comment) {
    if (!comment || !comment.summary) return '';
    return this.renderContentBlocks(comment.summary);
  }

  renderContentBlocks(blocks) {
    if (!Array.isArray(blocks)) return '';
    return blocks.map(block => {
      if (block.kind === 'text') {
        return (block.text || '').replace(/\n/g, ' ').trim();
      } else if (block.kind === 'code') {
        return `\`${block.text}\``;
      }
      return '';
    }).join(' ');
  }

  /**
   * Generate path for cross-type links
   */
  getTypePath(typeName, typeCategory = 'interfaces') {
    return `/docs/customize/login-pages/advanced-customizations/reference/react-sdk/${typeCategory}/${this.slugify(typeName)}`;
  }

  /**
   * Generate link for types
   */
  generateTypeLink(type) {
    if (!type) return '<span>unknown</span>';

    if (type.type === 'reference') {
      const path = this.getTypePath(type.name, 'interfaces');
      return `<span><a href="${path}">${type.name}</a></span>`;
    } else if (type.type === 'union') {
      const types = type.types || [];
      return `<span>${types.map(t => this.generateTypeLink(t)).join(' | ')}</span>`;
    } else if (type.type === 'array') {
      const elementType = this.generateTypeLink(type.elementType);
      return `<span>${elementType}[]</span>`;
    } else if (type.type === 'intrinsic') {
      return `<span>${type.name}</span>`;
    } else if (type.type === 'literal') {
      return `<span>\`${JSON.stringify(type.value)}\`</span>`;
    } else if (type.name) {
      return `<span>${type.name}</span>`;
    }

    return '<span>unknown</span>';
  }

  /**
   * Format type for code blocks
   */
  formatTypeForCode(type) {
    if (!type) return 'unknown';

    if (type.type === 'reference') {
      return type.name;
    } else if (type.type === 'union') {
      const types = type.types || [];
      return types.map(t => this.formatTypeForCode(t)).join(' | ');
    } else if (type.type === 'array') {
      const elementType = this.formatTypeForCode(type.elementType);
      return `${elementType}[]`;
    } else if (type.type === 'intrinsic') {
      return type.name;
    } else if (type.type === 'literal') {
      return JSON.stringify(type.value);
    } else if (type.name) {
      return type.name;
    }

    return 'unknown';
  }

  slugify(text) {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }

  /**
   * Generate function/hook MDX
   */
  generateFunctionMDX(item, category = 'functions') {
    let mdx = '---\n';
    mdx += `title: "${item.name}"\n`;

    let description = '';
    if (item.signatures && item.signatures[0] && item.signatures[0].comment) {
      description = this.commentToText(item.signatures[0].comment);
    } else if (item.comment) {
      description = this.commentToText(item.comment);
    }

    mdx += `description: "${description.replace(/"/g, '\\"').substring(0, 200)}"\n`;
    mdx += '---\n\n';

    if (!item.signatures || item.signatures.length === 0) {
      return mdx;
    }

    const sig = item.signatures[0];

    // Parameters section
    if (sig.parameters && sig.parameters.length > 0) {
      mdx += '## Parameters\n\n';
      for (const param of sig.parameters) {
        const typeLink = this.generateTypeLink(param.type);
        mdx += `<ParamField path="${param.name}" type={${typeLink}} required>\n`;
        if (param.comment) {
          const paramDesc = this.commentToText(param.comment);
          if (paramDesc) {
            mdx += paramDesc + '\n';
          }
        }
        mdx += '</ParamField>\n\n';
      }
    }

    // Returns section
    if (sig.type) {
      mdx += '## Returns\n\n';
      const returnType = this.generateTypeLink(sig.type);
      mdx += `<ParamField path="response" type={${returnType}}>\n`;
      if (sig.comment) {
        const returnDesc = this.commentToText(sig.comment);
        if (returnDesc) {
          mdx += returnDesc + '\n';
        }
      }
      mdx += '</ParamField>\n\n';
    }

    // Source
    mdx += '---\n\n';
    if (item.sources && item.sources[0]) {
      const source = item.sources[0];
      const fileName = source.fileName.replace(/^packages\/auth0-acul-react\//, '');
      const ghUrl = `https://github.com/auth0/universal-login/blob/master/packages/auth0-acul-react/${fileName}`;
      mdx += `**File:** [${fileName}](${ghUrl})\n`;
    }

    return mdx;
  }

  /**
   * Generate type/interface MDX
   */
  generateInterfaceMDX(item) {
    let mdx = '---\n';
    mdx += `title: "${item.name}"\n`;
    mdx += `description: ""\n`;
    mdx += '---\n\n';

    // Request example with interface code
    if (item.children && item.children.length > 0) {
      mdx += '<RequestExample>\n\n';
      mdx += '```typescript Interface lines\n';
      mdx += `export interface ${item.name} {\n`;

      for (const prop of item.children) {
        const typeStr = this.formatTypeForCode(prop.type);
        mdx += `  ${prop.name}: ${typeStr};\n`;
      }

      mdx += '}\n';
      mdx += '```\n\n';
      mdx += '</RequestExample>\n\n';

      // Properties section
      mdx += '## Properties\n\n';
      for (const prop of item.children) {
        const typeLink = this.generateTypeLink(prop.type);
        mdx += `<ParamField path="${prop.name}" type={${typeLink}} required>\n`;
        if (prop.comment) {
          const propDesc = this.commentToText(prop.comment);
          if (propDesc) {
            mdx += propDesc + '\n';
          }
        }
        mdx += '</ParamField>\n\n';
      }
    }

    // Source
    mdx += '---\n\n';
    if (item.sources && item.sources[0]) {
      const source = item.sources[0];
      const fileName = source.fileName.replace(/^packages\/auth0-acul-react\//, '');
      const ghUrl = `https://github.com/auth0/universal-login/blob/master/packages/auth0-acul-react/${fileName}`;
      mdx += `**File:** [${fileName}](${ghUrl})\n`;
    }

    return mdx;
  }

  /**
   * Get description for common context hooks
   */
  getContextHookDescription(hookName) {
    const descriptions = {
      useUser: 'Hook to access user information and profile data.\n  \n  Returns User object containing profile information, attributes, and user-specific data',
      useTenant: 'Hook to access tenant configuration and settings.\n  \n  Returns Tenant object containing domain, region, and tenant-specific configuration',
      useBranding: 'Hook to access branding and theme configuration.\n  \n  Returns Branding object containing colors, logos, fonts, and visual customization settings',
      useClient: 'Hook to access Auth0 application (client) configuration.\n  \n  Returns Client object containing application settings, callbacks, and client-specific data',
      useOrganization: 'Hook to access organization context and settings.\n  \n  Returns Organization object containing org-specific data, metadata, and configuration',
      usePrompt: 'Hook to access prompt configuration and flow settings.\n  \n  Returns Prompt object containing flow configuration, screen settings, and prompt-specific data',
      useScreen: 'Hook to access current screen information and metadata.\n  \n  Returns Screen object containing current screen name, configuration, and screen-specific data',
      useTransaction: 'Hook to access transaction state and authentication flow data.\n  \n  Returns Transaction object containing flow state, session data, and transaction-specific information',
      useUntrustedData: 'Hook to access untrusted data from URL parameters and form submissions.\n  \n  Returns Object containing untrusted user input that should be validated before use',
    };
    return descriptions[hookName] || '';
  }

  /**
   * Generate screen MDX with Variables and Functions sections
   */
  generateScreenMDX(screen) {
    let mdx = '---\n';
    mdx += `title: "${this.formatScreenTitle(screen.name)}"\n`;
    mdx += `description: "The ${this.formatScreenTitle(screen.name)} screen module provides access to the ${this.formatScreenTitle(screen.name)} flow."\n`;
    mdx += '---\n\n';

    const contextHooks = [];
    const functions = [];
    const types = [];

    if (screen.children) {
      for (const child of screen.children) {
        if (child.name.startsWith('use') && (child.kind === 32 || (child.signatures && child.signatures[0]))) {
          // Hooks (both kind=32 context hooks and signature-based hooks)
          contextHooks.push(child);
        } else if (child.kind === 256 || child.kind === KIND.REFERENCE || child.kind === 4194304) {
          // Types
          types.push(child);
        } else if (child.kind === 64 || child.kind === KIND.FUNCTION_LIKE) {
          // Functions
          functions.push(child);
        }
      }
    }

    // Variables section (context hooks)
    if (contextHooks.length > 0) {
      mdx += '## Variables\n\n';
      for (const hook of contextHooks) {
        const returnType = hook.type ? this.generateTypeLink(hook.type) : (hook.signatures && hook.signatures[0] ? this.generateTypeLink(hook.signatures[0].type) : '<span>unknown</span>');

        mdx += `<ParamField body="${hook.name}" type={${returnType}}>\n`;

        // Use predefined description for common hooks, or extract from comments
        let desc = this.getContextHookDescription(hook.name);
        if (!desc && hook.signatures && hook.signatures[0] && hook.signatures[0].comment) {
          desc = this.commentToText(hook.signatures[0].comment);
        } else if (!desc && hook.comment) {
          desc = this.commentToText(hook.comment);
        }

        if (desc) {
          mdx += `  ${desc}\n`;
        }

        // Try to add a code example
        mdx += `\n  \`\`\`jsx example\n`;
        mdx += `  import { ${hook.name} } from '@auth0/auth0-acul-react/${this.slugify(screen.name)}';\n`;
        mdx += `  function Component() {\n`;
        mdx += `    const data = ${hook.name}();\n`;
        mdx += `  }\n`;
        mdx += `  \`\`\`\n`;

        mdx += '</ParamField>\n\n';
      }
    }

    // Functions section
    if (functions.length > 0) {
      mdx += '## Functions\n\n';
      for (const func of functions) {
        if (func.signatures && func.signatures[0]) {
          const sig = func.signatures[0];
          const returnType = this.generateTypeLink(sig.type);

          mdx += `<ParamField body="${func.name}" type={${returnType}}>\n`;

          if (sig.comment) {
            const desc = this.commentToText(sig.comment);
            if (desc) {
              mdx += `  ${desc}\n`;
            }
          }

          if (sig.parameters && sig.parameters.length > 0) {
            mdx += '\n  **Parameters:**\n';
            for (const param of sig.parameters) {
              mdx += `  - \`${param.name}\`: ${this.formatTypeForCode(param.type)}\n`;
            }
          }

          mdx += '</ParamField>\n\n';
        }
      }
    }

    // References section
    if (types.length > 0) {
      mdx += '## References\n\n';
      for (const type of types) {
        const ref = `- ${type.name} → Hooks.${type.name}`;
        mdx += ref + '\n';
      }
      mdx += '\n';
    }

    // Source
    mdx += '---\n\n';
    if (screen.sources && screen.sources[0]) {
      const source = screen.sources[0];
      // Remove 'packages/auth0-acul-react/' prefix if it exists
      const fileName = source.fileName.replace(/^packages\/auth0-acul-react\//, '');
      const ghUrl = `https://github.com/auth0/universal-login/blob/master/packages/auth0-acul-react/${fileName}`;
      mdx += `**File:** [${fileName}](${ghUrl})\n`;
    }

    return mdx;
  }

  /**
   * Format screen name for title
   */
  formatScreenTitle(screenName) {
    return screenName
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  /**
   * Process screens
   */
  processScreens() {
    const api_ref = this.data.children[1];
    if (!api_ref || !api_ref.children) return;

    const screens = api_ref.children[1]; // Screens group
    if (!screens || !screens.children) return;

    for (const screen of screens.children) {
      const screenMDX = this.generateScreenMDX(screen);
      const fileName = `${this.slugify(screen.name)}.mdx`;
      const filePath = path.join(this.outputPath, 'screens', fileName);

      fs.writeFileSync(filePath, screenMDX);
      console.log(`✓ Generated screens/${fileName}`);
    }
  }

  /**
   * Process hooks
   */
  processHooks() {
    const api_ref = this.data.children[1];
    if (!api_ref || !api_ref.children) return;

    const hooks = api_ref.children[0]; // Hooks group
    if (!hooks || !hooks.children) return;

    for (const hook of hooks.children) {
      const hookMDX = this.generateFunctionMDX(hook, 'hooks');
      const fileName = `${this.slugify(hook.name)}.mdx`;
      const filePath = path.join(this.outputPath, 'hooks', fileName);

      fs.writeFileSync(filePath, hookMDX);
      console.log(`✓ Generated hooks/${fileName}`);
    }
  }

  /**
   * Process types
   */
  processTypes() {
    const api_ref = this.data.children[1];
    if (!api_ref || !api_ref.children) return;

    const types = api_ref.children[2]; // Types group
    if (!types || !types.children) return;

    for (const type of types.children) {
      if (type.kind === 256 || type.kind === KIND.REFERENCE) {
        const typeMDX = this.generateInterfaceMDX(type);
        const fileName = `${this.slugify(type.name)}.mdx`;
        const filePath = path.join(this.outputPath, 'interfaces', fileName);

        fs.writeFileSync(filePath, typeMDX);
        console.log(`✓ Generated interfaces/${fileName}`);
      }
    }
  }

  generate() {
    console.log('🚀 Starting Mintlify MDX generation...\n');

    this.loadJSON();
    this.buildIdMap();
    this.ensureOutputDir();

    console.log('\n📝 Generating screens...');
    this.processScreens();

    console.log('\n📝 Generating hooks...');
    this.processHooks();

    console.log('\n📝 Generating types...');
    this.processTypes();

    console.log('\n✓ Mintlify MDX generation complete!');
  }
}

// Run the script
if (import.meta.url === `file://${process.argv[1]}`) {
  const inputPath = process.argv[2] || DEFAULT_INPUT;
  const outputPath = process.argv[3] || DEFAULT_OUTPUT;

  const generator = new MintlifyMDXGenerator(inputPath, outputPath);
  generator.generate();
}

export { MintlifyMDXGenerator };
