
## React Component Example with TailwindCSS

```tsx
import React, { useState, useRef } from 'react';
import LoginInstance from "@auth0/auth0-acul-js/signup";
import { withWindowDebug } from "../../../utils";
import { Logo } from '../../components/Logo';
import { Title } from './components/Title';
import { FederatedLogin } from './components/FederatedLogin';
import { Links } from './components/Links';
import { ErrorMessages } from './components/ErrorMessages';
import Button from '../../components/Button';

const SignupScreen: React.FC = () => {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [ email, setEmail] = useState('');
  const [captcha, setCaptcha] = useState('');

  // Initialize signupManager once
  const [signupManager] = useState(() => new LoginInstance());

  const identifiers = signupManager.getEnabledIdentifiers();

  const {isValid, results} = signupManager.validatePassword(password);

  // Signup button click handler
  const onSignupClick = () => {
    if (!isValid) return;

    const options = {
      username,
      email,
      phoneNumber,
      password,
      captcha: signupManager.screen.isCaptchaAvailable ? captcha : "",
    };
    signupManager.signup(options);
  };

  // Social login handler
  const handleSocialSignup = (connectionName: string) => {
    signupManager.federatedSignup({ connection: connectionName });
  };

  // JSX UI part (same as before)
  return (
    <div className="prompt-container">
      <Logo />
      <Title screenTexts={signupManager.screen.texts!} />

      <div className="input-container">
        {/* Country code button */}
        <button className="pick-country-code hidden" id="pick-country-code">
          Pick country code - {signupManager.transaction.countryCode}: +{signupManager.transaction.countryPrefix}
        </button>

        {/* Email input */}
        {identifiers?.find((id) => id.type === 'email') && (
          <>
            <label htmlFor="email">
              Enter your email{' '}
              {identifiers.find((id) => id.type === 'email')?.required ? (
                <span className="text-red-500">*</span>
              ) : (
                <span className="text-gray-500 text-sm">(optional)</span>
              )}
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange = {(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required={identifiers.find((id) => id.type === 'email')?.required}
            />
          </>
        )}

        {/* Username input */}
        {identifiers?.find((id) => id.type === 'username') && (
          <>
            <label htmlFor="username">
              Enter your username{' '}
              {identifiers.find((id) => id.type === 'username')?.required ? (
                <span className="text-red-500">*</span>
              ) : (
                <span className="text-gray-500 text-sm">(optional)</span>
              )}
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange = {(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required={identifiers.find((id) => id.type === 'username')?.required}
            />
          </>
        )}

        {/* Phone input */}
        {identifiers?.find((id) => id.type === 'phone') && (
          <>
            <label htmlFor="phoneNumber">
              Enter your phone number{' '}
              {identifiers.find((id) => id.type === 'phone')?.required ? (
                <span className="text-red-500">*</span>
              ) : (
                <span className="text-gray-500 text-sm">(optional)</span>
              )}
            </label>
            <input
              type="tel"
              id="phoneNumber"
              value={phone}
              onChange = {(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              required={identifiers.find((id) => id.type === 'phone')?.required}
            />
          </>
        )}

        {/* Password input */}
        <label htmlFor="password">
          Enter your password <span className="text-red-500">*</span>
        </label>
        <input
          type="password"
          id="password"
          value={password}
          placeholder="Enter your password"
          aria-invalid={!isValid}
          required
          className={`input w-full border px-4 py-2 rounded ${
            !isValid ? 'border-red-500' : 'border-gray-300'
          }`}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Password validation hints */}
        {password.length > 0 && results.length > 0 && (
        <div className="mt-2 border border-gray-300 rounded p-2 text-sm">
          <p className="text-gray-700 mb-1">Your password must contain:</p>
          <ul className="list-disc ml-4">
            {results.map((rule) => (
              <li
                key={rule.code}
                className={rule.status === 'valid' ? 'text-green-600' : 'text-gray-700'}
              >
                {rule.label}
                {rule.items && rule.items.length > 0 && (
                  <ul className="ml-5 list-disc">
                    {rule.items.map((sub) => (
                      <li
                        key={sub.code}
                        className={sub.status === 'valid' ? 'text-green-600' : 'text-gray-700'}
                      >
                        {sub.label}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

        {/* Captcha input */}
        {signupManager.screen.isCaptchaAvailable && (
          <div className="captcha-container">
            <img src={signupManager.screen.captchaImage ?? ''} alt="Captcha" />
            <label htmlFor="captcha">Enter the captcha</label>
            <input
              type="text"
              id="captcha"
              ref={captchaRef}
              placeholder="Enter the captcha"
            />
          </div>
        )}

        {/* Signup button */}
        <div className="button-container mt-4">
          <Button onClick={onSignupClick}>Continue</Button>
        </div>
      </div>

      {/* Social login buttons */}
      <FederatedLogin
        connections={signupManager.transaction.alternateConnections!}
        onFederatedLogin={handleSocialSignup}
      />

      {/* Links */}
      {signupManager.screen.links && (
        <Links loginLink={signupManager.screen.links.loginLink!} />
      )}

      {/* Error messages */}
      {signupManager.transaction.hasErrors && signupManager.transaction.errors && (
        <ErrorMessages errors={signupManager.transaction.errors!} />
      )}
    </div>
  );
};

export default SignupScreen;
```

