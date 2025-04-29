import { useState } from 'react';
import LoginPasswordInstance from '@auth0/auth0-acul-js/login-password';

export const useLoginPasswordManager = () => {
  const [loginPasswordInstance] = useState(() => new LoginPasswordInstance());

  const username = loginPasswordInstance.screen?.data?.username || '';
  const isCaptchaAvailable = !!loginPasswordInstance.screen?.captcha;
  const captchaImage = loginPasswordInstance.screen?.captcha?.image || '';
  const screenLinks = loginPasswordInstance.screen?.links || {};
  const signupLink = screenLinks?.signup || '';
  const resetPasswordLink = screenLinks?.reset_password || '';
  const editIdentifierLink = screenLinks?.edit_identifier || '';
  const errors = loginPasswordInstance.transaction?.hasErrors ? loginPasswordInstance.transaction.errors : null;

  const handleLogin = (options: { username: string; password: string; captcha?: string }) => {
    loginPasswordInstance.login(options);
  };

  return {
    loginPasswordInstance,
    username,
    isCaptchaAvailable,
    captchaImage,
    signupLink,
    resetPasswordLink,
    editIdentifierLink,
    errors,
    handleLogin
  };
}; 