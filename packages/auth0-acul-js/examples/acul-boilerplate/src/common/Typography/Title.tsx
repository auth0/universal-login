import React from 'react';

interface TitleProps {
  title?: string;
  description?: string;
}

const Title: React.FC<TitleProps> = ({ title, description }) => {
  return (
    <div className="mb-6">
      {title && (
        <h1 className="text-2xl font-semibold text-[color:var(--auth0-text-color)] mb-2">
          {title}
        </h1>
      )}
      {description && (
        <p className="text-sm text-[color:var(--auth0-secondary-text)]">
          {description}
        </p>
      )}
    </div>
  );
};

export default Title; 