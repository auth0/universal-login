import React from 'react';

interface ErrorMessagesProps {
  errors: Array<{
    message: string;
    type?: string;
  }>;
}

const ErrorMessages: React.FC<ErrorMessagesProps> = ({ errors }) => {
  if (!errors || errors.length === 0) return null;

  return (
    <div className="auth0-error-message-container">
      {errors.map((error, index) => (
        <div key={index} className="auth0-error-message">
          <div className="auth0-error-message-icon">!</div>
          <div className="auth0-error-message-text">{error.message}</div>
        </div>
      ))}
    </div>
  );
};

export default ErrorMessages; 