## Google One Tap

Use `screen.googleOneTapConfig` to check if the feature is enabled server-side, then initialize the [Google Identity Services (GSI)](https://developers.google.com/identity/gsi/web/guides/overview) library and call `googleOneTap` with the returned credential.

First, add the GSI script to your `index.html`:
```html
<script src="https://accounts.google.com/gsi/client" async></script>
```

Then in your screen code:
```typescript
import Signup from '@auth0/auth0-acul-js/signup';

const signupManager = new Signup();
const config = signupManager.screen.googleOneTapConfig;

if (config) {
  window.google?.accounts.id.initialize({
    client_id: config.client_id,
    nonce: config.nonce,
    context: config.context,
    itp_support: config.itp_support,
    auto_select: config.auto_select,
    cancel_on_tap_outside: config.cancel_on_tap_outside,
    callback: ({ credential }) => {
      signupManager.googleOneTap({ one_tap_credential: credential });
    },
  });
  window.google?.accounts.id.prompt();
}
```

## Phone signup with an inline country dropdown

`countryCodes` lets you render the country selector next to the phone number field instead of routing the user through `pickCountryCode()` and a separate screen. Pass the selected `code` as `phoneCountryCode` alongside `phoneNumber`.

The submitted country is authoritative: the server prefixes its dial code rather than inferring a country from the digits or from geo-IP. So `phoneNumber` should be the national number *without* a dial code. Omitting `phoneCountryCode` keeps the previous behaviour, where the server derives the country itself.

```tsx
import React, { useState } from 'react';
import Signup from '@auth0/auth0-acul-js/signup';

const PhoneSignup: React.FC = () => {
  const [signupManager] = useState(() => new Signup());
  const { countryCodes } = signupManager;

  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  // `recommended` is the server's suggested default; fall back to the first available country.
  const [phoneCountryCode, setPhoneCountryCode] = useState(
    countryCodes?.recommended ?? countryCodes?.available?.[0]?.code ?? ''
  );

  const onSignupClick = () => {
    signupManager.signup({
      phoneNumber, // national number, e.g. "2015550123"
      phoneCountryCode, // ISO 3166-1 alpha-2, e.g. "US"
      password,
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
        id="phoneNumber"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="Enter your phone number"
      />

      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
      />

      <button onClick={onSignupClick}>Continue</button>
    </div>
  );
};

export default PhoneSignup;
```

Only `code` is submitted, so entries sharing one — a country with several dial codes — are not independently selectable.

`countryCodes.available` is `null`, and the dropdown renders empty, unless the screen's rendering configuration asks for the list: `{ "context_configuration": ["country_codes"] }`. Otherwise submit `phoneNumber` on its own, or keep using `pickCountryCode()`.