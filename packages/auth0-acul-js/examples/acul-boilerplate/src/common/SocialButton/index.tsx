import React from 'react';
import Button from '@/common/Button';
import SocialIcon, { SocialProvider } from '@/common/SocialIcon';

export interface SocialLoginButtonProps {
  provider: SocialProvider;
  displayName: string; // Original display name from Auth0
  iconUrl?: string;
  onClick: () => void;
  fullWidth?: boolean;
  className?: string;
  labelTemplate?: (displayName: string) => string;
}

const PROVIDER_DISPLAY_NAMES: { [key: string]: string } = {
  'google-oauth2': 'Google',
  'facebook': 'Facebook',
  'apple': 'Apple',
  'github': 'GitHub',
  'linkedin': 'LinkedIn',
  'microsoft': 'Microsoft',
  'twitter': 'Twitter'
};

const SocialButton: React.FC<SocialLoginButtonProps> = ({
  provider,
  displayName,
  iconUrl,
  onClick,
  fullWidth = false,
  className = '',
  labelTemplate = (name) => `Continue with ${name}`,
}) => {

  const finalDisplayName = PROVIDER_DISPLAY_NAMES[provider] || displayName || provider;

  return (
    <Button
      variant="secondary"
      onClick={onClick}
      fullWidth={fullWidth}
      className={className}
      leftIcon={
        <SocialIcon provider={provider} iconUrl={iconUrl} />
      }
    >
      {labelTemplate(finalDisplayName)}
    </Button>
  );
};

export default SocialButton; 