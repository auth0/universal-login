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
    <div className="w-full">
      <div className="flex items-center justify-center w-full h-20 mb-2 border border-gray-200 rounded-md">
        <div className="">
          <img
            src={captchaImage}
            alt="Captcha"
            className="block h-auto max-w-full max-h-[52px]"
          />
        </div>
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