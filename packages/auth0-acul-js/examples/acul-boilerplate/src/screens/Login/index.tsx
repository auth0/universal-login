import React from "react";
import { useLoginManager } from "./hooks/useLoginManager";
import { useLoginForm } from "./hooks/useLoginForm";
import ThemeProvider from "../../components/common/ThemeProvider";
import Logo from "../../components/common/Logo";
import SignupLink from "../../components/common/SignupLink";
import LoginForm from "./components/LoginForm";
import SocialLoginGroup, {
  Connection,
} from "../../components/organisms/SocialLoginGroup";
import ErrorMessages from "./components/ErrorMessages";
import AuthScreenTemplate from "../../components/templates/AuthScreen";
import { navigateWithCurrentOrigin } from "../../utils/url";

// Define the type for the connections from loginInstance
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

  // Handle link click (works for both reset password and signup links)
  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    path: string
  ) => {
    e.preventDefault();
    navigateWithCurrentOrigin(path);
  };

  // Extract texts from loginInstance
  const texts = loginInstance.screen?.texts || {};
  const isCaptchaAvailable = !!loginInstance.screen?.captcha;
  const captchaImage = loginInstance.screen?.captcha?.image || "";
  const connections = (loginInstance.transaction?.alternateConnections ||
    []) as LoginConnection[];
  const signupLink = loginInstance.screen?.links?.signup || "";
  const resetPasswordLink = loginInstance.screen?.links?.reset_password || "";
  const errors = loginInstance.transaction?.errors || [];
  const hasErrors = !!loginInstance.transaction?.hasErrors;

  // Prepare props for LoginForm
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
    passwordPlaceholder: texts.passwordPlaceholder.concat("test") || "Password",
    captchaPlaceholder:
      texts.captchaCodePlaceholder || "Enter the code shown above",
    resetPasswordLink,
    resetPasswordText: texts.forgotPasswordText || "Forgot password?",
    onResetPasswordClick: handleLinkClick,
  };

  const socialLoginProps =
    connections.length > 0
      ? {
          connections: connections.map((conn) => ({
            name: conn.name,
            display_name: conn.display_name || conn.name,
            icon_url: conn.logo_url,
          })) as Connection[],
          onSocialLogin: (connection: Connection) =>
            handleSocialLogin(connection.name),
          separatorText: texts.separatorText,
          labelTemplate: (name: string) => `Continue with ${name}`,
        }
      : undefined;

  const errorMessages = hasErrors ? (
    <ErrorMessages errors={errors} />
  ) : undefined;

  // Render form content with social login options if available
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
      {socialLoginProps && <SocialLoginGroup {...socialLoginProps} />}
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
