import React from 'react';
import { navigateWithCurrentOrigin } from '../../../utils/url';

interface LinksProps {
  signupLink?: string;
  signupText?: string;
  footerText?: string;
  onLinkClick?: (e: React.MouseEvent<HTMLAnchorElement>, path: string) => void;
}

const Links: React.FC<LinksProps> = ({ 
  signupLink, 
  signupText = 'Sign up',
  footerText = "Don't have an account?",
  onLinkClick
}) => {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
    e.preventDefault();
    if (onLinkClick) {
      onLinkClick(e, url);
    } else {
      navigateWithCurrentOrigin(url);
    }
  };

  return (
    <div className="auth0-links">
      <div className="auth0-links-container">
        {signupLink && (
          <div>
            <span className="auth0-footer-text">{footerText}</span>
            <a 
              href={signupLink}
              className="auth0-link"
              onClick={(e) => handleLinkClick(e, signupLink)}
            >
              <strong>{signupText}</strong>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Links; 