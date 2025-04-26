import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  isLoading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
  'data-provider'?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  isLoading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  className = '',
  children,
  disabled,
  'data-provider': dataProvider,
  ...rest
}) => {
  const baseClass = variant === 'primary' ? 'auth0-button-primary' : 'auth0-button-secondary';
  const widthClass = fullWidth ? 'auth0-button-fullwidth' : '';
  const disabledClass = isLoading || disabled ? 'auth0-button-disabled' : '';
  
  const combinedClassName = `auth0-button ${baseClass} ${widthClass} ${disabledClass} ${className}`.trim();

  return (
    <button
      className={combinedClassName}
      disabled={isLoading || disabled}
      data-provider={dataProvider}
      {...rest}
    >
      {isLoading ? (
        <div className="auth0-button-loader">
          <div className="auth0-button-loader-spinner"></div>
        </div>
      ) : (
        <>
          {leftIcon && <span className="auth0-button-icon auth0-button-icon-left">{leftIcon}</span>}
          <span className="auth0-button-text">{children}</span>
          {rightIcon && <span className="auth0-button-icon auth0-button-icon-right">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};

export default Button; 