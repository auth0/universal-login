import React from "react";
import { useLoginManager } from './hooks/useLoginManager';
import { useLoginForm } from './hooks/useLoginForm';
import ThemeProvider from '../../components/common/ThemeProvider';
import Logo from '../../components/common/Logo';
import LoginTemplate from '../../components/templates/LoginTemplate';
import Links from './components/Links';
import ErrorMessages from './components/ErrorMessages';
import { Connection } from '../../components/organisms/SocialLoginGroup';

// Define the type for the connections from loginInstance
interface LoginConnection {
  name: string;
  display_name?: string;
  logo_url?: string;
  [key: string]: any;
}

const LoginScreen: React.FC = () => {
  const { loginInstance, handleLogin, handleSocialLogin } = useLoginManager();
  const { usernameRef, passwordRef, captchaRef, getFormValues } = useLoginForm();

  const onLoginClick = (e: React.FormEvent) => {
    e.preventDefault();
    const { username, password, captcha } = getFormValues();
    handleLogin(username, password, captcha);
  };

  // Extract texts from loginInstance
  const texts = loginInstance.screen?.texts || {};
  const isCaptchaAvailable = !!loginInstance.screen?.captcha;
  const captchaImage = loginInstance.screen?.captcha?.image || '';
  const connections = (loginInstance.transaction?.alternateConnections || []) as LoginConnection[];
  const signupLink = loginInstance.screen?.links?.signup || '';
  const resetPasswordLink = loginInstance.screen?.links?.reset_password || '';
  const errors = loginInstance.transaction?.errors || [];
  const hasErrors = !!loginInstance.transaction?.hasErrors;

  // Prepare props for LoginTemplate
  const formProps = {
    usernameRef,
    passwordRef,
    captchaRef,
    onSubmit: onLoginClick,
    isLoading: false,
    isCaptchaAvailable,
    captchaImage,
    buttonText: texts.buttonText,
    usernamePlaceholder: texts.usernameOrEmailPlaceholder || texts.phoneOrUsernameOrEmailPlaceholder || 'Username or Email',
    passwordPlaceholder: texts.passwordPlaceholder,
    captchaPlaceholder: texts.captchaCodePlaceholder,
    resetPasswordLink: resetPasswordLink,
    resetPasswordText: texts.forgotPasswordText,
  };

  const socialLoginProps = connections.length > 0 ? {
    connections: connections.map(conn => ({
      name: conn.name,
      display_name: conn.display_name || conn.name,
      icon_url: conn.logo_url,
    })) as Connection[],
    onSocialLogin: (connection: Connection) => handleSocialLogin(connection.name),
    separatorText: texts.separatorText,
    labelTemplate: (name: string) => `Continue with ${name}`,
  } : undefined;

  const footerLinks = (
    <Links
      signupLink={signupLink}
      signupText={texts.signupActionLinkText}
      footerText={texts.footerText}
    />
  );

  const errorMessages = hasErrors ? <ErrorMessages errors={errors} /> : undefined;

  return (
    <ThemeProvider instance={loginInstance}>
      <LoginTemplate
        title={texts.title}
        description={texts.description}
        logo={<Logo instance={loginInstance} />}
        formProps={formProps}
        socialLoginProps={socialLoginProps}
        footerLinks={footerLinks}
        errorMessages={errorMessages}
      />
    </ThemeProvider>
  );
};

export default LoginScreen;