import React from 'react';
import SocialButton from '@/common/SocialButton';
import { SocialProvider } from '@/common/SocialIcon';
import Button from '@/common/Button';

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
  showPasskeyButton?: boolean;
  onPasskeyClick?: () => void;
  passkeyButtonText?: string;
  className?: string;
}

const SocialLoginGroup: React.FC<SocialLoginGroupProps> = ({
  connections,
  onSocialLogin,
  separatorText = 'or',
  labelTemplate = (displayName) => `Continue with ${displayName}`,
  showPasskeyButton = false,
  onPasskeyClick,
  passkeyButtonText = 'Continue with a passkey',
  className = '',
}) => {
  const hasConnections = connections && connections.length > 0;
  const shouldShowComponent = showPasskeyButton || hasConnections;
  const shouldShowSeparator = shouldShowComponent && (showPasskeyButton || hasConnections);

  if (!shouldShowComponent) {
    return null;
  }

  return (
    <div className={`w-full ${className}`}>
      {shouldShowSeparator && (
        <div className="flex items-center my-3 text-center">
          <div className="flex-grow h-px bg-gray-200"></div>
          {separatorText && <span className="px-2.5 text-sm text-gray-500 uppercase">{separatorText}</span>}
          <div className="flex-grow h-px bg-gray-200"></div>
        </div>
      )}

      <div className="mt-4 space-y-3">
        {showPasskeyButton && (
            <Button
              type="button"
              variant="secondary"
              fullWidth
              onClick={onPasskeyClick}
              leftIcon={
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.75 8.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5zm10 0a2.917 2.917 0 1 0-4.167 2.624v4.458l1.25 1.25L17.917 15l-1.25-1.25 1.25-1.25-1.034-1.033A2.916 2.916 0 0 0 18.75 8.75zm-2.917 0a.834.834 0 1 1 0-1.668.834.834 0 0 1 0 1.667zm-3.8 1.683A5 5 0 0 0 10 10H7.5a5 5 0 0 0-5 5v1.667h10.833v-4.592a4.3 4.3 0 0 1-1.3-1.642z" fill="currentColor"/>
                </svg>
              }
              data-testid="passkey-button"
            >
              {passkeyButtonText}
            </Button>
        )}

        {hasConnections && connections.map((connection) => (
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