# Mintlify Documentation Pipeline

Complete workflow for converting TypeDoc output to Mintlify-compatible MDX with ParamField components.

## Four-Script Pipeline

### 1. **convert-typedoc-to-mintlify.js**
Converts 1,299 raw TypeDoc markdown files to Mintlify MDX format.

**What it does:**
- Removes navigation breadcrumbs
- Moves H1 headers to frontmatter
- Converts tables to lists with descriptions
- Fixes links (removes .md, removes /README, adds ./ prefix)
- Renames README.md files to index.mdx

**Processes:** 1,299 files

---

### 2. **consolidate-screens.js**
Consolidates 76 screen documentation directories.

**What it does:**
- Moves variables and functions from separate folders into ParamField components
- Converts References section to ParamFields with auto-detected types (Hooks/Types)
- Properly formats JSX type attributes with link references
- Normalizes headers within ParamFields to h4+ level

**Processes:**
- 76 screens
- 919 individual variable/function files consolidated

---

### 3. **consolidate-types.js**
Consolidates Types/classes (currently: ContextHooks).

**What it does:**
- Converts Constructor Parameters to ParamField components
- Converts Methods to ParamField components
- Extracts types correctly (e.g., `type='T'`, `type='T["user"]'`)
- Includes full method documentation (Defined in, description, Returns, Examples)
- Normalizes headers to h4+ level within ParamFields

**Processes:**
- 1 class file (ContextHooks.mdx with 9 methods)

---

### 4. **consolidate-interfaces.js** (NEW)
Consolidates Types/interfaces files.

**What it does:**
- Converts interface Properties to ParamField components
- Extracts property types from signature lines
- Includes full property documentation (Defined in line)
- Normalizes headers to h4+ level within ParamFields

**Processes:**
- 278 interface files
- 1,825 properties converted

---

## Running the Pipeline

```bash
# Run all four scripts in order
node convert-typedoc-to-mintlify.js
node consolidate-screens.js
node consolidate-types.js
node consolidate-interfaces.js
```

## Output Structure

```
docs/customize/login-pages/advanced-customizations/reference/react-sdk/
├── API-Reference/
│   ├── namespaces/
│   │   ├── Hooks/
│   │   ├── Screens/
│   │   │   └── [screen-name]/
│   │   │       └── index.mdx (consolidated variables & functions)
│   │   └── Types/
│   │       ├── classes/
│   │       │   └── ContextHooks.mdx (consolidated methods)
│   │       └── interfaces/
│   │           └── [interface-name].mdx (consolidated properties)
```

## ParamField Component Structure

### Constructor Parameters
```mdx
#### Parameters

<ParamField body="instance" type='T'>
> `optional` **instance**: `T`
Defined in: ...
</ParamField>
```

### Methods
```mdx
## Methods

<ParamField body="useUser()" type='T["user"]'>
> **useUser**(): `T`\[`"user"`\]
Defined in: ...
Hook to access user information...
#### Returns
...
#### Example
...
</ParamField>
```

### Interface Properties
```mdx
## Properties

<ParamField body="connection" type="string">
> **connection**: `string`
Defined in: ...
</ParamField>
```

---

## Statistics

- **Total files processed:** 2,403+
- **Total properties converted:** 1,825
- **Total methods converted:** 9
- **Total screens consolidated:** 76
