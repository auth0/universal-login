import React from 'react';
import SocialButton from '../../../components/common/SocialButton';

interface Connection {
  name: string;
  display_name?: string;
  logo_url?: string;
}

interface SocialLoginProps {
  connections?: Connection[];
  onSocialLogin: (name: string) => void;
  separatorText?: string;
}

const SocialLogin: React.FC<SocialLoginProps> = ({ 
  connections, 
  onSocialLogin,
  separatorText = 'or'
}) => {
  if (!connections || connections.length === 0) {
    return null;
  }

  return (
    <div className="auth0-social-login">
      {separatorText && (
        <div className="auth0-separator">
          <div className="auth0-separator-line">
            <div className="auth0-separator-line-inner"></div>
          </div>
          <div className="auth0-separator-text">
            <span className="auth0-separator-text-inner">
              {separatorText}
            </span>
          </div>
        </div>
      )}

      <div className="auth0-social-buttons">
        {connections.map((connection) => (
          <SocialButton
            key={connection.name}
            name={connection.name}
            displayName={connection.display_name || connection.name}
            iconUrl={connection.logo_url}
            onClick={() => onSocialLogin(connection.name)}
          />
        ))}
      </div>
    </div>
  );
};

export default SocialLogin; 