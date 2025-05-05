import React from "react";
import { useLoginIdManager } from "./hooks/useLoginIdManager";
import { useLoginIdForm } from "./hooks/useLoginIdForm";
import AuthScreenTemplate from "@/common/Layout";
import ThemeProvider from "@/common/ThemeProvider";
import Logo from "@/common/Logo";
import LoginIdForm from "./components/LoginIdForm";
import ErrorMessages from "@/common/Alert";
import SignupLink from "@/common/Link";
import SocialLoginGroup, { type Connection } from "@/common/AuthenticationAlternatives";
import { navigateWithCurrentOrigin } from "@/utils/url";
import { getDynamicPlaceholder } from "@/utils/dynamicText";

interface LoginIdConnection {
  name: string;
  display_name?: string;
  logo_url?: string;
  [key: string]: any;
}

const LoginIdScreen: React.FC = () => {
  const { loginIdInstance, handleLoginId, handleSocialLogin, handlePasskeyLogin } = useLoginIdManager();
  const { loginIdRef, captchaRef, getFormValues } = useLoginIdForm();
  const onContinueClick = (e: React.FormEvent) => {
    e.preventDefault();
    const { loginId, captcha } = getFormValues();
    handleLoginId(loginId, captcha);
  };

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    path: string
  ) => {
    e.preventDefault();
    navigateWithCurrentOrigin(path);
  };

  const texts = loginIdInstance.screen?.texts || {};
  const transactionData = loginIdInstance.transaction || {};
  const isCaptchaAvailable = !!loginIdInstance.screen?.captcha;
  const captchaImage = loginIdInstance.screen?.captcha?.image || "";
  const connections = (transactionData.alternateConnections ||
    []) as LoginIdConnection[];
  const signupLink = loginIdInstance.screen?.links?.signup || "";
  const resetPasswordLink = loginIdInstance.screen?.links?.reset_password || "";
  const errors = transactionData.errors || [];
  const hasErrors = !!transactionData.hasErrors;
  const allowedIdentifiers = transactionData.allowedIdentifiers || [];
  const isPasskeyEnabled = !!transactionData.isPasskeyEnabled;
  
  // Safely access passkey public key
  const hasPublicKey = !!(
    loginIdInstance.screen?.data?.passkey && 
    typeof loginIdInstance.screen.data.passkey === 'object' && 
    'public_key' in loginIdInstance.screen.data.passkey
  );
      
  const showPasskeyButton = isPasskeyEnabled && hasPublicKey;

  // Use the utility function for login ID placeholder
  const loginIdPlaceholder = getDynamicPlaceholder(allowedIdentifiers, texts);

  const formProps = {
    loginIdRef,
    captchaRef,
    onSubmit: onContinueClick,
    isLoading: false,
    isCaptchaAvailable,
    captchaImage,
    buttonText: texts.buttonText || "Continue",
    loginIdPlaceholder,
    captchaPlaceholder:
      (texts.captchaCodePlaceholder || "Enter the code shown above") + '*',
    forgotPasswordLink: resetPasswordLink,
    forgotPasswordText: texts.forgotPasswordText || "Can't log in to your account?"
  };

  const errorMessages = hasErrors ? (
    <ErrorMessages errors={errors} />
  ) : undefined;

  const formContent = (
    <>
      <LoginIdForm {...formProps} />
      {signupLink && (
        <SignupLink
          signupLink={signupLink}
          signupText={texts.signupActionLinkText || "Sign up"}
          footerText={texts.footerText || "Don't have an account?"}
          onLinkClick={handleLinkClick}
        />
      )}
      {connections.length > 0 && (
        <SocialLoginGroup
          connections={connections.map((conn) => ({
            name: conn.name,
            display_name: conn.display_name,
            icon_url: conn.logo_url,
          })) as Connection[]}
          onSocialLogin={(connection: Connection) => handleSocialLogin(connection.name)}
          separatorText={texts.separatorText}
          showPasskeyButton={showPasskeyButton}
          onPasskeyClick={handlePasskeyLogin}
          passkeyButtonText={texts.passkeyButtonText}
        />
      )}
    </>
  );

  return (
    <ThemeProvider instance={loginIdInstance}>
      <AuthScreenTemplate
        title={texts.title}
        description={texts.description}
        logo={<Logo instance={loginIdInstance} />}
        errorMessages={errorMessages}
        formContent={formContent}
        footerLinks={null}
      />
    </ThemeProvider>
  );
};

export default LoginIdScreen;