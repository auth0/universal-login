import React, { useEffect } from 'react';
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
  showPasskeyButton = false,
  onPasskeyClick,
  passkeyButtonText = 'Continue with a passkey',
  forgotPasswordLink = '#',
  forgotPasswordText = "Can't log in to your account?"
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(e);
  };

  // Connect input refs
  useEffect(() => {
    if (loginIdRef && loginIdRef.current) {
      const input = document.getElementById('login-id') as HTMLInputElement;
      if (input) {
        Object.defineProperty(loginIdRef, 'current', {
          value: input,
          writable: true
        });
      }
    }
    
    if (captchaRef && captchaRef.current && isCaptchaAvailable) {
      const input = document.getElementById('captcha') as HTMLInputElement;
      if (input) {
        Object.defineProperty(captchaRef, 'current', {
          value: input,
          writable: true
        });
      }
    }
  }, [loginIdRef, captchaRef, isCaptchaAvailable]);

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

      {/* Separator with OR if passkey is available */}
      {showPasskeyButton && onPasskeyClick && (
        <div className="auth0-separator">
          <span>OR</span>
        </div>
      )}

      {/* Passkey Button */}
      {showPasskeyButton && onPasskeyClick && (
        <div className="auth0-passkey-button-container">
          <Button 
            type="button"
            variant="secondary"
            fullWidth
            onClick={onPasskeyClick}
          >
            {passkeyButtonText}
          </Button>
        </div>
      )}
    </form>
  );
};

export default LoginIdForm; 