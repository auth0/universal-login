import React from 'react';

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
    <div className="mt-4 text-left">
      <span className="text-sm text-[color:var(--color-body-text)]">{footerText}</span>{" "}
      <a
        href={signupLink}
        className="text-sm text-[color:var(--color-links)] no-underline"
        onClick={handleClick}
      >
        {signupText}
      </a>
    </div>
  );
};

export default SignupLink; 