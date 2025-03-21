import React, { useState, forwardRef, useEffect, useRef } from 'react';
import './FormField.css';

export interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
  error?: string;
  helperText?: string;
  showPasswordToggle?: boolean;
  icon?: React.ReactNode;
}

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ id, label, error, helperText, showPasswordToggle, icon, className = '', type = 'text', placeholder, ...rest }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const inputType = showPasswordToggle && showPassword ? 'text' : type;
    
    // Combine the forwarded ref with our local ref
    const handleRef = (element: HTMLInputElement) => {
      // Update our internal ref
      inputRef.current = element;
      
      // Forward the ref
      if (typeof ref === 'function') {
        ref(element);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLInputElement | null>).current = element;
      }
    };
    
    useEffect(() => {
      // Check if input has value
      if (inputRef.current) {
        setHasValue(!!inputRef.current.value);
      }
    }, [rest.value]);
    
    const handleTogglePassword = () => {
      setShowPassword(!showPassword);
    };
    
    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      if (rest.onFocus) {
        rest.onFocus(e);
      }
    };
    
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      setHasValue(!!e.target.value);
      if (rest.onBlur) {
        rest.onBlur(e);
      }
    };
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(!!e.target.value);
      if (rest.onChange) {
        rest.onChange(e);
      }
    };

    return (
      <div className={`auth0-form-field ${error ? 'auth0-form-field-error' : ''} ${className}`}>
        {label && (
          <label htmlFor={id} className="auth0-label">
            {label}
          </label>
        )}
        
        <div className={`auth0-input-container ${isFocused ? 'is-focused' : ''} ${hasValue ? 'has-value' : ''} ${showPassword ? 'is-showing-password' : ''}`}>
          {icon && <div className="auth0-input-icon">{icon}</div>}
          
          <div className="auth0-floating-label-container">
            <input
              id={id}
              ref={handleRef}
              type={inputType}
              className={`auth0-input ${icon ? 'auth0-input-with-icon' : ''} ${showPasswordToggle ? 'auth0-input-with-toggle' : ''} ${showPassword ? 'auth0-input-showing-password' : ''}`}
              aria-invalid={!!error}
              placeholder=" " // Empty space to ensure CSS selectors work
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleChange}
              {...rest}
            />
            
            {placeholder && (
              <label htmlFor={id} className="auth0-floating-label">
                {placeholder}
              </label>
            )}
          </div>
          
          {showPasswordToggle && (
            <button
              type="button"
              className={`auth0-password-toggle ${showPassword ? 'is-active' : ''}`}
              onClick={handleTogglePassword}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              tabIndex={-1}
            >
              {showPassword ? (
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  style={{width: '22px', height: '22px'}}
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                >
                  <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                  <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  style={{width: '22px', height: '22px'}}
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                >
                  <path d="M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18zM22.676 12.553a11.249 11.249 0 01-2.631 4.31l-3.099-3.099a5.25 5.25 0 00-6.71-6.71L7.759 4.577a11.217 11.217 0 014.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113z" />
                  <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0115.75 12zM12.53 15.713l-4.243-4.244a3.75 3.75 0 004.243 4.243z" />
                  <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 00-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 016.75 12z" />
                </svg>
              )}
            </button>
          )}
        </div>
        
        {error && <div className="auth0-error-message">{error}</div>}
        {helperText && !error && <div className="auth0-helper-text">{helperText}</div>}
      </div>
    );
  }
);

FormField.displayName = 'FormField';

export default FormField; 