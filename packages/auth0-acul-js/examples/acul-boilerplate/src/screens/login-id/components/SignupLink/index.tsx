import React from 'react';
// import './SignupLink.css'; // CSS likely missing, commented out

export interface SignupLinkProps {
  signupLink: string;
  signupText?: string;
  footerText?: string;
  onLinkClick?: (e: React.MouseEvent<HTMLAnchorElement>, path: string) => void;
}

const SignupLink: React.FC<SignupLinkProps> = ({ 
  signupLink, 
  signupText = 'Sign up', 
  footerText = "Don't have an account?",
  onLinkClick 
}) => {
  if (!signupLink) return null;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (onLinkClick) {
      onLinkClick(e, signupLink);
    } else {
      window.location.href = signupLink;
    }
  };

  return (
    <div className="auth0-signup-link-container">
      <span className="auth0-signup-text">{footerText}</span>{" "}
      <a 
        href={signupLink} 
        className="auth0-signup-link"
        onClick={handleClick}
      >
        {signupText}
      </a>
    </div>
  );
};

export default SignupLink; 