import React from 'react';
import Button from '../../atoms/Button';
import FormField from '../../molecules/FormField';
import './LoginForm.css';

export interface LoginFormProps {
  usernameRef: React.RefObject<HTMLInputElement>;
  passwordRef: React.RefObject<HTMLInputElement>;
  captchaRef?: React.RefObject<HTMLInputElement>;
  onSubmit: (e: React.FormEvent) => void;
  isLoading?: boolean;
  isCaptchaAvailable?: boolean;
  captchaImage?: string;
  buttonText?: string;
  usernamePlaceholder?: string;
  passwordPlaceholder?: string;
  captchaPlaceholder?: string;
  usernameError?: string;
  passwordError?: string;
  captchaError?: string;
  className?: string;
  resetPasswordLink?: string;
  resetPasswordText?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({
  usernameRef,
  passwordRef,
  captchaRef,
  onSubmit,
  isLoading = false,
  isCaptchaAvailable = false,
  captchaImage = '',
  buttonText = 'Continue',
  usernamePlaceholder = 'Phone or Username or Email',
  passwordPlaceholder = 'Password',
  captchaPlaceholder = 'Enter the code shown above',
  usernameError,
  passwordError,
  captchaError,
  className = '',
  resetPasswordLink = '',
  resetPasswordText = 'Forgot password?',
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(e);
  };

  // Function to ensure links use the current page's base URL
  const getAbsoluteUrl = (url: string) => {
    if (!url) return '';
    
    // If the URL is already absolute, return it as is
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    
    // Get the current page's base URL
    const baseUrl = window.location.origin;
    
    // Ensure the URL starts with a slash
    const normalizedUrl = url.startsWith('/') ? url : `/${url}`;
    
    return `${baseUrl}${normalizedUrl}`;
  };

  return (
    <form onSubmit={handleSubmit} className={`auth0-form ${className}`}>
      <div className="auth0-input-group">
        {/* Username/Email Input */}
        <div className="auth0-input-wrapper">
          <FormField
            id="username"
            placeholder={usernamePlaceholder}
            type="text"
            autoComplete="username"
            required
            ref={usernameRef}
            error={usernameError}
          />
        </div>

        {/* Password Input */}
        <div className="auth0-input-wrapper">
          <FormField
            id="password"
            placeholder={passwordPlaceholder}
            type="password"
            autoComplete="current-password"
            required
            ref={passwordRef}
            error={passwordError}
            showPasswordToggle
          />
        </div>

        {/* Captcha */}
        {isCaptchaAvailable && captchaRef && (
          <div className="auth0-captcha">
            <div className="auth0-captcha-image">
              <img src={captchaImage} alt="Captcha" style={{ maxWidth: '100%', height: 'auto' }} />
            </div>
            <div className="auth0-input-wrapper">
              <FormField
                id="captcha"
                placeholder={captchaPlaceholder}
                type="text"
                required
                ref={captchaRef}
                error={captchaError}
              />
            </div>
          </div>
        )}
      </div>

      {/* Forgot Password Link */}
      {resetPasswordLink && (
        <div className="auth0-forgot-password">
          <a href={getAbsoluteUrl(resetPasswordLink)} className="auth0-link">
            {resetPasswordText}
          </a>
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

export default LoginForm; 