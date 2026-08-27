# Docs Update Rules

A PR that adds or changes public API, options, or integration patterns is **not complete** until the docs below are updated in the same PR.

## Tracked docs

| Doc | What it covers | Present? |
|-----|----------------|----------|
| `README.md` (root) | Monorepo overview, both SDKs, prerequisites, install, importing screens, usage, API-reference index | present |
| `packages/auth0-acul-js/README.md` | Core SDK: getting started, usage, API reference, helper functions | present |
| `packages/auth0-acul-react/README.md` | React SDK: getting started, API reference, hooks, examples | present |
| `packages/auth0-acul-js/examples/*.md` | **Hand-written** per-screen usage snippets — one file per screen | present |
| `packages/auth0-acul-react/examples/*.md` | **Generated** per-screen React snippets (`npm run generate:examples`) | present |
| `MIGRATION_JS_TO_REACT.md` | JS SDK → React SDK porting guide: key differences, core concepts, per-screen examples, import-path reference | present |
| `packages/auth0-acul-js/FAQ.md` | Frequently asked questions about the core SDK | present |
| `EXAMPLES.md` | — | **❌ missing.** This repo deliberately uses per-package `examples/` directories instead. Don't create one; add or update the relevant `examples/<screen>.md` file. |

Two files are intentionally **not** tracked here:

- **`CHANGELOG.md`** (per package) — cut by the release flow, not by an agent editing files during a feature change.
- **`NOTICE`** and either package's `docs/` — generated artifacts.

`MIGRATION_JS_TO_REACT.md` *is* tracked even though version-specific migration guides normally aren't: it documents the permanent JS↔React mapping, not a one-off major-version upgrade.

## When you change code, update these docs

| When this changes | Update these docs |
|-------------------|-------------------|
| A screen's public methods or options (`packages/auth0-acul-js/src/screens/<screen>/`) | `packages/auth0-acul-js/README.md` (API reference), `packages/auth0-acul-js/examples/<screen>.md`; then regenerate the React layer and its `examples/<screen>.md` |
| The published type contract (`packages/auth0-acul-js/interfaces/`) | `packages/auth0-acul-js/README.md`; `MIGRATION_JS_TO_REACT.md` if the mapping or import paths shift |
| A new screen added | Root `README.md` (screen list), core SDK `README.md` (API reference), a new `examples/<screen>.md` in the core SDK, plus the regenerated React screen module and example |
| A screen method or export removed or renamed | Every doc above that references it — remove or update the reference, don't leave a dangling symbol |
| A React hook's name or signature (`packages/auth0-acul-react/src/hooks/`) | `packages/auth0-acul-react/README.md` (Hooks section), `MIGRATION_JS_TO_REACT.md` |
| Import paths or the package `exports` map | Root `README.md` (Importing Screens), both package `README.md`s, `MIGRATION_JS_TO_REACT.md` (Import Path Reference) |
| Install requirements, supported Node/React versions, `engines` | Root `README.md` (Prerequisites / Installation), affected package `README.md` |
| The typed error hierarchy (`src/utils/errors.ts`) | `packages/auth0-acul-js/README.md`, and any `examples/` snippet that shows error handling |
| Helper/utility functions (`src/utils/`, React `hooks/utility/`) | Core SDK `README.md` (Helper Functions), React `README.md` (Hooks) |
| A screen's behaviour in a way that changes recommended usage | The matching `examples/<screen>.md` in the core SDK (hand-written), then regenerate the React one |

> Update the docs **in the same PR** — do not defer. The Auth0 org PR checklist has an explicit "documentation was added for new/changed functionality" item.

## Generated vs hand-written examples

This is the easiest thing to get wrong:

- **`packages/auth0-acul-js/examples/*.md`** — hand-written. Edit these directly.
- **`packages/auth0-acul-react/examples/*.md`** — generated from the core SDK's `src/screens/` and `interfaces/screens/` by `npm run generate:examples`, which **deletes** the directory's `*.md` files first. Never edit them by hand; change the core SDK or `scripts/generate-examples.ts` and regenerate.
