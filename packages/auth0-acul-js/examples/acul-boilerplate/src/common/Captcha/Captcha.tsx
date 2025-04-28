import React from 'react';
import Input from '@/common/Input';

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
      <div className="mb-2 mt-2 flex items-center justify-center border border-gray-300 rounded-md p-1 min-h-[60px]">
        <img 
          src={captchaImage} 
          alt="Captcha" 
          className="h-auto block"
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