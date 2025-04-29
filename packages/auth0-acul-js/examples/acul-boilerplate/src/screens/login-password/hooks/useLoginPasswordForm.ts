import { useRef } from 'react';

export const useLoginPasswordForm = () => {
  const passwordRef = useRef<HTMLInputElement>(null) as React.RefObject<HTMLInputElement>;
  const captchaRef = useRef<HTMLInputElement>(null) as React.RefObject<HTMLInputElement>;

  const getFormValues = () => ({
    password: passwordRef.current?.value ?? '',
    captcha: captchaRef.current?.value ?? '',
  });

  return {
    passwordRef,
    captchaRef,
    getFormValues,
  };
}; 