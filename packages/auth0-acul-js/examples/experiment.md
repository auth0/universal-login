# Experiment (Experiment Center) Example

This example demonstrates how to read the active [Experiment Center](https://auth0.com/docs) experiment from any screen and use the assigned variation to drive your Universal Login customization.

`experiment` is **read-only context** — the server assigns the variation; the SDK only exposes it. It is available on every screen instance as `screen.experiment`, typed as `ExperimentMembers | null`.

## Opting in

The experiment is only delivered when the screen's rendering configuration asks for it. Without the opt-in, `screen.experiment` is `null`:

```json
{ "context_configuration": ["experiment"] }
```

`screen.experiment` is also `null` when the opt-in is present but no experiment is currently active for the transaction. Always null-check before reading.

## Basic Usage

```typescript
import Login from '@auth0/auth0-acul-js/login';

const screen = new Login();

// null when the screen did not opt in, or no experiment is active.
const experiment = screen.experiment;

if (experiment) {
  console.log('Experiment:', experiment.experimentId);
  console.log('Assigned variation:', experiment.variationId);
  console.log('Is control:', experiment.isControl);
}
```

`experiment` lives on the shared base context, so the same property is available on every screen (`new Signup().experiment`, `new MfaOtpChallenge().experiment`, and so on) — not just `Login`.

## Reading the Assigned Variation

```typescript
import Login from '@auth0/auth0-acul-js/login';

const { experiment } = new Login();

if (experiment) {
  const {
    experimentId,     // string  — the active experiment
    variationId,      // string  — the variation assigned to this user
    variationName,    // string | null
    variationDescription, // string | null
    isControl,        // boolean — true for the baseline/control variation
  } = experiment;

  // Branch your UI on the control vs. a treatment variation.
  if (isControl) {
    // render the baseline experience
  } else {
    // render the treatment for `variationId`
  }
}
```

## Reading Variation Config

Each entry in `config` is the resolved value for a config key (baseline defaults merged with the variation's overrides). Values arrive wrapped in a `{ value: <resolved value> }` envelope, so read the resolved value from `.value` — **not** the entry itself.

```typescript
import Login from '@auth0/auth0-acul-js/login';

const { experiment } = new Login();

// Config values are experiment-defined (`unknown`), so narrow the entry before reading `.value`.
function readConfig<T>(key: string): T | undefined {
  const entry = experiment?.config?.[key] as { value?: T } | undefined;
  return entry?.value;
}

const showPasskey = readConfig<boolean>('show_passkey');
const heroVariant = readConfig<string>('hero_variant');

if (showPasskey) {
  // surface the passkey affordance for this variation
}
```

> ⚠️ **Read `.value`, never the entry.** The wrapper object is always truthy, even when the resolved value is `false`:
>
> ```typescript
> // WRONG — `{ value: false }` is still a truthy object, so this branch always runs.
> if (experiment?.config['show_passkey']) { /* ... */ }
>
> // CORRECT — read the resolved value.
> const entry = experiment?.config['show_passkey'] as { value?: boolean } | undefined;
> if (entry?.value) { /* ... */ }
> ```

## Full Decision Flow (control vs. treatment + config)

End to end: **no experiment or control → default UI; treatment → read `config.show_passkey.value` → render the treatment.** This is the same flow as the React example, written imperatively.

```typescript
import Login from '@auth0/auth0-acul-js/login';

const login = new Login();
const experiment = login.experiment;

// 1) No experiment (not opted in / none active) OR 2) the control arm → default UI.
if (!experiment || experiment.isControl) {
  renderDefaultLoginUI();
} else {
  // 3) Treatment arm — `experiment` is non-null here. The `{ value }` wrapper is always
  //    truthy, so read `.value` and default to the baseline.
  const entry = experiment.config['show_passkey'] as { value?: boolean } | undefined;
  const showPasskey = entry?.value ?? false;

  // 4) Render the treatment UI only when the flag resolves true; otherwise fall back.
  if (showPasskey) {
    renderTreatmentLoginUI();
  } else {
    renderDefaultLoginUI();
  }
}
```

`renderDefaultLoginUI()` and `renderTreatmentLoginUI()` are your own render functions. Because `variationId` is present for every arm, you can also `switch (experiment.variationId)` when an experiment has more than two variations.

## Conditional UI Rendering

```typescript
import Login from '@auth0/auth0-acul-js/login';

const login = new Login();
const experiment = login.experiment;

// Fall back to a sensible default whenever the experiment (or this config key) is absent.
const entry = experiment?.config['cta_label'] as { value?: string } | undefined;
const ctaLabel = entry?.value ?? 'Continue';

const button = document.querySelector<HTMLButtonElement>('#login-cta');
if (button) {
  button.textContent = ctaLabel;
  // `variationId` is present for BOTH arms — control and treatment each have their own id.
  // Only the absence of an experiment falls back to 'baseline'.
  button.setAttribute('data-variation', experiment?.variationId ?? 'baseline');
}
```

## Tips

1. **Always null-check `experiment`** — it is `null` unless the screen opted in *and* an experiment is active.
2. **Read `.value`, not the entry** — every config entry is a truthy `{ value: ... }` wrapper, so testing the entry directly is always true.
3. **Narrow before use** — config values are typed `unknown` because they are experiment-defined; cast/validate before reading.
4. **Provide a baseline** — design your UI so the absence of an experiment (or an unknown config key) falls back to your default experience.
5. **`experiment` is read-only** — there is nothing to submit; the variation assignment is decided server-side.
