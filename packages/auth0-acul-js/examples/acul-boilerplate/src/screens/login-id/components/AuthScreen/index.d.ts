import React from 'react';
export interface AuthScreenTemplateProps {
    title?: string;
    description?: string;
    logo?: React.ReactNode;
    errorMessages?: React.ReactNode;
    formContent: React.ReactNode;
    footerLinks?: React.ReactNode;
    className?: string;
}
declare const AuthScreenTemplate: React.FC<AuthScreenTemplateProps>;
export default AuthScreenTemplate;
