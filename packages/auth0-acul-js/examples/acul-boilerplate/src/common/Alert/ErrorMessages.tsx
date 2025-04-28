import React from 'react';

interface Error {
  message: string;
}

export interface ErrorMessagesProps {
  errors: Error[];
}

const ErrorMessages: React.FC<ErrorMessagesProps> = ({ errors }) => {
  if (!errors || errors.length === 0) return null;

  return (
    <div className="space-y-2">
      {errors.map((error, index) => (
        <div
          key={index}
          className="flex items-center rounded border border-[#d03c38] bg-[rgba(208,60,56,0.1)] px-3 py-2.5 text-[#d03c38]"
        >
          <span className="mr-2 font-bold">!</span>
          <p className="text-sm">{error.message}</p>
        </div>
      ))}
    </div>
  );
};

export default ErrorMessages; 