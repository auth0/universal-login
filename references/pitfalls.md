# Common Pitfalls

Repo-specific traps, with the fix for each.

## 1. The React screen layer is generated — hand edits get silently overwritten

`packages/auth0-acul-react/src/screens/*.tsx`, `src/index.ts`, `tests/screens/*.test.tsx`, and `examples/*.md` are all codegen output. Nothing in the files marks them as generated, so it is easy to "fix" one by hand and lose the change on the next generation run (`generate:examples` even deletes the whole examples directory first).

**Fix:** change the **core SDK** and/or the generator under `packages/auth0-acul-react/scripts/`, then regenerate. See [commands.md](commands.md) → Codegen.

## 2. Codegen reads committed TypeDoc output, not source

`scripts/generate-sdk/index.ts` resolves the core SDK's `docs/index.json` (TypeDoc JSON, a **committed build artifact**) to discover the public surface. If you change a core-SDK screen and run `generate:sdk` without refreshing that file first, codegen succeeds and quietly emits a **stale** React API — no error.

**Fix:** always `npm run docs --workspace @auth0/auth0-acul-js` before `generate:sdk`.

## 3. `npm install` must run from the repo root, on Node 22

The root `preinstall` runs two guards: `scripts/check-node-version.js` (the manifest pins `node: ^22.0.0` with `engineStrict: true`) and `scripts/block-local-install.js`, which hard-exits if `INIT_CWD`'s `package.json` isn't the root `universal-login`.

**Fix:** install from the root. CI uses `npm ci --workspaces --include-workspace-root`.

## 4. Root `npm run format` fails, and `interfaces/` is never formatted

Two separate problems:

- Root `format` runs `npm run format --workspaces`, but `@auth0/auth0-acul-react` has no `format` script, so the command errors out — after having already reformatted the core SDK.
- In the core SDK, `format:interfaces` is a copy of `format:src` (both glob `src/**`), so `interfaces/**` is never Prettier-formatted by an npm script — even though `lint:interfaces` does lint it.

**Fix:** use `npm run format --workspace @auth0/auth0-acul-js` for `src/`, and run Prettier directly if you need to format `interfaces/`.

## 5. Root `npm run build` is not what CI runs

The core SDK's `build` chains `clean → lint → test → docs → rollup`, which regenerates `docs/` and can leave a large unrelated diff in your PR. CI builds with `build:local` (Rollup only).

**Fix:** use `npm run build:local` for verification. Only regenerate `docs/` deliberately, as part of the codegen flow.

## 6. `__SDK_NAME__` / `__SDK_VERSION__` are build-time globals

Rollup substitutes them at build time. Under Jest they come from `jest.config.js` `globals` plus `jest.setup.js`, which copies them onto `globalThis`. Referencing them from a context that neither covers yields `undefined`, which shows up as a malformed `acul-sdk` telemetry value rather than an error.

**Fix:** read them the way `src/utils/form-handler.ts` does — `globalThis.__ACUL_SDK_*` first (the wrapper-SDK override), falling back to the build-time constant.

## 7. `BaseContext.context` is a static, process-wide cache

The constructor reads `window.universal_login_context` **once** into a static field and every screen shares it thereafter. Two consequences:

- Instantiating a screen class outside a real Universal Login page throws `Universal Login Context is not available on the global window object.`
- A screen class whose `static screenIdentifier` doesn't match `context.screen.name` throws `Incorrect import: The current screen name does not match the imported screen class`. That's usually a wrong import path, not a bug.
- In tests, the static persists across cases unless reset.

**Fix:** in unit tests, `jest.mock('.../src/models/base-context')` and drive `BaseContext.prototype.getContext` with a `mockImplementation` (the established pattern — see [testing.md](testing.md)).

## 8. React screen modules register a singleton at import time

Each generated screen module calls `registerScreen(<ScreenClass>)` at module scope, so merely importing it instantiates the screen. Importing two screen modules into the same bundle or test file can therefore throw the screen-mismatch error from pitfall 7.

**Fix:** import exactly the screen module for the screen you're on (`@auth0/auth0-acul-react/login-id`), which is also what the per-screen `exports` map in `package.json` is for. In tests, mock `@auth0/auth0-acul-js`.

## 9. Relative imports carry `.js` extensions

The packages are native ESM, so runtime imports use explicit `.js` extensions. The core SDK's Jest config maps them away with `moduleNameMapper: { '^(\\.{1,2}/.*)\\.js$': '$1' }`.

**Fix:** follow the surrounding files' import style rather than mixing conventions; if a new test can't resolve a module, check the extension.

## 10. `test:e2e` is non-functional

`packages/auth0-acul-js` declares `test:e2e` as `cypress open`, but Cypress is not a declared or installed dependency, and `cypress.json` points at a `tests/e2e` folder that doesn't exist.

**Fix:** don't rely on it. The unit suites are the verification path; there's no working live-test tier.
