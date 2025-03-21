import { useState } from 'react';
import LoginInstance from "@auth0/auth0-acul-js/login";
import { withWindowDebug, debugLog } from "../../../utils/window-debugger";

export const useLoginManager = () => {
  const [loginInstance] = useState(() => new LoginInstance());
  withWindowDebug(loginInstance, 'login');
  // For one-time logging without attaching to window
  debugLog('Login manager state', loginInstance);

  const handleLogin = (username: string, password: string, captcha: string): void => {
    const options = {
      username,
      password,
      captcha: loginInstance.screen?.captcha ? captcha : "",
    };
    loginInstance.login(options);
  };

  const handleSocialLogin = (connectionName: string) => {
    loginInstance.socialLogin({ connection: connectionName });
  };

  return {
    loginInstance,
    handleLogin,
    handleSocialLogin
  };
};