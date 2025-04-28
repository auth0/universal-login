import React from 'react';

// Export the interface
export interface CaptchaProps {
    captchaImage: string;
    captchaRef: React.RefObject<HTMLInputElement>;
    placeholder?: string;
}

declare const Captcha: React.FC<CaptchaProps>;
export default Captcha; 