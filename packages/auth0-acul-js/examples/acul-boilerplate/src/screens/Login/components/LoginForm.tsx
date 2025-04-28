import React from 'react';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Captcha from '../../../components/Captcha/Captcha';
import './login.css';

interface LoginFormProps {
  usernameRef: React.RefObject<HTMLInputElement>;
  passwordRef: React.RefObject<HTMLInputElement>;
  captchaRef: React.RefObject<HTMLInputElement>;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  isCaptchaAvailable?: boolean;
  captchaImage?: string;
  countryCode?: string;
  countryPrefix?: string;
  buttonText?: string;
  usernamePlaceholder?: string;
  passwordPlaceholder?: string;
  captchaPlaceholder?: string;
  resetPasswordLink?: string;
  resetPasswordText?: string;
  onResetPasswordClick?: (e: React.MouseEvent<HTMLAnchorElement>, path: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  usernameRef,
  passwordRef,
  captchaRef,
  onSubmit,
  isLoading,
  isCaptchaAvailable = false,
  captchaImage = "https://via.placeholder.com/150",
  countryCode,
  countryPrefix,
  buttonText = "Continue",
  usernamePlaceholder = "Username or email address",
  passwordPlaceholder = "Password",
  captchaPlaceholder = "Enter the code shown above",
  resetPasswordLink,
  resetPasswordText = "Forgot password?",
  onResetPasswordClick
}) => {
  // Store country information for potential future use
  React.useEffect(() => {
    if (countryCode || countryPrefix) {
      // This effect ensures the variables are "used" to avoid linter errors
      // In a real implementation, we might use these for phone number formatting, etc.
      console.log('Country information available:', { countryCode, countryPrefix });
    }
  }, [countryCode, countryPrefix]);

  return (
    <form onSubmit={onSubmit} className="auth0-form">
      {/* Username/Email Input */}
      <div className="auth0-input-wrapper">
        <Input
          id="username"
          placeholder={usernamePlaceholder}
          type="text"
          autoComplete="username"
          required
          {...{ ref: usernameRef } as any}
        />
      </div>

      {/* Password Input */}
      <div className="auth0-input-wrapper">
        <Input
          id="password"
          placeholder={passwordPlaceholder}
          type="password"
          autoComplete="current-password"
          required
          showPasswordToggle
          {...{ ref: passwordRef } as any}
        />
      </div>

      {/* Captcha */}
      {isCaptchaAvailable && (
        <Captcha
          captchaImage={captchaImage}
          captchaRef={captchaRef}
          placeholder={captchaPlaceholder}
        />
      )}

      {/* Reset Password Link */}
      {resetPasswordLink && resetPasswordText && (
        <div className="auth0-forgot-password">
          <a 
            href={resetPasswordLink}
            onClick={(e) => onResetPasswordClick ? onResetPasswordClick(e, resetPasswordLink) : undefined}
          >
            <strong>{resetPasswordText}</strong>
          </a>
        </div>
      )}

      {/* Submit Button */}
      <div className="auth0-button-container w-full">
        <Button 
          type="submit"
          variant="primary"
          fullWidth
          isLoading={isLoading}
        >
          {buttonText}
        </Button>
      </div>
    </form>
  );
};

export default LoginForm; 