# Documentation Generation Scripts

This directory contains scripts for generating Mintlify-compatible documentation from TypeScript source code and interfaces for both the JS SDK and React SDK packages.

## Overview

The documentation generation system consists of three main components:

1. **`generate-all-docs.js`** (Root script) - Orchestrates documentation generation for all SDKs
2. **`packages/auth0-acul-js/scripts/generate-mintlify-docs.js`** - Generates JS SDK documentation
3. **`packages/auth0-acul-react/scripts/generate-mintlify-docs.js`** - Generates React SDK documentation

## Quick Start

### Running All Documentation Generation

```bash
npm run mint
```

This command generates documentation for both the JS SDK and React SDK in one go.

### Running Individual SDK Documentation

```bash
# JS SDK only
cd packages/auth0-acul-js
node scripts/generate-mintlify-docs.js

# React SDK only
cd packages/auth0-acul-react
node scripts/generate-mintlify-docs.js
```

## How It Works

### 1. Main Orchestrator Script (`generate-all-docs.js`)

Located at: `/scripts/generate-all-docs.js`

**Purpose**: Runs documentation generation scripts for all SDKs sequentially.

**Features**:
- Spawns child processes for each SDK's documentation generator
- Provides formatted progress output
- Displays summary of generated documentation locations
- Exits with appropriate error code on failure

**Output Directories**:
- JS SDK: `/docs/customize/login-pages/advanced-customizations/reference/js-sdk/`
- React SDK: `/docs/customize/login-pages/advanced-customizations/reference/react-sdk/`

### 2. SDK-Specific Generators

Each SDK has its own `generate-mintlify-docs.js` script that:

#### Configuration
- Reads TypeScript source files and interface definitions
- Uses TypeScript compiler API to parse code structure
- Extracts JSDoc comments for descriptions

#### Processing Steps

1. **Parse TypeScript Files**
   - Scans `src/` directory for all `.ts` files (excluding `.test.ts` and `.spec.ts`)
   - Parses classes, interfaces, types, functions, and enums
   - Extracts JSDoc comments and type information

2. **Parse Interface Files**
   - Scans `interfaces/` directory for interface definitions
   - Collects interface and type aliases
   - Builds a map of all available types for cross-linking

3. **Resolve Inheritance**
   - For classes: traces inheritance chains and merges member lists
   - For interfaces: traces extension chains and merges member lists
   - Marks inherited members appropriately

4. **Generate Markdown**
   - Creates individual `.mdx` files for each class, interface, type, function, and enum
   - Generates frontmatter with title and description
   - Creates ParamField components for structured type documentation
   - Includes expandable sections for nested object properties

5. **Create Navigation File**
   - Generates `navigation.json` in Mintlify format
   - Groups documentation by type (Classes, Interfaces, Types, Functions, Enums)
   - Includes full paths relative to the docs root

6. **Generate Index**
   - Creates `README.md` with summary of generated documentation
   - Lists counts for each documentation type

## Directory Structure

```
universal-login/
├── scripts/
│   ├── generate-all-docs.js          # Main orchestrator script
│   ├── GENERATE_DOCS_README.md       # This file
│   └── ... (other scripts)
│
├── packages/
│   ├── auth0-acul-js/
│   │   ├── scripts/
│   │   │   └── generate-mintlify-docs.js   # JS SDK generator
│   │   ├── src/                            # Source code
│   │   ├── interfaces/                     # Interface definitions
│   │   └── examples/                       # Code examples
│   │
│   └── auth0-acul-react/
│       ├── scripts/
│       │   └── generate-mintlify-docs.js   # React SDK generator
│       ├── src/                            # Source code
│       └── examples/                       # Code examples
│
└── docs/
    └── customize/
        └── login-pages/
            └── advanced-customizations/
                └── reference/
                    ├── js-sdk/             # Generated JS SDK docs
                    │   ├── classes/
                    │   ├── interfaces/
                    │   ├── types/
                    │   ├── functions/
                    │   ├── navigation.json
                    │   └── README.md
                    │
                    └── react-sdk/          # Generated React SDK docs
                        ├── classes/
                        ├── interfaces/
                        ├── types/
                        ├── functions/
                        ├── hooks/ (React-specific)
                        ├── navigation.json
                        └── README.md
```

## Output Format

### File Structure

Generated documentation files follow this structure:

```
/docs/customize/login-pages/advanced-customizations/reference/
├── js-sdk/
│   ├── classes/
│   │   ├── BaseContext.mdx
│   │   ├── Branding.mdx
│   │   └── ... (other classes)
│   ├── interfaces/
│   │   ├── BrandingMembers.mdx
│   │   └── ... (other interfaces)
│   ├── types/
│   │   └── ... (type definitions)
│   ├── functions/
│   │   └── ... (exported functions)
│   ├── navigation.json
│   └── README.md
│
└── react-sdk/
    └── (similar structure)
```

### Mintlify Navigation Format

The `navigation.json` file follows Mintlify's expected format:

