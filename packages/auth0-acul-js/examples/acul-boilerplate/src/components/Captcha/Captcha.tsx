import React from 'react';
import Input from '@/components/Input';

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
    <div className="mb-4 w-full">
      <div className="mb-2 mt-2 overflow-hidden border border-gray-300 rounded-md">
        <img 
          src={captchaImage} 
          alt="Captcha" 
          className="max-w-full h-auto block mx-auto"
        />
      </div>
      <div className="w-full">
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