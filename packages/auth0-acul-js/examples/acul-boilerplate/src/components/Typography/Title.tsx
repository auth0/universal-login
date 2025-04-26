import React from 'react';

interface TitleProps {
  title?: string;
  description?: string;
}

const Title: React.FC<TitleProps> = ({ title, description }) => {
  return (
    <div className="auth0-title"> // Note: Class name might need alignment with CSS
      {title && (
        <h1>
          {title}
        </h1>
      )}
      {description && (
        <p>
          {description}
        </p>
      )}
    </div>
  );
};

export default Title; 