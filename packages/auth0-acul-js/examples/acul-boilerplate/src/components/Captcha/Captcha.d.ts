import React from 'react';
interface CaptchaProps {
    captchaImage: string;
    captchaRef: React.RefObject<HTMLInputElement>;
    placeholder?: string;
}
declare const Captcha: React.FC<CaptchaProps>;
export default Captcha; 