import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import './Button.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  isLoading?: boolean;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  isLoading = false,
  fullWidth = false,
  leftIcon,
  className = '', 
  ...props 
}) => {
  const variantClass = variant === 'primary' 
    ? "auth0-button-primary" 
    : "auth0-button-secondary";
  
  const widthClass = fullWidth ? "auth0-button-fullwidth" : "";
  const disabledClass = (isLoading || props.disabled) ? "auth0-button-disabled" : "";
  
  const buttonClasses = `auth0-button ${variantClass} ${widthClass} ${disabledClass} ${className}`;
  
  return (
    <button
      className={buttonClasses}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <svg className="auth0-button-loading-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : leftIcon ? (
        <span className="auth0-button-icon auth0-button-icon-left">{leftIcon}</span>
      ) : null}
      
      <span className="auth0-button-text">{children}</span>
    </button>
  );
};

export default Button;