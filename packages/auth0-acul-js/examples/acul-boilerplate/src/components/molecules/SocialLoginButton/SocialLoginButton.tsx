import React from 'react';
import Button from '../../atoms/Button';
import SocialIcon, { SocialProvider } from '../../atoms/SocialIcon';

export interface SocialLoginButtonProps {
  provider: SocialProvider;
  displayName: string;
  iconUrl?: string;
  onClick: () => void;
  fullWidth?: boolean;
  className?: string;
  labelTemplate?: (displayName: string) => string;
}

const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({
  provider,
  displayName,
  iconUrl,
  onClick,
  fullWidth = false,
  className = '',
  labelTemplate = (displayName) => `Continue with ${displayName}`,
}) => {
  return (
    <Button
      variant="secondary"
      onClick={onClick}
      fullWidth={fullWidth}
      className={`auth0-social-button ${className}`}
      leftIcon={
        <SocialIcon provider={provider} iconUrl={iconUrl} />
      }
    >
      {labelTemplate(displayName)}
    </Button>
  );
};

export default SocialLoginButton; 