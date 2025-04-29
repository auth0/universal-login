import React from "react";
import { useLoginPasswordManager } from './hooks/useLoginPasswordManager';
import { useLoginPasswordForm } from './hooks/useLoginPasswordForm';
import ThemeProvider from "@/common/ThemeProvider";
import Logo from "@/common/Logo";
import LoginPasswordForm from "./components/LoginPasswordForm";
import ErrorMessages from "@/common/Alert";
import AuthScreenTemplate from "@/common/Layout";
import { navigateWithCurrentOrigin } from "@/utils/url";
import Input from "@/common/Input";
import SignupLink from "@/common/Link";

const LoginPasswordScreen: React.FC = () => {
  const {
    loginPasswordInstance,
    username,
    isCaptchaAvailable,
    captchaImage,
    signupLink,
    resetPasswordLink,
    editIdentifierLink,
    errors,
    handleLogin,
  } = useLoginPasswordManager();

  const { passwordRef, captchaRef, getFormValues } = useLoginPasswordForm();

  const onLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { password, captcha } = getFormValues();
    handleLogin({
      username,
      password,
      captcha: isCaptchaAvailable ? captcha : undefined,
    });
  };

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    path: string
  ) => {
    e.preventDefault();
    navigateWithCurrentOrigin(path);
  };

  // Extract text values with fallbacks
  const texts = loginPasswordInstance.screen?.texts || {};
  
  // Custom title that includes the username if available
  const screenTitle = username 
    ? (texts.title || 'Enter Your Password')
    : (texts.title || 'Enter Your Password');
  
  // Custom description
  const screenDescription = texts.description || 'Enter your password for React acul to continue to my acul react';

  // Prepare the form props
  const formProps = {
    passwordRef,
    captchaRef,
    onSubmit: onLoginSubmit,
    isLoading: false,
    isCaptchaAvailable,
    captchaImage,
    buttonText: texts.buttonText || "Continue",
    passwordPlaceholder: (texts.passwordPlaceholder || "Password") + "*",
    captchaPlaceholder:
      (texts.captchaCodePlaceholder || "Enter the code shown above") + "*",
    resetPasswordLink,
    resetPasswordText: texts.forgotPasswordText || "Forgot password?",
    onResetPasswordClick: handleLinkClick,
  };

  // Email input with Edit link
  const emailDisplay = username ? (
    <div className="mb-6">
      <div className="relative mb-4">
        <Input
          id="username"
          value={username}
          readOnly
          disabled
          className="pr-20 bg-gray-50 cursor-not-allowed"
        />
        <a
          href={editIdentifierLink || "#"}
          onClick={(e) => {
            e.preventDefault();
            if (editIdentifierLink) {
              navigateWithCurrentOrigin(editIdentifierLink);
            } else {
              window.history.back();
            }
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-[color:var(--color-links)] no-underline z-10"
          style={{ color: 'var(--color-links, #635dff)' }}
        >
          {texts.editEmailText || "Edit"}
        </a>
      </div>
    </div>
  ) : null;

  const errorMessages = errors ? <ErrorMessages errors={errors} /> : undefined;

  const formContent = (
    <>
      {emailDisplay}
      <LoginPasswordForm {...formProps} />
      {signupLink && (
        <SignupLink 
          signupLink={signupLink}
          signupText={texts.signupActionLinkText || 'Sign up'}
          footerText={texts.footerText || "Don't have an account?"}
          onLinkClick={handleLinkClick}
        />
      )}
    </>
  );

  return (
    <ThemeProvider instance={loginPasswordInstance}>
      <AuthScreenTemplate
        title={screenTitle}
        description={screenDescription}
        logo={<Logo instance={loginPasswordInstance} />}
        errorMessages={errorMessages}
        formContent={formContent}
        footerLinks={null}
      />
    </ThemeProvider>
  );
};

export default LoginPasswordScreen;
