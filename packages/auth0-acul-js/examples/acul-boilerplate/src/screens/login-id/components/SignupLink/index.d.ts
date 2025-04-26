import React from 'react';
export interface SignupLinkProps {
    signupLink: string;
    signupText?: string;
    footerText?: string;
    onLinkClick?: (e: React.MouseEvent<HTMLAnchorElement>, path: string) => void;
}
declare const SignupLink: React.FC<SignupLinkProps>;
export default SignupLink;
