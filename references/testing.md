# Testing

Both packages use **Jest** with **`ts-jest`** in ESM mode (`preset: ts-jest/presets/default-esm`) and a **`jsdom`** environment — the SDKs are browser-only, so `jsdom` is what gives you `window` and `document`.

`npm test --workspaces` is the safe default: unit-only, no credentials, no network.

## Layout

| Package | Tests live in | Notes |
|---------|---------------|-------|
| `auth0-acul-js` | `tests/unit/` (roots is `<rootDir>/tests/unit`) | Mirrors `src/`: `tests/unit/screens/<screen>/index.test.ts`, plus `screen-override.test.ts` / `transaction-override.test.ts` per screen. Shared fixtures in `tests/data/` (`test-data.ts`, `login-id.json`). |
| `auth0-acul-react` | `tests/` (`testMatch: **/tests/**/*.test.ts?(x)`) | `tests/screens/` is **generated** by `npm run generate:screen-tests`; `tests/hooks/`, `tests/state/` are hand-written. |

## Coverage

Both configs set `collectCoverage: true` and write to `<rootDir>/coverage`. **No `coverageThreshold` is configured in either package**, so coverage is reported but not gated. Reporters: `text` + `lcov` (core), plus `html` (React).

## Conventions — core SDK

- One `describe` per exported class/function, nested `describe`s per method, `it('should …')` for cases.
- `beforeEach` starts with `jest.clearAllMocks()`, then builds fresh `ScreenContext` / `TransactionContext` fixtures.
- Screen classes are tested in isolation: `jest.mock` the screen's own `screen-override` / `transaction-override`, `src/utils/form-handler`, and `src/models/base-context`, then drive `BaseContext.prototype.getContext` with a `mockImplementation` that returns the fixture per context type (`'screen'`, `'transaction'`, …).
- Assert on **`FormHandler`**, not on network: check the constructor options (`state`, `route`, `telemetry`) and that `submitData` was called with the expected payload. Nothing in the unit suite performs real I/O.
- Partial mocks use `jest.requireActual` spread (see the `src/utils/passkeys` mock in `tests/unit/screens/login-id/index.test.ts`) so only the intended exports are stubbed.
- Cast fixtures with `as unknown as ScreenContext` rather than fully populating context shapes.
- Error-path tests assert the **typed** error (`ValidationError`, `ConfigurationError`, `Auth0Error`), not a bare `Error`.
- Build-time globals `__SDK_NAME__` / `__SDK_VERSION__` are injected by `jest.config.js` `globals` and re-exposed on `globalThis` by `jest.setup.js` — you don't need to define them per test.

## Conventions — React SDK

- **React Testing Library** (`@testing-library/react` + `@testing-library/jest-dom`, imported in `jest.setup.ts`); hooks are exercised with `renderHook`.
- `jest.setup.ts` runs `jest.clearAllMocks()` in a global `afterEach`.
- Screen modules register a **singleton** on import (`registerScreen`), so tests mock `@auth0/auth0-acul-js` at the module level and import the screen module under test as a namespace (`import * as LoginIdScreen from '../../src/screens/login-id'`).
- Generated screen tests categorise a module's exports via `tests/screens/test-helpers` and assert the expected hook/submit-function shape — they check the codegen contract, not per-screen behaviour. Behavioural tests belong in `tests/hooks/` or `tests/state/`.
- `tsconfig` override in the transform sets `jsx: 'react-jsx'`, so no `React` import is needed in test files.

## Running a subset

Each package's `test` script hardcodes a path pattern, so appending args to `npm test` *widens* the run rather than narrowing it. To target one file, invoke Jest directly from the package directory:

```bash
cd packages/auth0-acul-js    && npx jest tests/unit/screens/login-id
cd packages/auth0-acul-react && npx jest tests/state/error-store.test.ts
```

Neither package defines a watch script for tests; add `--watch` to the `npx jest` invocation if you need it.

> There is no working live/credentialed test tier. The core SDK's `test:e2e` script (`cypress open`) references a Cypress install that isn't declared as a dependency and a `tests/e2e` folder that doesn't exist — see [commands.md](commands.md).
