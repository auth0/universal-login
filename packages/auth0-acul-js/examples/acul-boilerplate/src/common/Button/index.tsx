import React, { ButtonHTMLAttributes, ReactNode } from 'react';

// Export the props interface
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
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

  // Base Tailwind classes
  const baseClasses = 
    'flex items-center justify-center px-4 py-2 rounded-[var(--border-button-radius)] text-sm font-medium cursor-pointer h-10 transition-all duration-150 ease-linear shadow-sm hover:enabled:shadow-[inset_0_0_12.249px_rgba(0,0,0,0.08)]';

  // Variant specific classes
  const primaryClasses = 
    'bg-[var(--color-primary-button)] text-[var(--color-primary-button-label)] border border-[var(--color-primary-button)]';
  const secondaryClasses = 
    'bg-white text-[var(--auth0-text-color)] border border-[var(--auth0-border-color)] hover:enabled:bg-gray-50';

  const variantClasses = variant === 'primary' ? primaryClasses : secondaryClasses;
  
  const widthClass = fullWidth ? 'w-full' : '';
  const disabledState = isLoading || props.disabled;
  const disabledClasses = disabledState ? 'opacity-50 cursor-not-allowed' : '';
  
  const buttonClasses = `${baseClasses} ${variantClasses} ${widthClass} ${disabledClasses} ${className}`.trim();
  
  return (
    <button
      className={buttonClasses}
      disabled={disabledState}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : leftIcon ? (
        <span className="mr-2 flex items-center">{leftIcon}</span>
      ) : null}
      
      {children}
    </button>
  );
};

export default Button;