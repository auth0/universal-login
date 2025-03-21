import React from 'react';
import Input from '../Input';

interface CaptchaProps {
  captchaImage: string;
  captchaRef: React.RefObject<HTMLInputElement>;
  placeholder?: string;
  label?: string;
}

const Captcha: React.FC<CaptchaProps> = ({ 
  captchaImage, 
  captchaRef, 
  placeholder = 'Enter the code shown above',
  label = 'Captcha'
}) => {
  return (
    <div className="mb-4">
      <div className="mb-2 flex justify-center">
        <img 
          src={captchaImage} 
          alt="Captcha" 
          className="max-w-full h-auto border border-ui-border rounded-input"
        />
      </div>
      <Input
        id="captcha"
        label={label}
        placeholder={placeholder}
        autoComplete="off"
        {...{ ref: captchaRef } as any}
      />
    </div>
  );
};

export default Captcha; 