import React from 'react';
import Input from '../Input';
import './Captcha.css';

interface CaptchaProps {
  captchaImage: string;
  captchaRef: React.RefObject<HTMLInputElement>;
  placeholder?: string;
}

const Captcha: React.FC<CaptchaProps> = ({ 
  captchaImage, 
  captchaRef, 
  placeholder = 'Enter the code shown above'
}) => {
  return (
    <div className="auth0-captcha">
      <div className="auth0-captcha-image">
        <img 
          src={captchaImage} 
          alt="Captcha" 
          style={{ maxWidth: '100%', height: 'auto' }} 
        />
      </div>
      <div className="auth0-input-wrapper">
        <Input
          id="captcha"
          placeholder={placeholder}
          autoComplete="off"
          {...{ ref: captchaRef } as any}
        />
      </div>
    </div>
  );
};

export default Captcha; 