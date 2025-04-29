import React from 'react';
import Button from '@/common/Button';
import Input from '@/common/Input';
import Captcha from '@/common/Captcha';

export interface LoginPasswordFormProps {
  passwordRef: React.RefObject<HTMLInputElement>;
  captchaRef: React.RefObject<HTMLInputElement>;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  isCaptchaAvailable?: boolean;
  captchaImage?: string;
  buttonText?: string;
  passwordPlaceholder?: string;
  captchaPlaceholder?: string;
  resetPasswordLink?: string;
  resetPasswordText?: string;
  onResetPasswordClick?: (e: React.MouseEvent<HTMLAnchorElement>, path: string) => void;
}

const LoginPasswordForm: React.FC<LoginPasswordFormProps> = ({
  passwordRef,
  captchaRef,
  onSubmit,
  isLoading,
  isCaptchaAvailable = false,
  captchaImage = '',
  buttonText = 'Continue',
  passwordPlaceholder = 'Password',
  captchaPlaceholder = 'Enter the code shown above',
  resetPasswordLink,
  resetPasswordText = 'Forgot password?',
  onResetPasswordClick
}) => {
  return (
    <form onSubmit={onSubmit} className="w-full space-y-4">
      <div className="mb-4">
        <Input
          id="password"
          placeholder={passwordPlaceholder}
          type="password"
          autoComplete="current-password"
          autoFocus
          required
          showPasswordToggle
          {...{ ref: passwordRef } as any}
        />
      </div>

      {isCaptchaAvailable && captchaImage && (
        <div className="mb-4">
          <Captcha
            captchaImage={captchaImage}
            captchaRef={captchaRef}
            placeholder={captchaPlaceholder}
          />
        </div>
      )}

      {resetPasswordLink && resetPasswordText && (
        <div className="text-left mb-6">
          <a
            href={resetPasswordLink}
            onClick={(e) => onResetPasswordClick ? onResetPasswordClick(e, resetPasswordLink) : undefined}
            className="text-sm font-medium text-[color:var(--color-links)] no-underline hover:underline"
          >
            {resetPasswordText}
          </a>
        </div>
      )}

      <div className="pt-1 pb-3 w-full">
        <Button
          type="submit"
          variant="primary"
          fullWidth
          isLoading={isLoading}
          className="bg-[#6a0000] border-[#6a0000] text-white"
        >
          {buttonText}
        </Button>
      </div>
    </form>
  );
};

export default LoginPasswordForm; 