import React from 'react';
import Button from '../../../components/common/Button';
import Input from '../../../components/common/Input';
import { navigateWithCurrentOrigin } from '../../../utils/url';
import './login-id.css';

export interface LoginIdFormProps {
  loginIdRef: React.RefObject<HTMLInputElement>;
  captchaRef?: React.RefObject<HTMLInputElement>;
  onSubmit: (e: React.FormEvent) => void;
  isLoading?: boolean;
  isCaptchaAvailable?: boolean;
  captchaImage?: string;
  buttonText?: string;
  loginIdPlaceholder?: string;
  captchaPlaceholder?: string;
  loginIdError?: string;
  captchaError?: string;
  className?: string;
  showPasskeyButton?: boolean;
  onPasskeyClick?: () => void;
  passkeyButtonText?: string;
  forgotPasswordLink?: string;
  forgotPasswordText?: string;
}

const LoginIdForm: React.FC<LoginIdFormProps> = ({
  loginIdRef,
  captchaRef,
  onSubmit,
  isLoading = false,
  isCaptchaAvailable = false,
  captchaImage = '',
  buttonText = 'Continue',
  loginIdPlaceholder = 'Email address',
  captchaPlaceholder = 'Enter the code shown above',
  loginIdError,
  captchaError,
  className = '',
  forgotPasswordLink = '#',
  forgotPasswordText = "Can't log in to your account?"
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <form onSubmit={handleSubmit} className={`auth0-form ${className}`}>
      {/* Login ID Input */}
      <div className="auth0-input-wrapper">
        <Input
          id="login-id"
          placeholder={loginIdPlaceholder}
          type="text"
          autoComplete="username email"
          required
          error={loginIdError}
          ref={loginIdRef}
        />
      </div>

      {/* Captcha */}
      {isCaptchaAvailable && (
        <div className="auth0-captcha">
          <div className="auth0-captcha-image">
            <img src={captchaImage} alt="Captcha" style={{ maxWidth: '100%', height: 'auto' }} />
          </div>
          <div className="auth0-input-wrapper">
            <Input
              id="captcha"
              placeholder={captchaPlaceholder}
              type="text"
              required
              error={captchaError}
              ref={captchaRef}
            />
          </div>
        </div>
      )}

      {/* Forgot Password link */}
      {forgotPasswordLink && forgotPasswordText && (
        <div className="auth0-forgot-password auth0-forgot-password-left">
          <a href={forgotPasswordLink} onClick={(e) => {
            e.preventDefault();
            // Use the utility function to navigate
            navigateWithCurrentOrigin(forgotPasswordLink);
          }}><strong>{forgotPasswordText}</strong></a>
        </div>
      )}

      {/* Submit Button */}
      <div className="auth0-button-container">
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

export default LoginIdForm; 