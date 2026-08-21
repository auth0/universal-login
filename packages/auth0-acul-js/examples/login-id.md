
## login
This methods handles username related configuration for login-flow, it optionally also accepts captcha values if configured in the flow

```typescript
import  LoginId  from "@auth0/auth0-acul-js/login-id"

const loginIdManager = new LoginId();

loginIdManager.login({
 username: "testUser"
})

```

## error handling
This methods handles username related configuration for login-flow, it optionally also accepts captcha values if configured in the flow

```typescript
import  LoginId  from "@auth0/auth0-acul-js/login-id"

const loginIdManager = new LoginId();
const errors = loginIdManager.getErrors();

loginIdManager.login({
 username: "testUser"
})

return (
    <div>
      {/* Render the login ID screen content */}
      <button onclick={handleLogin}>Continue<button>
      {loginIdManager.transaction.hasErrors && errors && (
        // A custom React component that renders a <div> with error details
        <ErrorMessages errors={errors} />
      )}
)

```


## federatedLogin
If there is an associated social connection, below snippet can help login with selected social connection

```typescript
import  LoginId  from "@auth0/auth0-acul-js/login-id";
const loginIdManager = new LoginId();

// Check if alternateConnections is available and has at least one item
if (!loginIdManager.transaction.alternateConnections) {
  console.error('No alternate connections available.');
}

// Select the first available connection (users can select any available connection)
const selectedConnection = alternateConnections[0];

// Log the chosen connection for debugging or informational purposes
console.log(`Selected connection: ${selectedConnection.name}`);

// Proceed with federated login using the selected connection
loginIdManager.federatedLogin({
  connection: selectedConnection.name,
})

```

## passkeyLogin
If there is an associated passkey, this method will automatically prompt users to select the passkey from native window dialog.
```typescript
import  LoginId  from "@auth0/auth0-acul-js/login-id";
const loginIdManager = new LoginId();

// it internally maps users available passkey config provided from auth0 server
loginIdManager.passkeyLogin();
```


## pickCountryCode

```typescript
import  LoginId  from "@auth0/auth0-acul-js/login-id";
const loginIdManager = new LoginId();

loginIdManager.pickCountryCode();
```

## Google One Tap

Use `screen.googleOneTapConfig` to check if the feature is enabled server-side, then initialize the [Google Identity Services (GSI)](https://developers.google.com/identity/gsi/web/guides/overview) library and call `googleOneTap` with the returned credential.

First, add the GSI script to your `index.html`:
```html
<script src="https://accounts.google.com/gsi/client" async></script>
```

Then in your screen code:
```typescript
import LoginId from '@auth0/auth0-acul-js/login-id';

const loginIdManager = new LoginId();
const config = loginIdManager.screen.googleOneTapConfig;

if (config) {
  window.google?.accounts.id.initialize({
    client_id: config.client_id,
    nonce: config.nonce,
    context: config.context,
    itp_support: config.itp_support,
    auto_select: config.auto_select,
    cancel_on_tap_outside: config.cancel_on_tap_outside,
    callback: ({ credential }) => {
      loginIdManager.googleOneTap({ one_tap_credential: credential });
    },
  });
  window.google?.accounts.id.prompt();
}
```

## activeIdentifierType

`screen.data.activeIdentifierType` is the input the server resolved, for first paint. It is `undefined` when none was resolved, so supply your own default.

```typescript
import LoginId from '@auth0/auth0-acul-js/login-id';
import type { IdentifierType } from '@auth0/auth0-acul-js/login-id';

const loginIdManager = new LoginId();
const allowed = loginIdManager.getLoginIdentifiers() ?? [];

// Fall back to the first of email, username, phone the connection allows. A fixed 'email' paints a
// field a username-only or phone-only connection rejects.
const activeIdentifier =
  loginIdManager.screen.data?.activeIdentifierType ??
  (['email', 'username', 'phone'] as IdentifierType[]).find((type) => allowed.includes(type)) ??
  'email';

if (activeIdentifier === 'phone') {
  // render the phone number input with the country code picker
} else {
  // render the email / username input
}
```

## Telling the server which identifier the user chose

`activeIdentifierType` says which input to *render*; `identifierType` says which one the user *entered*. Pass it when your screen lets the user pick — tabs, a dropdown, or `getLoginIdentifiers()`.

The value goes in `identifier`, and `identifierType` names what it holds. Omit the type and the identifier is submitted on its own, as before. `username` still works in `identifier`'s place.

```typescript
import LoginId from '@auth0/auth0-acul-js/login-id';

const loginIdManager = new LoginId();

// Read as an email, whatever the value looks like.
loginIdManager.login({ identifier: 'someone@example.com', identifierType: 'email' });

// Read as a username rather than resolved from the value's shape.
loginIdManager.login({ identifier: 'someone', identifierType: 'username' });

// No type at all: the previous contract, with the server inferring one from the value's shape.
loginIdManager.login({ identifier: 'someone' });
```

For a phone, pass the national number as `identifier` and the country as `phoneCountryCode` (from `countryCodes.available`, rendered inline). The dial code is added server-side. A typed submission ignores any `pickCountryCode()` selection.

```tsx
import React, { useState } from 'react';
import LoginId from '@auth0/auth0-acul-js/login-id';

const PhoneLoginId: React.FC = () => {
  const [loginIdManager] = useState(() => new LoginId());
  const { countryCodes } = loginIdManager;

  const [phone, setPhone] = useState('');
  // `recommended` is the server's suggested default; fall back to the first available country.
  const [phoneCountryCode, setPhoneCountryCode] = useState(
    countryCodes?.recommended ?? countryCodes?.available?.[0]?.code ?? ''
  );

  const onContinueClick = () => {
    loginIdManager.login({
      identifier: phone, // national number, e.g. "2015550123"
      identifierType: 'phone',
      phoneCountryCode // ISO 3166-1 alpha-2, e.g. "US"
    });
  };

  return (
    <div className="input-container">
      <select value={phoneCountryCode} onChange={(e) => setPhoneCountryCode(e.target.value)}>
        {/* A country can appear more than once, one entry per dial code, so key on both. */}
        {countryCodes?.available?.map(({ code, label, dialCode }) => (
          <option key={`${code}-${dialCode}`} value={code}>
            {label} ({dialCode})
          </option>
        ))}
      </select>

      <input
        type="tel"
        id="phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Enter your phone number"
      />

      <button onClick={onContinueClick}>Continue</button>
    </div>
  );
};

export default PhoneLoginId;
```

Submit only a type the tenant actually allows — one of `getLoginIdentifiers()`. The server rejects a type that is not enabled for the connection, and the values line up exactly, so an entry from that array can be passed straight through as `identifierType`.

Only `code` is submitted, so entries sharing one — a country with several dial codes — are not independently selectable.

`countryCodes.available` is `null`, and the dropdown renders empty, unless the screen's rendering configuration asks for the list: `{ "context_configuration": ["country_codes"] }`. Otherwise submit `identifier` on its own, or keep using `pickCountryCode()`.

Omitting `phoneCountryCode` submits untyped, leaving the server to resolve the country itself.

