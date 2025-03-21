import { useRef } from 'react';

export const useLoginForm = () => {
  const usernameRef = useRef<HTMLInputElement>(null) as React.RefObject<HTMLInputElement>;
  const passwordRef = useRef<HTMLInputElement>(null) as React.RefObject<HTMLInputElement>;
  const captchaRef = useRef<HTMLInputElement>(null) as React.RefObject<HTMLInputElement>;

  const getFormValues = () => ({
    username: usernameRef.current?.value ?? "",
    password: passwordRef.current?.value ?? "",
    captcha: captchaRef.current?.value ?? "",
  });

  return {
    usernameRef,
    passwordRef,
    captchaRef,
    getFormValues,
  };
};