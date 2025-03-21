import React from 'react';

interface SocialButtonProps {
  name: string;
  displayName: string;
  iconUrl?: string;
  onClick: () => void;
}

const SocialButton: React.FC<SocialButtonProps> = ({ 
  name, 
  displayName, 
  iconUrl, 
  onClick 
}) => {
  // Default icon if none provided
  const defaultIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10c0 5.523 4.477 10 10 10 5.523 0 10-4.477 10-10 0-5.523-4.477-10-10-10zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm.5-13h-1v5.5l3.75 2.25.75-1.23-3.5-2.02V5z" clipRule="evenodd" />
    </svg>
  );

  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center justify-center px-4 py-2 border border-secondary-button-border rounded-button text-button font-button text-secondary-button-label bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-base-focus mb-2"
      data-provider={name}
    >
      <span className="sr-only">Sign in with {displayName}</span>
      {iconUrl ? (
        <img src={iconUrl} alt={`${displayName} logo`} className="h-5 w-5 mr-2" />
      ) : (
        <span className="mr-2">{defaultIcon}</span>
      )}
      <span>Continue with {displayName}</span>
    </button>
  );
};

export default SocialButton; 