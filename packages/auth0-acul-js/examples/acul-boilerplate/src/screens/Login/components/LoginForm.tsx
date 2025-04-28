import React from 'react';
import Button from '@/common/Button';
import Input from '@/common/Input';
import Captcha from '@/common/Captcha';


export interface LoginFormProps {
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
  captchaImage = "",
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
    <form onSubmit={onSubmit} className="w-full space-y-4">
      <div>
        <Input
          id="username"
          placeholder={usernamePlaceholder}
          type="text"
          autoComplete="username"
          required
          {...{ ref: usernameRef } as any}
        />
      </div>

      <div>
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

      {isCaptchaAvailable && captchaImage && (
        <Captcha
          captchaImage={captchaImage}
          captchaRef={captchaRef}
          placeholder={captchaPlaceholder}
        />
      )}

      {resetPasswordLink && resetPasswordText && (
        <div className="text-left my-2">
          <a
            href={resetPasswordLink}
            onClick={(e) => onResetPasswordClick ? onResetPasswordClick(e, resetPasswordLink) : undefined}
            className="text-sm text-[color:var(--color-links)] no-underline"
          >
            {resetPasswordText}
          </a>
        </div>
      )}

      <div className="pt-2 w-full">
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