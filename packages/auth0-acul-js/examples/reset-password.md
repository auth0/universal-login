## resetPassword

```typescript
import React, { useRef, useState } from "react";
import { useResetPasswordManager } from './hooks/useResetPasswordManager';
import { Logo } from "../../components/Logo";
import { Title } from './components/Title';
import { ErrorMessages } from './components/ErrorMessages';
import Button from '../../components/Button'; // Adjust the path if needed

const ResetPasswordScreen: React.FC = () => {
  const { resetPasswordManager, handleResetPassword } = useResetPasswordManager();

  const newPasswordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const captchaRef = useRef<HTMLInputElement>(null);

  const [isValid, setIsValid] = useState(true);
  const [errors, setErrors] = useState<Array<{ code: string; message: string }>>([]);
  const [isValidConfirmPassword, setIsValidConfirmPassword] = useState(true);
  const [confirmPasswordErrors, setConfirmPasswordErrors] = useState<Array<{ code: string; message: string }>>([]);

  const getFormValues = () => ({
    newPassword: newPasswordRef.current?.value || '',
    confirmPassword: confirmPasswordRef.current?.value || '',
    captcha: captchaRef.current?.value || '',
  });

  const onLoginClick = () => {
    const { newPassword, confirmPassword, captcha } = getFormValues();

    const { isValid, errors } = resetPasswordManager.validatePassword(newPassword);
    const { isValid: isValidConfirmPassword, errors: confirmPasswordErrors } =
      resetPasswordManager.validatePassword(confirmPassword);

    setIsValid(isValid);
    setErrors(errors);
    setIsValidConfirmPassword(isValidConfirmPassword);
    setConfirmPasswordErrors(confirmPasswordErrors);

    if (!isValid || !isValidConfirmPassword) {
      return;
    }

    handleResetPassword(newPassword, confirmPassword, captcha);
  };

  return (
    <div className="prompt-container">
      <Logo />
      <Title screenTexts={resetPasswordManager.screen.texts!} />

      <div className="input-container">
        {/* New Password */}
        <label>Enter your new password</label>
        <input
          type="password"
          id="newPassword"
          ref={newPasswordRef}
          aria-invalid={!isValid}
          placeholder="Enter your password"
          required
          className={`input w-full border px-4 py-2 rounded ${
            !isValid ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {!isValid && (
          <ul className="text-red-500 text-sm list-disc list-inside">
            {errors.map((err) => (
              <li key={err.code}>{err.message}</li>
            ))}
          </ul>
        )}

        {/* Confirm Password */}
        <label>Confirm your new password</label>
        <input
          type="password"
          id="password"
          ref={confirmPasswordRef}
          aria-invalid={!isValidConfirmPassword}
          placeholder="Re-enter your password"
          required
          className={`input w-full border px-4 py-2 rounded ${
            !isValidConfirmPassword ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {!isValidConfirmPassword && (
          <ul className="text-red-500 text-sm list-disc list-inside">
            {confirmPasswordErrors.map((err) => (
              <li key={err.code}>{err.message}</li>
            ))}
          </ul>
        )}

        {/* Captcha */}
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

        {/* Submit Button */}
        <div className="button-container">
          <Button id="continue" onClick={onLoginClick}>
            Continue
          </Button>
        </div>
      </div>

      {/* Transaction Errors */}
      {resetPasswordManager.transaction.hasErrors && resetPasswordManager.transaction.errors && (
        <ErrorMessages errors={resetPasswordManager.transaction.errors!} />
      )}
    </div>
  );
};

export default ResetPasswordScreen;

```
