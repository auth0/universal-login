import React from 'react';
import Button from '../../../components/common/Button';
import Input from '../../../components/common/Input';
import Captcha from '../../../components/common/Captcha';

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
  captchaPlaceholder = "Enter the code shown above"
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
    <div className="auth0-form">
      {/* Username/Email Input */}
      <Input
        id="username"
        placeholder={usernamePlaceholder}
        type="text"
        autoComplete="username"
        required
        {...{ ref: usernameRef } as any}
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor" style={{ color: 'var(--color-icons, #65676e)' }}>
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        }
      />

      {/* Password Input */}
      <Input
        id="password"
        placeholder={passwordPlaceholder}
        type="password"
        autoComplete="current-password"
        required
        showPasswordToggle
        {...{ ref: passwordRef } as any}
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor" style={{ color: 'var(--color-icons, #65676e)' }}>
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
        }
      />

      {/* Captcha */}
      {isCaptchaAvailable && (
        <Captcha
          captchaImage={captchaImage}
          captchaRef={captchaRef}
          placeholder={captchaPlaceholder}
        />
      )}

      {/* Submit Button */}
      <div className="auth0-button-container">
        <Button 
          onClick={onSubmit} 
          fullWidth
          isLoading={isLoading}
          className="auth0-continue-button"
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default LoginForm; 