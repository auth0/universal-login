import React from 'react';
import { SocialProvider } from '../SocialIcon'; // Changed to relative path

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
declare const SocialLoginGroup: React.FC<SocialLoginGroupProps>;
export default SocialLoginGroup; 