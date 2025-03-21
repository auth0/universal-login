import React from 'react';
import LoginForm, { LoginFormProps } from '../../organisms/LoginForm';
import SocialLoginGroup, { SocialLoginGroupProps } from '../../organisms/SocialLoginGroup';
import './LoginTemplate.css';

export interface LoginTemplateProps {
  title?: string;
  description?: string;
  logo?: React.ReactNode;
  formProps: LoginFormProps;
  socialLoginProps?: SocialLoginGroupProps;
  footerLinks?: React.ReactNode;
  errorMessages?: React.ReactNode;
  className?: string;
}

const LoginTemplate: React.FC<LoginTemplateProps> = ({
  title,
  description,
  logo,
  formProps,
  socialLoginProps,
  footerLinks,
  errorMessages,
  className = '',
}) => {
  return (
    <div className="auth0-universal-login">
      <div className={`auth0-widget-container ${className}`}>
        <div className="auth0-widget-content">
          <div className="auth0-header">
            {logo && (
              <div className="auth0-logo">
                {logo}
              </div>
            )}
            
            {(title || description) && (
              <>
                {title && (
                  <div className="auth0-title">
                    <h1>{title}</h1>
                  </div>
                )}
                {description && (
                  <div className="auth0-description">
                    <p>{description}</p>
                  </div>
                )}
              </>
            )}
          </div>
          
          <div className="auth0-form-container">
            {errorMessages && (
              <div className="auth0-error-messages">
                {errorMessages}
              </div>
            )}
            
            <LoginForm {...formProps} />
            
            {socialLoginProps && <SocialLoginGroup {...socialLoginProps} />}

          </div>
          
          {footerLinks && (
            <div className="auth0-alternate-action">
              {footerLinks}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginTemplate; 