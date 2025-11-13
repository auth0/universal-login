# Documentation Generation Scripts

This directory contains scripts for generating Mintlify-compatible documentation from TypeDoc output.

## Quick Start

Generate all documentation:

```bash
node packages/auth0-acul-react/scripts/generate-mintlify-docs.js
```

## Pipeline Overview

The `generate-mintlify-docs.js` script orchestrates a 6-step pipeline:

### Step 1: convert-typedoc-to-mintlify.js
Converts 1,299 raw TypeDoc markdown files to Mintlify MDX format.

**Input:** `packages/auth0-acul-react/docs/`  
**Output:** `docs/customize/login-pages/advanced-customizations/reference/react-sdk/`

**Transforms:**
- Removes navigation breadcrumbs
- Moves H1 headers to frontmatter YAML
- Converts tables to description lists
- Fixes markdown links (removes `.md`, removes `/README`, adds `./` prefix)
- Renames `README.md` → `index.mdx`

**Result:** 1,299 files

### Step 2: consolidate-screens.js
Consolidates 76 screen documentation directories by moving variables and functions into ParamField components.

**Input:** Screen documentation with separate variables/ and functions/ folders  
**Output:** Single consolidated `index.mdx` per screen with ParamField components

**Transforms:**
- Moves variables → Variables section with ParamFields
- Moves functions → Functions section with ParamFields
- Converts References to ParamFields with auto-detected types
- Normalizes headers within ParamFields to h4+ level
- Deletes variables/ and functions/ folders

**Result:** 76 screens × ~12 items per screen = 919 files consolidated

### Step 3: consolidate-types.js
Consolidates Types/classes documentation by converting methods to ParamField components.

**Input:** Class files with Methods section (e.g., `ContextHooks.mdx`)  
**Output:** ParamField-wrapped methods with full documentation

**Transforms:**
- Constructor Parameters → ParamFields with type extraction
- Methods → ParamFields with complete content:
  - Method signature
  - Defined in link
  - Description
  - Returns section
  - Example code
- Normalizes headers within ParamFields

**Result:** 1 class file with 9 methods

### Step 4: consolidate-interfaces.js
Consolidates Types/interfaces documentation by converting properties to ParamField components.

**Input:** 278 interface files with Properties section  
**Output:** ParamField-wrapped properties with type extraction

**Transforms:**
- Interface Properties → ParamFields
- Type extraction from property signatures
- Full property documentation preserved
- Headers normalized within ParamFields

**Result:** 278 interfaces × ~6.5 properties each = 1,825 properties

### Step 5: flatten-structure.js
Flattens the directory structure by removing "namespaces" folders.

**Input:** Documentation with nested namespaces structure
**Output:** Flattened directory structure

**Transforms:**
- Moves `API-Reference/namespaces/Screens/namespaces/*` → `API-Reference/Screens/*`
- Moves `API-Reference/namespaces/Hooks/functions/*` → `API-Reference/Hooks/*`
- Moves `API-Reference/namespaces/Types/*` → `API-Reference/Types/*`
- Removes old empty `namespaces/` directories

**Result:** Clean, flattened documentation structure

### Step 6: generate-navigation.js
Generates a navigation.json structure for Mintlify documentation.

**Input:** Flattened documentation directory structure
**Output:** `docs/customize/login-pages/advanced-customizations/reference/react-sdk/navigation.json`

**Transforms:**
- Scans Hooks, Screens, Classes, Interfaces, and Type Aliases directories
- Organizes pages into Mintlify navigation groups
- Deduplicates entries to prevent navigation conflicts

**Result:** Organized navigation with 373 pages across 5 groups

## Individual Scripts

You can run individual scripts from `utils/`:

```bash
# Convert TypeDoc to Mintlify
node packages/auth0-acul-react/scripts/utils/convert-typedoc-to-mintlify.js

# Consolidate screens
node packages/auth0-acul-react/scripts/utils/consolidate-screens.js

# Consolidate types/classes
node packages/auth0-acul-react/scripts/utils/consolidate-types.js

# Consolidate types/interfaces
node packages/auth0-acul-react/scripts/utils/consolidate-interfaces.js

# Flatten directory structure
node packages/auth0-acul-react/scripts/utils/flatten-structure.js

# Generate navigation
node packages/auth0-acul-react/scripts/utils/generate-navigation.js
```

## Output Structure

```
docs/customize/login-pages/advanced-customizations/reference/react-sdk/
├── API-Reference/
│   ├── index.mdx
│   ├── Hooks/
│   │   ├── index.mdx
│   │   └── *.mdx (hook files)
│   ├── Screens/
│   │   ├── index.mdx
│   │   └── [screen-name]/
│   │       └── index.mdx (consolidated variables & functions)
│   └── Types/
│       ├── index.mdx
│       ├── classes/
│       │   └── ContextHooks.mdx (consolidated methods)
│       ├── interfaces/
│       │   └── *.mdx (consolidated properties)
│       └── type-aliases/
│           └── *.mdx (type aliases)
├── navigation.json (generated structure)
```

## Key Features

### ParamField Components
All parameters, properties, and methods are wrapped in `<ParamField>` components with:

```mdx
<ParamField body="name" type="TypeInfo">
Full documentation content
including signature, description, examples
</ParamField>
```

### Type Handling
- Constructor params: `type='T'`
- Methods: `type='T["user"]'`
- Properties: `type="string"`, `type="boolean"`
- Union types: First type extracted and cleaned

### Header Normalization
All headers within ParamFields are elevated:
- `## Header` → `#### Header`
- `### Header` → `##### Header`

### Link Conversion
- `[text](./path)` - local links with relative paths
- `[text](../../../path)` - cross-namespace links
- `<a href="...">text</a>` - JSX links for type references

## Statistics

| Metric | Count |
|--------|-------|
| Total files processed | 2,403+ |
| TypeDoc markdown files converted | 1,299 |
| Screen documentation consolidated | 76 |
| Interface files consolidated | 278 |
| ParamFields created | 2,753+ |
| Properties converted | 1,825 |
| Methods converted | 9 |

## Documentation

For detailed pipeline information, see `utils/PIPELINE.md`
