# Login Screen Examples

## Basic Login with Username/Password

```typescript
import Login from '@auth0/auth0-acul-js/login';

const loginManager = new Login();

// Handle form submission and error handling
const errors = loginManager.getErrors();
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  try {
    await loginManager.login({
      username: 'user@example.com',
      password: 'myPassword123'
    });
  } catch (error) {
    console.error('Login failed:', error);
  }
};

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

## Login with Social Provider

```typescript
import Login from '@auth0/auth0-acul-js/login';

const loginManager = new Login();

// Handle social login
const handleSocialLogin = async (connection: string) => {
  try {
    await loginManager.federatedLogin({
      connection: connection // e.g. 'google-oauth2'
    });
  } catch (error) {
    console.error('Social login failed:', error);
  }
};
```

## React Component Example with TailwindCSS

```tsx
import React, { useMemo, useState } from 'react';
import Login from '@auth0/auth0-acul-js/login';

const LoginScreen: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const loginManager = new Login();
  const { transaction } = loginManager;
  const activeIdentifiers = useMemo(() => loginManager.getLoginIdentifiers(), []);

  const getIdentifierLabel = () => {
    if (activeIdentifiers?.length === 1) return `Enter your ${activeIdentifiers[0]}`;
    return `Enter your ${activeIdentifiers?.join(" or ")}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await loginManager.login({
        username,
        password
      });
    } catch (error) {
      setError('Login failed. Please check your credentials.');
    }
  };
  
  const handleSocialLogin = async (connection: string) => {
    try {
      await loginManager.federatedLogin({ connection });
    } catch (error) {
      setError('Social login failed. Please try again.');
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                {getIdentifierLabel()}
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder= {getIdentifierLabel()}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {error && (
              <div className="text-red-600 text-sm">
                {error}
              </div>
            )}

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign in
              </button>
            </div>
          </form>

          {transaction.alternateConnections && transaction.alternateConnections.length > 0 && (
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                {transaction.alternateConnections.map((connection) => (
                  <button
                    key={connection.name}
                    onClick={() => handleSocialLogin(connection.name)}
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    {connection.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
```

## Google One Tap

Use `screen.googleOneTapConfig` to check if the feature is enabled server-side, then initialize the [Google Identity Services (GSI)](https://developers.google.com/identity/gsi/web/guides/overview) library and call `googleOneTap` with the returned credential.

First, add the GSI script to your `index.html`:
```html
<script src="https://accounts.google.com/gsi/client" async></script>
```

Then in your screen code:
```typescript
import Login from '@auth0/auth0-acul-js/login';

const loginManager = new Login();
const config = loginManager.screen.googleOneTapConfig;

if (config) {
  window.google?.accounts.id.initialize({
    client_id: config.client_id,
    nonce: config.nonce,
    context: config.context,
    itp_support: config.itp_support,
    auto_select: config.auto_select,
    cancel_on_tap_outside: config.cancel_on_tap_outside,
    callback: ({ credential }) => {
      loginManager.googleOneTap({ one_tap_credential: credential });
    },
  });
  window.google?.accounts.id.prompt();
}
```

## activeIdentifierType

When a tenant allows multiple identifiers, `screen.data.activeIdentifierType` tells you which input the server resolved so you can render it on first paint. It is `undefined` when the server has not resolved one, so fall back to your own default rather than assuming `email`.

```typescript
import Login from '@auth0/auth0-acul-js/login';

const loginManager = new Login();

const activeIdentifier = loginManager.screen.data?.activeIdentifierType ?? 'email';

if (activeIdentifier === 'phone') {
  // render the phone number input with the country code picker
} else {
  // render the email / username input
}
```

## Telling the server which identifier the user chose

`activeIdentifierType` above tells you which input to *render*. `identifierType` is the other half: it tells the server which input the user actually *submitted*.

Pass it when your screen lets the user pick the identifier — tabs, a dropdown, or a single input resolved from `getLoginIdentifiers()`. The submitted type is then authoritative: the server reads the value as that type instead of inferring one from its shape, so an all-digits username is not mistaken for a phone number and an address-shaped username is not mistaken for an email.

The value always goes in `username`, whatever type it represents — `identifierType` only says how to read it. Omit `identifierType` to keep the existing behaviour, where `username` is submitted on its own and the server infers what it is.

```typescript
import Login from '@auth0/auth0-acul-js/login';
import type { IdentifierType } from '@auth0/auth0-acul-js/login';

const loginManager = new Login();

await loginManager.login({
  username: 'someone',      // the value the user typed
  password: 'myPassword123',
  identifierType: 'username' // how the server should read it
});
```

For a phone identifier, also pass the selected country as `phoneCountryCode`. The submitted country is authoritative: the server prefixes its dial code rather than inferring a country from the digits or from geo-IP, so `username` should be the national number *without* a dial code. Omitting `phoneCountryCode` lets the server derive the country itself.

```tsx
import React, { useMemo, useState } from 'react';
import Login from '@auth0/auth0-acul-js/login';
import type { IdentifierType } from '@auth0/auth0-acul-js/login';

const TypedLoginScreen: React.FC = () => {
  const [loginManager] = useState(() => new Login());
  const { countryCodes } = loginManager;

  const allowed = useMemo(() => loginManager.getLoginIdentifiers() ?? ['email'], [loginManager]);

  // Start on the identifier the server resolved, falling back to the first the tenant allows.
  const [identifierType, setIdentifierType] = useState<IdentifierType>(
    loginManager.screen.data?.activeIdentifierType ?? allowed[0]
  );
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // `recommended` is the server's suggested default; fall back to the first available country.
  const [phoneCountryCode, setPhoneCountryCode] = useState(
    countryCodes?.recommended ?? countryCodes?.available?.[0]?.code ?? ''
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await loginManager.login({
      username, // national number when identifierType is 'phone', e.g. "2015550123"
      password,
      identifierType,
      // Only read for a phone identifier; harmless to leave off otherwise.
      ...(identifierType === 'phone' && phoneCountryCode ? { phoneCountryCode } : {})
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* One tab per identifier the tenant allows */}
      {allowed.map((type) => (
        <button key={type} type="button" onClick={() => setIdentifierType(type)}>
          {type}
        </button>
      ))}

      {identifierType === 'phone' && countryCodes?.available && (
        <select value={phoneCountryCode} onChange={(e) => setPhoneCountryCode(e.target.value)}>
          {countryCodes.available.map(({ code, label, dialCode }) => (
            <option key={code} value={code}>
              {label} ({dialCode})
            </option>
          ))}
        </select>
      )}

      <input
        id="username"
        type={identifierType === 'phone' ? 'tel' : 'text'}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder={`Enter your ${identifierType}`}
      />

      <input
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Sign in</button>
    </form>
  );
};

export default TypedLoginScreen;
```

Submit only a type the tenant actually allows — one of `getLoginIdentifiers()`. The server rejects a type that is not enabled for the connection, and the values line up exactly, so an entry from that array can be passed straight through as `identifierType`.

`countryCodes` is `null` when the server does not provide the list. In that case render your own phone input and submit `username` on its own, or keep using `pickCountryCode()`.