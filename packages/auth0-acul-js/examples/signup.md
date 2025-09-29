
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