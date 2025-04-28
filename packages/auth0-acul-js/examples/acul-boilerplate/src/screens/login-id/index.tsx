import React, { useMemo } from "react";
import { useLoginIdManager } from './hooks/useLoginIdManager';
import { useLoginIdForm } from './hooks/useLoginIdForm';
import ThemeProvider from '@/common/ThemeProvider';
import Logo from '@/common/Logo';
import SignupLink from '@/common/Link';
import LoginIdForm, { LoginIdFormProps } from './components/LoginIdForm';
import ErrorMessages from '@/common/Alert';
import AuthScreenTemplate from '@/common/Layout';
import SocialLoginGroup from '@/common/AuthenticationAlternatives';
import { navigateWithCurrentOrigin } from '@/utils/url';

const LoginIdScreen: React.FC = () => {
  const { loginIdInstance, handleLoginId, handlePasskeyLogin, handleSocialLogin } = useLoginIdManager();
  const { loginIdRef, captchaRef, getFormValues } = useLoginIdForm();

  const onLoginIdSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Get form values
    const formValues = getFormValues();
    
    // Check if loginId exists before proceeding
    if (!formValues.loginId) {
      return;
    }
    
    const { loginId, captcha } = formValues;
    handleLoginId(loginId, captcha);
  };

  // Extract data from loginIdInstance with safe access
  const texts = loginIdInstance.screen?.texts || {};
  const screenData = loginIdInstance.screen || {};
  const transactionData = loginIdInstance.transaction || {};
  
  // Extract configuration values
  const isCaptchaAvailable = Boolean(screenData.captcha);
  const captchaImage = screenData.captcha?.image || '';
  const signupLink = screenData.links?.signup || '';
  const resetPasswordLink = screenData.links?.reset_password || '';
  const errors = transactionData.errors || [];
  const hasErrors = Boolean(transactionData.hasErrors);
  const isPasskeyEnabled = Boolean(transactionData.isPasskeyEnabled);
  
  // Safely access passkey public key
  const hasPublicKey = Boolean(
    screenData.data?.passkey && 
    typeof screenData.data.passkey === 'object' && 
    'public_key' in screenData.data.passkey
  );
    
  const showPasskeyButton = isPasskeyEnabled && hasPublicKey;

  const loginIdPlaceholder = useMemo(() => {
    const allowedIdentifiers = transactionData.allowedIdentifiers || [];
    
    // Create a map of identifier combinations to placeholders
    const placeholderMap = {
      'email,phone,username': texts.phoneOrUsernameOrEmailPlaceholder || 'Phone or Username or Email',
      'email,phone': texts.phoneOrEmailPlaceholder || 'Phone number or Email address',
      'phone,username': texts.phoneOrUsernamePlaceholder || 'Phone Number or Username',
      'email,username': texts.usernameOrEmailPlaceholder || 'Username or Email address',
      'email': texts.emailPlaceholder || 'Email address',
      'phone': texts.phonePlaceholder || 'Phone number',
      'username': texts.usernameOnlyPlaceholder || 'Username',
      'default': 'Enter your login ID'
    };
    
    // Sort identifiers to create a consistent key
    const key = [...allowedIdentifiers].sort().join(',');
    
    return placeholderMap[key as keyof typeof placeholderMap]?.concat('*') || placeholderMap.default.concat('*');
  }, [transactionData.allowedIdentifiers, texts]);

  // Prepare props for LoginIdForm using explicit type
  const formProps: LoginIdFormProps = {
    loginIdRef,
    captchaRef,
    onSubmit: onLoginIdSubmit,
    isLoading: false,
    isCaptchaAvailable,
    captchaImage,
    buttonText: texts.buttonText || 'Continue',
    loginIdPlaceholder,
    captchaPlaceholder: texts.captchaCodePlaceholder || 'Enter the code shown above',
    showPasskeyButton: false, 
    forgotPasswordLink: resetPasswordLink,
    forgotPasswordText: texts.forgotPasswordText || "Can't log in to your account?"
  };
  
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    navigateWithCurrentOrigin(path);
  };

  const errorMessages = hasErrors ? <ErrorMessages errors={errors} /> : undefined;

  return (
    <ThemeProvider instance={loginIdInstance}>
      <AuthScreenTemplate
        title={texts.title}
        description={texts.description}
        logo={<Logo instance={loginIdInstance} />}
        errorMessages={errorMessages}
        formContent={
          <>
            <LoginIdForm {...formProps} />
            {signupLink && (
              <SignupLink 
                signupLink={signupLink}
                signupText={texts.signupActionLinkText || 'Sign up'}
                footerText={texts.footerText || "Don't have an account?"}
                onLinkClick={handleLinkClick}
              />
            )}
            <SocialLoginGroup
              connections={transactionData.alternateConnections || []}
              onSocialLogin={(conn) => handleSocialLogin(conn.name)}
              separatorText={texts.separatorText}
              showPasskeyButton={showPasskeyButton}
              onPasskeyClick={handlePasskeyLogin}
              passkeyButtonText={texts.passkeyButtonText}
            />
          </>
        }
        footerLinks={null}
      />
    </ThemeProvider>
  );
};

export default LoginIdScreen;