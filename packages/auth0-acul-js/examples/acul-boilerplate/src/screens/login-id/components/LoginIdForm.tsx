import React from 'react';
import Button from '@/common/Button';
import Input from '@/common/Input';
import { navigateWithCurrentOrigin } from '@/utils/url';
import Captcha from '@/common/Captcha';

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
  className = '',
  forgotPasswordLink = '#',
  forgotPasswordText = "Can't log in to your account?"
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <form onSubmit={handleSubmit} className={`w-full space-y-4 ${className}`}> 
      <Input
        id="login-id"
        placeholder={loginIdPlaceholder}
        type="text"
        autoComplete="username email"
        required
        error={loginIdError}
        ref={loginIdRef}
      />

      {isCaptchaAvailable && (
        <Captcha
          captchaImage={captchaImage}
          captchaRef={captchaRef!} 
          placeholder={captchaPlaceholder}
        />
      )}

      {forgotPasswordLink && forgotPasswordText && (
        <div className="pt-2 text-left text-sm">
          <a href={forgotPasswordLink} onClick={(e) => {
            e.preventDefault();
            navigateWithCurrentOrigin(forgotPasswordLink);
          }}
             className="font-semibold text-[color:var(--color-links)] no-underline hover:underline"
          >
            {forgotPasswordText}
          </a>
        </div>
      )}

      <div className="pt-2">
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