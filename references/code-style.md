# Code Style

TypeScript throughout, ESM (`"type": "module"` in every manifest). Each package owns its own flat-config ESLint and Prettier setup — they are **not** identical.

## Config files

| Package | ESLint | Prettier |
|---------|--------|----------|
| `auth0-acul-js` | `eslint.config.js` (flat, authoritative — a legacy `.eslintrc.json` is also present) | `.prettierrc`: `singleQuote` only, so print width is Prettier's default **80** |
| `auth0-acul-react` | `eslint.config.js` (flat) | `.prettierrc`: `singleQuote`, `printWidth: 100`, `tabWidth: 2`, `semi`, `trailingComma: es5` |

Both extend `js.configs.recommended` + `typescript-eslint` `recommendedTypeChecked` + `eslint-config-prettier`, and both enforce the same `import/order`.

### Core SDK — the strict rule set

`packages/auth0-acul-js/eslint.config.js` adds rules that will fail your build:

- `@typescript-eslint/explicit-function-return-type` — annotate every function's return type, including `void`.
- `@typescript-eslint/no-explicit-any`, `no-unsafe-assignment`, `no-unsafe-member-access` — reach for `unknown` plus a narrowing check, not `any`.
- `@typescript-eslint/consistent-type-imports` — type-only imports must use `import type`.
- `@typescript-eslint/no-non-null-assertion` — no `!`; narrow or throw a `ConfigurationError`.
- `@typescript-eslint/no-floating-promises`, `no-shadow`, `@typescript-eslint/no-unused-vars`.
- `eqeqeq: ['error', 'always']`, `no-var`, `no-debugger`, `no-implicit-globals`, `no-unsafe-optional-chaining`.
- `no-console: 'warn'` — don't ship `console` calls.
- `import/no-extraneous-dependencies` — devDependencies are only allowed in `*.test.ts` / `*.spec.ts`.

Where an escape hatch is genuinely required (reading build-time globals off `globalThis`), the codebase uses a targeted `// eslint-disable-next-line` with the specific rule names — see `src/utils/form-handler.ts`. Follow that pattern rather than widening the config.

### React SDK

Lighter: `recommendedTypeChecked` plus `prettier/prettier: 'error'` (so Prettier violations are lint errors) and the shared `import/order`. It ignores `dist/`, `coverage/`, `node_modules/` and lints only `src/**/*.{ts,tsx}`.

### `import/order` (both packages)

Groups in order — `builtin`, `external`, `internal`, `parent`, `sibling`, `index`, (`object`, core SDK only), `type` — with `newlines-between: 'always'` and case-insensitive ascending alphabetisation. Type imports therefore land in their **own final block**:

```ts
import { ScreenIds, FormActions, Errors } from '../../constants';
import { BaseContext } from '../../models/base-context';
import { FormHandler } from '../../utils/form-handler';

import { ScreenOverride } from './screen-override';

import type { CustomOptions } from '../../../interfaces/common';
import type { LoginIdMembers } from '../../../interfaces/screens/login-id';
```

## Naming

- **Files and directories:** kebab-case (`form-handler.ts`, `mfa-webauthn-platform-challenge/`).
- **Screen directories:** must match the screen's `ScreenIds` value, because `screenIdentifier` is used for validation and telemetry.
- **Classes:** PascalCase (`BaseContext`, `FormHandler`, `ScreenOverride`).
- **Interfaces:** PascalCase; a screen's public shape is `<Screen>Members` (`LoginIdMembers`), its option bags are `<Verb>Options` (`LoginOptions`, `FederatedLoginOptions`), and per-screen model narrowings are `ScreenMembersOn<Screen>` / `TransactionMembersOn<Screen>`.
- **React hooks:** `use<Screen>` for the instance hook (`useLoginId`), `use<Model>` for context hooks (`useScreen`, `useTransaction`), `use<Utility>` for utilities (`useLoginIdentifiers`, `usePasskeyAutofill`).
- **Private class members:** `#`-prefixed native private fields (`#passkeyController`), not a `_` convention.

## Patterns

- **Screen class + overrides (core SDK).** Each screen is a class extending `BaseContext` with a `static screenIdentifier`, narrowing the generic `screen` / `transaction` models through per-screen `ScreenOverride` / `TransactionOverride` classes. A few screens add an `untrusted-data-overrider.ts`.
- **Interfaces mirror `src/`.** Every public shape has a counterpart under `interfaces/`, re-exported through `interfaces/export/`. `src/export.ts` is the TypeDoc entry point.
- **Form POST, not `fetch`.** All submissions go through `FormHandler.submitData`, which merges the transaction `state` into the payload, builds hidden inputs, appends the `acul-sdk` telemetry field, and submits. There is no HTTP client in this SDK.
- **Typed error hierarchy.** `AculError` (code `ACUL_ERROR`) is the base; `ValidationError` (`USER_INPUT_ERROR`), `ConfigurationError` (`SDK_USAGE_ERROR`), and `Auth0Error` (`AUTH0_SERVER_ERROR`) are the concrete types. Each carries an optional `field`.
- **Singleton + hook factory (React).** A generated screen module calls `registerScreen(<ScreenClass>)` once at module scope, builds context hooks with `new ContextHooks<Members>(instance)`, and wraps every submit function in `withError(...)` from `errorManager` so failures land in the error store.

## Examples

**✅ Good** — explicit return type, `import type`, typed error, submits via `FormHandler`:

```ts
async continueWithCode(payload: CustomOptions): Promise<void> {
  if (!this.screen.captchaImage) {
    throw new ConfigurationError('Captcha is not enabled for this screen.', 'captcha');
  }

  const options: FormOptions = {
    state: this.transaction.state,
    telemetry: [MyScreen.screenIdentifier, 'continueWithCode'],
  };

  await new FormHandler(options).submitData({ ...payload, action: FormActions.DEFAULT });
}
```

**❌ Bad** — no return type, `any`, non-null assertion, bare `Error`, hand-rolled `fetch` that bypasses telemetry and `state`, and a stray `console.log`:

```ts
async continueWithCode(payload: any) {
  console.log('submitting', payload);
  const state = this.transaction.state!;
  if (!this.screen.captchaImage) throw new Error('no captcha');

  await fetch('/u/login', { method: 'POST', body: JSON.stringify({ ...payload, state }) });
}
```
