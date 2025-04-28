import React from 'react';
export type SocialProvider = 'google-oauth2' | 'facebook' | 'github' | 'apple' | 'twitter' | 'linkedin' | 'microsoft' | string;
export interface SocialIconProps {
    provider: SocialProvider;
    iconUrl?: string;
    size?: 'small' | 'medium' | 'large';
    className?: string;
}
declare const SocialIcon: React.FC<SocialIconProps>;
export default SocialIcon;
