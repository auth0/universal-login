import { useState } from 'react';
import LoginIdInstance from "@auth0/auth0-acul-js/login-id";
import { withWindowDebug, debugLog } from "../../../utils/window-debugger";

export const useLoginIdManager = () => {
  const [loginIdInstance] = useState(() => new LoginIdInstance());
  withWindowDebug(loginIdInstance, 'login-id');
  debugLog('Login ID manager state', loginIdInstance);

  const handleLoginId = (loginId: string, captcha?: string): void => {
    const options = {
      username: loginId,
      captcha: loginIdInstance.screen?.captcha ? captcha : "",
    };
    loginIdInstance.login(options);
  };

  const handleSocialLogin = (connectionName: string) => {
    loginIdInstance.socialLogin({ connection: connectionName });
  };

  const handlePasskeyLogin = () => {
    const hasPasskeyData = !!loginIdInstance.screen?.data?.passkey;
    if (hasPasskeyData) {
      loginIdInstance.passkeyLogin();
    }
  };

  return {
    loginIdInstance,
    handleLoginId,
    handleSocialLogin,
    handlePasskeyLogin
  };
}; 