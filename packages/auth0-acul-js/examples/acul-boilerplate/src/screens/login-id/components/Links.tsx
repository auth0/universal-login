import React from 'react';
import { navigateWithCurrentOrigin } from '../../../utils/url';

interface LinksProps {
  signupLink?: string;
  signupText?: string;
  footerText?: string;
}

const Links: React.FC<LinksProps> = ({ signupLink, signupText, footerText }) => {
  if (!signupLink || !signupText) return null;

  // Handle link click to use the current origin
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
    e.preventDefault();
    navigateWithCurrentOrigin(url);
  };

  return (
    <div className="auth0-alternate-action-text">
      {footerText ? (
        <>
          <span>{footerText}</span>
          <a 
            href={signupLink} 
            className="auth0-alternate-link"
            onClick={(e) => handleLinkClick(e, signupLink)}
          >
            <strong>{signupText}</strong>
          </a>
        </>
      ) : (
        <>
          <span>Don't have an account?</span>
          <a 
            href={signupLink} 
            className="auth0-alternate-link"
            onClick={(e) => handleLinkClick(e, signupLink)}
          >
            <strong>{signupText}</strong>
          </a>
        </>
      )}
    </div>
  );
};

export default Links; 