import React from "react";
import { useLoginManager } from "./hooks/useLoginManager";
import { useLoginForm } from "./hooks/useLoginForm";
import ThemeProvider from "@/common/ThemeProvider";
import Logo from "@/common/Logo";
import SignupLink from "@/common/Link";
import LoginForm from "./components/LoginForm";
import SocialLoginGroup, { type Connection } from "@/common/AuthenticationAlternatives";
import ErrorMessages from "@/common/Alert";
import AuthScreenTemplate from "@/common/Layout";
import { navigateWithCurrentOrigin } from "@/utils/url";

interface LoginConnection {
  name: string;
  display_name?: string;
  logo_url?: string;
  [key: string]: any;
}

const LoginScreen: React.FC = () => {
  const { loginInstance, handleLogin, handleSocialLogin } = useLoginManager();
  const { usernameRef, passwordRef, captchaRef, getFormValues } =
    useLoginForm();

  const onLoginClick = (e: React.FormEvent) => {
    e.preventDefault();
    const { username, password, captcha } = getFormValues();
    handleLogin(username, password, captcha);
  };

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    path: string
  ) => {
    e.preventDefault();
    navigateWithCurrentOrigin(path);
  };

  const texts = loginInstance.screen?.texts || {};
  const isCaptchaAvailable = !!loginInstance.screen?.captcha;
  const captchaImage = loginInstance.screen?.captcha?.image || "";
  const connections = (loginInstance.transaction?.alternateConnections ||
    []) as LoginConnection[];
  const signupLink = loginInstance.screen?.links?.signup || "";
  const resetPasswordLink = loginInstance.screen?.links?.reset_password || "123";
  const errors = loginInstance.transaction?.errors || [];
  const hasErrors = !!loginInstance.transaction?.hasErrors;

  const formProps = {
    usernameRef,
    passwordRef,
    captchaRef,
    onSubmit: onLoginClick,
    isLoading: false,
    isCaptchaAvailable,
    captchaImage,
    buttonText: texts.buttonText || "Continue",
    usernamePlaceholder:
      texts.usernameOrEmailPlaceholder ||
      texts.phoneOrUsernameOrEmailPlaceholder ||
      "Username or Email",
    passwordPlaceholder: texts.passwordPlaceholder || "Password",
    captchaPlaceholder:
      texts.captchaCodePlaceholder || "Enter the code shown above",
    resetPasswordLink,
    resetPasswordText: texts.forgotPasswordText || "Forgot password?",
    onResetPasswordClick: handleLinkClick,
  };

  const errorMessages = hasErrors ? (
    <ErrorMessages errors={errors} />
  ) : undefined;

  const formContent = (
    <>
      <LoginForm {...formProps} />
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
          showPasskeyButton={false}
          onPasskeyClick={undefined}
          passkeyButtonText={undefined}
        />
      )}
    </>
  );

  return (
    <ThemeProvider instance={loginInstance}>
      <AuthScreenTemplate
        title={texts.title}
        description={texts.description}
        logo={<Logo instance={loginInstance} />}
        errorMessages={errorMessages}
        formContent={formContent}
        footerLinks={null}
      />
    </ThemeProvider>
  );
};

export default LoginScreen;
