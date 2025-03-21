import React from 'react';

interface LinksProps {
  signupLink?: string;
  signupText?: string;
  footerText?: string;
}

const Links: React.FC<LinksProps> = ({ 
  signupLink, 
  signupText = 'Sign up',
  footerText = "Don't have an account?"
}) => {
  // Function to ensure links use the current page's base URL
  const getAbsoluteUrl = (url: string) => {
    if (!url) return '';
    
    // If the URL is already absolute, return it as is
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    
    // Get the current page's base URL
    const baseUrl = window.location.origin;
    
    // Ensure the URL starts with a slash
    const normalizedUrl = url.startsWith('/') ? url : `/${url}`;
    
    return `${baseUrl}${normalizedUrl}`;
  };

  return (
    <div className="auth0-links">
      <div className="auth0-links-container">
        {signupLink && (
          <div>
            <span className="auth0-footer-text">{footerText}</span>
            <a href={getAbsoluteUrl(signupLink)} className="auth0-link">
              {signupText}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Links; 