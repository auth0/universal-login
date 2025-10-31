## resetPassword

```typescript
import React, { useState, useRef } from "react";
import ResetPassword from "@auth0/auth0-acul-js/reset-password";

const ResetPasswordScreen: React.FC = () => {
  // Manager setup
  const resetPasswordManager =  new ResetPassword();
  
  // Form refs and state
  const newPasswordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const captchaRef = useRef<HTMLInputElement>(null);
  const [password, setPassword] = useState('');

  // Password validation
  const passwordValidation = resetPasswordManager.validatePassword(password);

  // Handle form submission
  const onLoginClick = () => {
    const newPassword = newPasswordRef.current?.value ?? "";
    const confirmPassword = confirmPasswordRef.current?.value ?? "";
    const captcha = captchaRef.current?.value ?? "";

    if (!passwordValidation.isValid) {
      // Handle password validation errors
      return;
    }

    const options = {
      'password-reset': newPassword,
      're-enter-password': confirmPassword,
      captcha: resetPasswordManager.screen.isCaptchaAvailable ? captcha : "",
    };

    resetPasswordManager.resetPassword(options);
  };

  const isValid = passwordValidation.isValid;
  const results = passwordValidation;

  return (
    <div className="prompt-container">
      <Logo />
      <div className="title-container">
        <h1>{resetPasswordManager.screen.texts?.title}</h1>
        {resetPasswordManager.screen.texts?.description && (
          <p>{resetPasswordManager.screen.texts.description}</p>
        )}
      </div>

      <div className="input-container">
        <label>Enter your new password</label>
        <input
          type="password"
          id="newPassword"
          ref={newPasswordRef}
          value={password}
          aria-invalid={!isValid}
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
          required
          className={`input w-full border px-4 py-2 rounded ${!isValid ? 'border-red-500' : 'border-gray-300'}`}
        />

        <label>Confirm your new password</label>
        <input
          type="password"
          id="confirmPassword"
          ref={confirmPasswordRef}
          placeholder="Re-enter your password"
          required
        />

        {password && password.length > 0 && results.results.length > 0 && (
          <div className="mt-2 border border-gray-300 rounded p-2 text-sm">
            <p className="text-gray-700 mb-1">Your password must contain:</p>
            <ul className="list-disc ml-4">
              {results.results.map((rule) => (
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

        {resetPasswordManager.screen.isCaptchaAvailable && (
          <div className="captcha-container">
            <img src={resetPasswordManager.screen.captchaImage ?? ""} alt="Captcha" />
            <label>Enter the captcha</label>
            <input
              type="text"
              id="captcha"
              ref={captchaRef}
              placeholder="Enter the captcha"
            />
          </div>
        )}

        <div className="button-container">
          <Button id="continue" onClick={onLoginClick}>Continue</Button>
        </div>
      </div>

      {resetPasswordManager.transaction.hasErrors && resetPasswordManager.transaction.errors && (
        <ErrorMessages errors={resetPasswordManager.transaction.errors!} />
      )}
    </div>
  );
};

export default ResetPasswordScreen;

```