```json
{
  "group": "@auth0/auth0-acul-js",
  "pages": [
    {
      "group": "Classes",
      "pages": [
        "docs/customize/login-pages/advanced-customizations/reference/js-sdk/classes/BaseContext",
        "docs/customize/login-pages/advanced-customizations/reference/js-sdk/classes/Branding",
        "..."
      ]
    },
    {
      "group": "Interfaces",
      "pages": ["..."]
    },
    {
      "group": "Types",
      "pages": ["..."]
    },
    {
      "group": "Functions",
      "pages": ["..."]
    },
    {
      "group": "Enums",
      "pages": ["..."]
    }
  ]
}
```

### Markdown Output Format

Each generated `.mdx` file includes:

1. **Frontmatter**:
   - `title`: Class/interface/function name
   - `description`: Extracted from JSDoc

2. **Content**:
   - Description paragraph (if available)
   - Code examples (from `examples/` directory if available)
   - Properties/Parameters section with `<ParamField>` components
   - Return type documentation (for functions)
   - File reference link to source code

3. **Internal Links**:
   - Type references are automatically converted to links
   - Links point to: `/docs/customize/login-pages/advanced-customizations/reference/{sdk}/{category}/{name}`

### Example Generated File

```mdx
---
title: "BaseContext"
description: "Base context for login screens"
---

## Properties

<ParamField path="branding" type={<span><a href="/docs/customize/login-pages/advanced-customizations/reference/js-sdk/interfaces/BrandingMembers">BrandingMembers</a></span>} required>
  Branding configuration
</ParamField>

<ParamField path="screen" type={<span><a href="/docs/customize/login-pages/advanced-customizations/reference/js-sdk/interfaces/ScreenMembers">ScreenMembers</a></span>} required>
  Current screen information
</ParamField>

---

**File:** [src/context/BaseContext.ts](https://github.com/auth0/universal-login/blob/master/packages/auth0-acul-js/src/context/BaseContext.ts)
```

## Key Features

### 1. Automatic Cross-Linking
- Detects type references in properties and parameters
- Automatically creates links to class and interface documentation
- Handles arrays, generics, and union types

### 2. JSDoc Extraction
- Parses JSDoc comments from TypeScript code
- Cleans and formats descriptions
- Removes type annotations and @ tags

### 3. Inheritance Resolution
- Classes: Merges parent class members with child class members
- Interfaces: Merges extended interface members
- Marks inherited members appropriately

### 4. Nested Type Handling
- Inline object types: Creates expandable sections
- Array of objects: Special handling for array-based object types
- Union types with objects: Combines scalar types with nested object properties

### 5. Optional and Nullable Detection
- Tracks optional properties (with `?` modifier)
- Detects nullable types (with `| null` or `| undefined`)
- Marks required/optional in documentation

## Configuration

Each SDK's generator has configuration options:

```javascript
const config = {
  outputDir: path.resolve(projectRoot, '../../docs/customize/login-pages/advanced-customizations/reference/{js-sdk|react-sdk}'),
  srcDir: path.resolve(projectRoot, 'src'),
  interfacesDir: path.resolve(projectRoot, 'interfaces'),
  examplesDir: path.resolve(projectRoot, 'examples'),
  tsconfigPath: path.resolve(projectRoot, 'tsconfig.json'),
};
```

## Statistics

### JS SDK
- 162 Classes
- 332 Interfaces
- 56 Functions
- 6 Types
- 0 Enums
- **Total: 556 items**

### React SDK
- 2 Classes
- 12 Interfaces
- 255 Functions
- 4 Types
- 0 Enums
- **Total: 273 items**

## Name Conversion

The original scripts included a `convertMembersToProperties()` function that converted names like:
- `BrandingMembers` → `BrandingProperties`
- `ClientMembers` → `ClientProperties`

This conversion has been **disabled** to preserve original naming from the source code.

## Troubleshooting

### Script Not Running
```bash
# Make sure you're in the root directory
cd /path/to/universal-login

# Run the command
npm run mint
```

### Missing Dependencies
```bash
# Install dependencies
npm install
```

### Output Directory Not Created
The script automatically creates all necessary directories. If there's a permission error, check write permissions on the `/docs` directory.

### Type Links Not Working
- Ensure the type/class/interface is defined in the source code
- Check that it's properly exported
- Verify the file is being parsed (not in node_modules or test files)

## Development

### Modifying the Generators

When updating `generate-mintlify-docs.js` scripts:

1. Edit the script in the respective package
2. Update the configuration if needed
3. Test with: `npm run mint`
4. Review generated files in `/docs/customize/login-pages/advanced-customizations/reference/`

### Adding New Features

To add new features (e.g., new documentation sections):

1. Update the `generateMintlifyMarkdown()` function
2. Add new NavStructure tracking if needed
3. Update type link generation if new types are added
4. Test and verify output

## Maintenance

### Regular Updates
Run `npm run mint` after:
- Adding new classes, interfaces, or functions
- Modifying JSDoc comments
- Changing type definitions
- Adding code examples

### Version Control
The generated documentation is version controlled. Commit changes to track documentation evolution with code changes.

## Related Scripts

- **`docs-unified.js`**: Unified documentation generation (legacy)
- **`check-node-version.js`**: Validates Node.js version
- **`block-local-install.js`**: Prevents local installation of dependencies

## Links

- [Mintlify Documentation](https://mintlify.com/docs)
- [TypeScript Compiler API](https://github.com/microsoft/TypeScript/wiki/Using-the-Compiler-API)
- [Source Repository](https://github.com/auth0/universal-login)
