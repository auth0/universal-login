
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
  // Initialize signupManager once
  const [signupManager] = useState(() => new LoginInstance());
  withWindowDebug(signupManager, 'signup');

  // Refs for form inputs
  const usernameRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const captchaRef = useRef<HTMLInputElement>(null);

  // Validation & error states
  const [isValid, setIsValid] = useState(true);
  const [errors, setErrors] = useState<Array<{ code: string; message: string }>>([]);
  const [passwordValidation, setPasswordValidation] = useState<
    Array<{ code: string; policy: string; isValid: boolean }>
  >([]);
  const [hasTypedPassword, setHasTypedPassword] = useState(false);

  // Extract enabled identifiers from signupManager
  const identifiers = signupManager.getEnabledIdentifiers();

  // Helper to get all form values at once
  const getFormValues = () => ({
    username: usernameRef.current?.value ?? "",
    phoneNumber: phoneNumberRef.current?.value ?? "",
    email: emailRef.current?.value ?? "",
    password: passwordRef.current?.value ?? "",
    captcha: captchaRef.current?.value ?? "",
  });

  // Password input change handler
  const onPasswordChange = (password: string) => {
    if (!hasTypedPassword && password.length > 0) setHasTypedPassword(true);

    const results = signupManager.validatePassword(password);
    setPasswordValidation(results);

    const failedRules = results.filter((r) => !r.isValid);
    setIsValid(failedRules.length === 0);
    setErrors(failedRules.map((r) => ({ code: r.code, message: r.policy })));
  };

  // Signup button click handler
  const onSignupClick = () => {
    const { username, email, phoneNumber, password, captcha } = getFormValues();

    const results = signupManager.validatePassword(password);
    const failed = results.filter((rule) => !rule.isValid);
    const valid = failed.length === 0;

    setIsValid(valid);
    setErrors(failed.map((rule) => ({ code: rule.code, message: rule.policy })));

    if (!valid) return;

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
              ref={emailRef}
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
              ref={usernameRef}
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
              ref={phoneNumberRef}
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
          ref={passwordRef}
          placeholder="Enter your password"
          aria-invalid={!isValid}
          required
          className={`input w-full border px-4 py-2 rounded ${
            !isValid ? 'border-red-500' : 'border-gray-300'
          }`}
          onChange={(e) => onPasswordChange(e.target.value)}
        />

        {/* Password validation hints */}
        {hasTypedPassword && passwordValidation.length > 0 && (
          <div className="mt-2 border border-gray-300 rounded p-3 text-sm">
            <p className="mb-1 text-gray-700">Your password must contain:</p>
            <ul className="list-disc list-inside space-y-1">
              {passwordValidation
                .filter(
                  (rule) =>
                    ![
                      'password-policy-lower-case',
                      'password-policy-upper-case',
                      'password-policy-numbers',
                      'password-policy-special-characters'
                    ].includes(rule.code)
                )
                .map((rule) => (
                  <li key={rule.code} className={rule.isValid ? 'text-green-600' : 'text-gray-700'}>
                    {rule.policy}
                  </li>
                ))}

              {passwordValidation.some((rule) =>
                [
                  'password-policy-lower-case',
                  'password-policy-upper-case',
                  'password-policy-numbers',
                  'password-policy-special-characters'
                ].includes(rule.code)
              ) && (
                <li className="text-gray-700">
                  At least 3 of the following:
                  <ul className="list-disc list-inside ml-5 mt-1 space-y-1">
                    {passwordValidation
                      .filter((rule) =>
                        [
                          'password-policy-lower-case',
                          'password-policy-upper-case',
                          'password-policy-numbers',
                          'password-policy-special-characters'
                        ].includes(rule.code)
                      )
                      .map((rule) => (
                        <li
                          key={rule.code}
                          className={rule.isValid ? 'text-green-600' : 'text-gray-700'}
                        >
                          {rule.policy}
                        </li>
                      ))}
                  </ul>
                </li>
              )}
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