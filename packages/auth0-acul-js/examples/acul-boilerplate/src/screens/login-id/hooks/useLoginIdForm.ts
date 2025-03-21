import { useRef } from 'react';

export const useLoginIdForm = () => {
  const loginIdRef = useRef<HTMLInputElement>(null) as React.RefObject<HTMLInputElement>;
  const captchaRef = useRef<HTMLInputElement>(null) as React.RefObject<HTMLInputElement>;

  const getFormValues = () => ({
    loginId: loginIdRef.current?.value ?? "",
    captcha: captchaRef.current?.value ?? "",
  });

  return {
    loginIdRef,
    captchaRef,
    getFormValues,
  };
}; 