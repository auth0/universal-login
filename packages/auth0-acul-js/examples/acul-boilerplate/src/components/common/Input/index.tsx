import React, { InputHTMLAttributes, useState, useRef, useEffect } from 'react';
import './Input.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id: string;
  error?: string;
  showPasswordToggle?: boolean;
  icon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({ 
  label, 
  id, 
  error, 
  className = '',
  showPasswordToggle = false,
  icon,
  placeholder,
  ...props 
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const isPasswordInput = props.type === 'password';
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const inputType = isPasswordInput && showPassword ? 'text' : props.type;
  
  const inputClasses = [
    'auth0-input',
    error ? 'auth0-input-error' : '',
    icon ? 'auth0-input-with-icon' : '',
    showPasswordToggle ? 'auth0-input-with-toggle' : '',
    className
  ].filter(Boolean).join(' ');

  useEffect(() => {
    // Check if input has value for initial state
    if (inputRef.current) {
      setHasValue(!!inputRef.current.value);
    }
  }, [props.value]);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    if (props.onFocus) {
      props.onFocus(e);
    }
  };
  
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    setHasValue(!!e.target.value);
    if (props.onBlur) {
      props.onBlur(e);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasValue(!!e.target.value);
    if (props.onChange) {
      props.onChange(e);
    }
  };
  
  return (
    <div className={`auth0-input-container ${isFocused ? 'is-focused' : ''} ${hasValue ? 'has-value' : ''} ${showPassword ? 'is-showing-password' : ''}`}>
      {label && (
        <label 
          htmlFor={id} 
          className="auth0-input-label"
        >
          {label}
        </label>
      )}
      
      {icon && (
        <div className="auth0-input-icon">
          {icon}
        </div>
      )}
      
      <div className="auth0-floating-label-container">
        <input
          id={id}
          className={inputClasses}
          ref={inputRef}
          placeholder=" " 
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          {...props}
          type={inputType}
        />
        
        {placeholder && (
          <label htmlFor={id} className="auth0-floating-label">
            {placeholder}
          </label>
        )}
      </div>
      
      {isPasswordInput && showPasswordToggle && (
        <button
          type="button"
          className={`auth0-password-toggle ${showPassword ? 'is-active' : ''}`}
          onClick={togglePasswordVisibility}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
              <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
            </svg>
          )}
        </button>
      )}
      
      {error && (
        <p className="auth0-error-message">{error}</p>
      )}
    </div>
  );
};

export default Input;