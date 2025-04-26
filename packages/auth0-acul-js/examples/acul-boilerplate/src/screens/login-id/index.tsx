import React, { useMemo } from "react";
import { useLoginIdManager } from './hooks/useLoginIdManager';
import { useLoginIdForm } from './hooks/useLoginIdForm';
import ThemeProvider from '../../components/ThemeProvider';
import Logo from '../../components/Logo';
import SignupLink from '../../components/Link/SignupLink';
import LoginIdForm, { LoginIdFormProps } from './components/LoginIdForm';
import ErrorMessages from '../../components/Alert/ErrorMessages';
import AuthScreenTemplate from '../../components/Layout/AuthScreen';
import SocialButton from "../../components/SocialButton";
import { navigateWithCurrentOrigin } from '../../utils/url';

// Define the type for connection objects
interface Connection {
  name: string;
  display_name?: string;
  logo_url?: string;
  strategy?: string;
}

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

  // Get alternative connections (social logins)
  const alternateConnections = transactionData.alternateConnections || [];
  const showSocialLogins = alternateConnections.length > 0;
  
  // Show the separator if passkey or social logins are available
  const showSeparator = showPasskeyButton || showSocialLogins;
  
  // Determine the login ID placeholder based on allowed identifiers
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
    
    return placeholderMap[key as keyof typeof placeholderMap].concat('*') || placeholderMap.default.concat('*');
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
    showPasskeyButton: false, // Rendering passkey button separately outside the form
    forgotPasswordLink: resetPasswordLink,
    forgotPasswordText: texts.forgotPasswordText || "Can't log in to your account?"
  };
  
  // Handler for signup link click
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    navigateWithCurrentOrigin(path);
  };

  const errorMessages = hasErrors ? <ErrorMessages errors={errors} /> : undefined;

  // Alternative authentication options (passkey and social logins)
  const alternativeOptions = (
    <>
      {showSeparator && (
        <div className="auth0-separator" data-testid="auth0-separator">
          <div className="auth0-separator-line"></div>
          <span className="auth0-separator-text">{texts.separatorText || 'OR'}</span>
          <div className="auth0-separator-line"></div>
        </div>
      )}
      
      {showPasskeyButton && (
        <div className="auth0-alternate-button-container" data-testid="passkey-button-container">
          <button 
            type="button"
            className="auth0-button auth0-button-secondary auth0-button-fullwidth"
            onClick={handlePasskeyLogin}
            data-testid="passkey-button"
          >
            {texts.passkeyButtonText || 'Continue with a passkey'}
          </button>
        </div>
      )}
      
      {showSocialLogins && (
        <div className="auth0-social-buttons" data-testid="social-buttons-container">
          {alternateConnections.map((connection: Connection) => (
            <SocialButton
              key={connection.name}
              provider={connection.name}
              displayName={connection.display_name || connection.name}
              iconUrl={connection.logo_url}
              onClick={() => handleSocialLogin(connection.name)}
              data-testid={`social-button-${connection.name}`}
            />
          ))}
        </div>
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
            {alternativeOptions}
          </>
        }
        footerLinks={null}
      />
    </ThemeProvider>
  );
};

export default LoginIdScreen;