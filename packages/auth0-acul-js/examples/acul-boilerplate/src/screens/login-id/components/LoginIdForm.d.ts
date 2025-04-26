import React from 'react';
import './login-id.css';
export interface LoginIdFormProps {
    loginIdRef: React.RefObject<HTMLInputElement>;
    captchaRef?: React.RefObject<HTMLInputElement>;
    onSubmit: (e: React.FormEvent) => void;
    isLoading?: boolean;
    isCaptchaAvailable?: boolean;
    captchaImage?: string;
    buttonText?: string;
    loginIdPlaceholder?: string;
    captchaPlaceholder?: string;
    loginIdError?: string;
    captchaError?: string;
    className?: string;
    showPasskeyButton?: boolean;
    onPasskeyClick?: () => void;
    passkeyButtonText?: string;
    forgotPasswordLink?: string;
    forgotPasswordText?: string;
}
declare const LoginIdForm: React.FC<LoginIdFormProps>;
export default LoginIdForm;
