import React from 'react';
import './AuthScreen.css';

export interface AuthScreenTemplateProps {
  title?: string;
  description?: string;
  logo?: React.ReactNode;
  errorMessages?: React.ReactNode;
  formContent: React.ReactNode;
  footerLinks?: React.ReactNode;
  className?: string;
}

/**
 * A generic authentication screen template that can be used for login, login-id,
 * and other authentication flows. This provides consistent layout and styling
 * across different authentication screens.
 */
const AuthScreenTemplate: React.FC<AuthScreenTemplateProps> = ({
  title,
  description,
  logo,
  errorMessages,
  formContent,
  footerLinks,
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
            
            {formContent}
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

export default AuthScreenTemplate; 