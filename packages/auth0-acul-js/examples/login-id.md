
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

When a tenant allows multiple identifiers, `screen.data.activeIdentifierType` tells you which input the server resolved so you can render it on first paint. It is `undefined` when the server has not resolved one, so fall back to your own default rather than assuming `email`.

```typescript
import LoginId from '@auth0/auth0-acul-js/login-id';

const loginIdManager = new LoginId();

const activeIdentifier = loginIdManager.screen.data?.activeIdentifierType ?? 'email';

if (activeIdentifier === 'phone') {
  // render the phone number input with the country code picker
} else {
  // render the email / username input
}
```

## Telling the server which identifier the user chose

`activeIdentifierType` tells you which input to *render*; `identifierType` tells the server which identifier the user *entered*. Pass it when your screen lets the user pick the identifier — tabs, a dropdown, or an input resolved from `getLoginIdentifiers()` — and the server reads the value as that type instead of inferring one from its shape, though on this screen the shape still decides which authentication method the user is routed to.

Login submits a single identifier, so it stays denormalized: the value goes in `identifier` and `identifierType` names what it holds. Omit `identifierType` and the identifier is submitted on its own, exactly as before, with the server inferring the type. `username` is `identifier`'s original spelling and is still accepted in its place, so payloads written against the previous contract keep working unchanged.

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

For a phone identifier, pass the national number as `identifier` and the selected country as `phoneCountryCode` — required with `identifierType: 'phone'`, and the inline alternative to `pickCountryCode()`, whose selection a typed submission ignores. Its dial code is prefixed server-side, so the number should carry none.

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
        {countryCodes?.available?.map(({ code, label, dialCode }) => (
          <option key={code} value={code}>
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

`countryCodes` is `null` when the server does not provide the list. In that case render your own phone input and submit `identifier` on its own, or keep using `pickCountryCode()`.

