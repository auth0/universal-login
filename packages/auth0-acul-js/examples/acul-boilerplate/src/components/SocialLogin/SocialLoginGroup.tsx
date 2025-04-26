import React from 'react';
import SocialButton from '../SocialButton';
import { SocialProvider } from '../SocialIcon';

export interface Connection {
  name: SocialProvider;
  display_name?: string;
  icon_url?: string;
}

export interface SocialLoginGroupProps {
  connections: Connection[];
  onSocialLogin: (connection: Connection) => void;
  separatorText?: string;
  labelTemplate?: (displayName: string) => string;
  className?: string;
}

const SocialLoginGroup: React.FC<SocialLoginGroupProps> = ({
  connections,
  onSocialLogin,
  separatorText = 'or',
  labelTemplate = (displayName) => `Continue with ${displayName}`,
  className = '',
}) => {
  if (!connections || connections.length === 0) {
    return null;
  }

  return (
    <div className={`auth0-social-login-group ${className}`}>
      <div className="auth0-separator">
        <div className="auth0-separator-line"></div>
        {separatorText && <span className="auth0-separator-text">{separatorText}</span>}
        <div className="auth0-separator-line"></div>
      </div>
      
      <div className="auth0-social-buttons">
        {connections.map((connection) => (
          <SocialButton
            key={connection.name}
            provider={connection.name}
            displayName={connection.display_name || connection.name}
            iconUrl={connection.icon_url}
            onClick={() => onSocialLogin(connection)}
            fullWidth
            labelTemplate={labelTemplate}
          />
        ))}
      </div>
    </div>
  );
};

export default SocialLoginGroup; 