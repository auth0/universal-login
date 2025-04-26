import React from 'react';
import { SocialProvider } from '@/components/SocialIcon';
export interface SocialLoginButtonProps {
    provider: SocialProvider;
    displayName: string;
    iconUrl?: string;
    onClick: () => void;
    fullWidth?: boolean;
    className?: string;
    labelTemplate?: (displayName: string) => string;
}
declare const SocialButton: React.FC<SocialLoginButtonProps>;
export default SocialButton;
