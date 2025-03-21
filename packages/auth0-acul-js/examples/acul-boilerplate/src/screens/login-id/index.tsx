import React from "react";
import { useLoginIdManager } from './hooks/useLoginIdManager';
import { useLoginIdForm } from './hooks/useLoginIdForm';
import ThemeProvider from '../../components/common/ThemeProvider';
import Logo from '../../components/common/Logo';
import LoginIdForm from './components/LoginIdForm';
import Links from './components/Links';
import ErrorMessages from './components/ErrorMessages';
import AuthScreenTemplate from '../../components/templates/AuthScreen';

const LoginIdScreen: React.FC = () => {
  const { loginIdInstance, handleLoginId, handlePasskeyLogin } = useLoginIdManager();
  const { loginIdRef, captchaRef, getFormValues } = useLoginIdForm();

  const onLoginIdSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { loginId, captcha } = getFormValues();
    handleLoginId(loginId, captcha);
  };

  // Extract texts and configuration from loginIdInstance
  const texts = loginIdInstance.screen?.texts || {};
  const isCaptchaAvailable = !!loginIdInstance.screen?.captcha;
  const captchaImage = loginIdInstance.screen?.captcha?.image || '';
  const signupLink = loginIdInstance.screen?.links?.signup || '';
  const resetPasswordLink = loginIdInstance.screen?.links?.reset_password || '';
  // We'll use window.location.origin in the component instead
  const errors = loginIdInstance.transaction?.errors || [];
  const hasErrors = !!loginIdInstance.transaction?.hasErrors;
  const isPasskeyEnabled = !!loginIdInstance.transaction?.isPasskeyEnabled;
  
  // Safely access passkey public key to avoid type errors
  const hasPublicKey = !!loginIdInstance.screen?.data?.passkey && 
    typeof loginIdInstance.screen.data.passkey === 'object' && 
    'public_key' in loginIdInstance.screen.data.passkey;
    
  const showPasskeyButton = isPasskeyEnabled && hasPublicKey;

  // Determine the right placeholder for loginId input
  const getLoginIdPlaceholder = () => {
    const allowedIdentifiers = loginIdInstance.transaction?.allowedIdentifiers || [];
    
    if (allowedIdentifiers.includes('email') && allowedIdentifiers.includes('phone') && allowedIdentifiers.includes('username')) {
      return texts.phoneOrUsernameOrEmailPlaceholder || 'Phone or Username or Email';
    }
    
    if (allowedIdentifiers.includes('email') && allowedIdentifiers.includes('phone')) {
      return texts.phoneOrEmailPlaceholder || 'Phone number or Email address';
    }
    
    if (allowedIdentifiers.includes('phone') && allowedIdentifiers.includes('username')) {
      return texts.phoneOrUsernamePlaceholder || 'Phone Number or Username';
    }
    
    if (allowedIdentifiers.includes('email') && allowedIdentifiers.includes('username')) {
      return texts.usernameOrEmailPlaceholder || 'Username or Email address';
    }
    
    if (allowedIdentifiers.includes('email')) {
      return texts.emailPlaceholder || 'Email address';
    }
    
    if (allowedIdentifiers.includes('phone')) {
      return texts.phonePlaceholder || 'Phone number';
    }
    
    if (allowedIdentifiers.includes('username')) {
      return texts.usernameOnlyPlaceholder || 'Username';
    }
    
    return 'Enter your login ID';
  };

  console.log('Debug texts:', texts); // Debug log to check available texts

  // Prepare props for LoginIdForm
  const formProps = {
    loginIdRef,
    captchaRef,
    onSubmit: onLoginIdSubmit,
    isLoading: false,
    isCaptchaAvailable,
    captchaImage,
    buttonText: texts.buttonText || 'Continue',
    loginIdPlaceholder: getLoginIdPlaceholder(),
    captchaPlaceholder: texts.captchaCodePlaceholder || 'Enter the code shown above',
    showPasskeyButton,
    onPasskeyClick: handlePasskeyLogin,
    passkeyButtonText: texts.passkeyButtonText || 'Continue with a passkey',
    forgotPasswordLink: resetPasswordLink,
    forgotPasswordText: texts.forgotPasswordText || "Can't log in to your account?"
  };

  const footerLinks = (
    <Links
      signupLink={signupLink}
      signupText={texts.signupActionLinkText || 'Sign up'}
      footerText={texts.footerText}
    />
  );

  const errorMessages = hasErrors ? <ErrorMessages errors={errors} /> : undefined;

  return (
    <ThemeProvider instance={loginIdInstance}>
      <AuthScreenTemplate
        title={texts.title}
        description={texts.description}
        logo={<Logo instance={loginIdInstance} />}
        errorMessages={errorMessages}
        formContent={<LoginIdForm {...formProps} />}
        footerLinks={footerLinks}
      />
    </ThemeProvider>
  );
};

export default LoginIdScreen;