# Commands

Full command reference for the universal-login monorepo. The three commands CI actually runs are in `CLAUDE.md`; everything else lives here.

All commands run from the **repo root** unless stated otherwise. A `preinstall` guard blocks `npm install` inside a package directory.

## Setup

```bash
npm ci --workspaces --include-workspace-root   # what CI installs with
npm install                                    # local install, from the root only
```

Node 22 is required (`engines: ^22.0.0`, `engineStrict: true`) and checked by `scripts/check-node-version.js` on `preinstall`.

## Root aggregate scripts

```bash
npm run lint --workspaces     # ESLint across both packages          (CI)
npm test --workspaces         # Jest + coverage across both packages (CI)
npm run build:local           # Rollup build of both packages        (CI)
npm run build --workspaces    # full build: core SDK chains clean → lint → test → docs → rollup
npm run docs --workspaces     # TypeDoc for both packages
npm run docs:unified          # scripts/docs-unified.js
npm run docs:unified:all      # build + docs for all workspaces, then scripts/unify-docs.js --all
npm run dev:acul              # Rollup watch on the core SDK
```

> `npm run format` (root) **fails**: it runs `npm run format --workspaces`, and the React package has no `format` script. Format the core SDK directly instead:
> ```bash
> npm run format --workspace @auth0/auth0-acul-js
> ```

## Core SDK — `packages/auth0-acul-js`

```bash
npm run clean       --workspace @auth0/auth0-acul-js   # rimraf dist
npm run build:local --workspace @auth0/auth0-acul-js   # rollup only (NODE_ENV=production)
npm run build       --workspace @auth0/auth0-acul-js   # clean + lint + test + docs + rollup
npm run dev         --workspace @auth0/auth0-acul-js   # rollup -w (NODE_ENV=development)
npm run dev:prod    --workspace @auth0/auth0-acul-js   # rollup -w (NODE_ENV=production)
npm test            --workspace @auth0/auth0-acul-js   # jest --verbose tests/unit/**/* --coverage
npm run docs        --workspace @auth0/auth0-acul-js   # typedoc → docs/ + docs/index.json
npm run lint        --workspace @auth0/auth0-acul-js   # lint:interfaces + lint:src
npm run lint:fix    --workspace @auth0/auth0-acul-js
npm run lint:watch  --workspace @auth0/auth0-acul-js   # chokidar-driven re-lint
npm run format      --workspace @auth0/auth0-acul-js   # prettier --write
```

`lint` is split so both halves of the public surface are covered: `lint:src` (`src/**/*.ts`) and `lint:interfaces` (`interfaces/**/*.ts`), both with `--no-ignore`.

> `test:e2e` (`cypress open`) is declared in `package.json`, but Cypress is **not** a declared or installed dependency and `cypress.json` points at a `tests/e2e` folder that does not exist. Treat it as non-functional; there is no working live/credentialed test tier in this repo.

## React SDK — `packages/auth0-acul-react`

```bash
npm run build:local          --workspace @auth0/auth0-acul-react   # rollup only
npm run build                --workspace @auth0/auth0-acul-react   # clean + lint + test + rollup (+ postbuild docs)
npm test                     --workspace @auth0/auth0-acul-react   # jest --verbose tests/**/* --coverage
npm run lint                 --workspace @auth0/auth0-acul-react   # eslint src --ext .ts,.tsx
npm run lint:fix             --workspace @auth0/auth0-acul-react
npm run docs                 --workspace @auth0/auth0-acul-react   # typedoc (also runs as postbuild)
```

### Codegen

These rewrite tracked files. Run them in this order after changing the core SDK's public surface:

```bash
# 1. refresh the core SDK's TypeDoc JSON that codegen reads
npm run docs --workspace @auth0/auth0-acul-js

# 2. regenerate src/screens/*.tsx and src/index.ts
npm run generate:sdk            --workspace @auth0/auth0-acul-react

# 3. regenerate the per-screen React snippets under examples/
npm run generate:examples       --workspace @auth0/auth0-acul-react

# 4. regenerate tests/screens/*.test.tsx
npm run generate:screen-tests   --workspace @auth0/auth0-acul-react
```

`generate:examples` **deletes** every `*.md` under `packages/auth0-acul-react/examples/` before regenerating.
