import React from 'react';

interface Error {
  message: string;
}

interface ErrorMessagesProps {
  errors: Error[];
}

const ErrorMessages: React.FC<ErrorMessagesProps> = ({ errors }) => {
  if (!errors || errors.length === 0) return null;

  return (
    <div className="auth0-error-messages">
      {errors.map((error, index) => (
        <div key={index} className="auth0-error-alert">
          <p className="auth0-error-alert-text">{error.message}</p>
        </div>
      ))}
    </div>
  );
};

export default ErrorMessages; 