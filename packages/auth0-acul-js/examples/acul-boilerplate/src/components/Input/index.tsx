import React, { InputHTMLAttributes, useState, useRef, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id: string;
  error?: string;
  showPasswordToggle?: boolean;
  icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ 
  label, 
  id, 
  error, 
  className = '',
  showPasswordToggle = false,
  icon,
  placeholder,
  ...props 
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const innerRef = useRef<HTMLInputElement>(null);
  
  const inputRef = ref || innerRef;
  
  const isPasswordInput = props.type === 'password';
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const inputType = isPasswordInput && showPassword ? 'text' : props.type;

  // --- Tailwind Classes --- 
  const baseInputClasses = 
    'peer block w-full p-2.5 border rounded-md text-sm h-10 box-border transition-colors duration-200'; // Standardized padding
  const borderClasses = error 
    ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
    : 'border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600';
  const paddingClasses = icon ? 'py-2.5 pl-10 pr-3' : showPasswordToggle ? 'py-2.5 pl-3 pr-10' : 'p-2.5'; 
  
  const finalInputClasses = `${baseInputClasses} ${borderClasses} ${paddingClasses} ${className}`.trim();
  
  const finalLabelClasses = `
    absolute text-sm text-gray-500 duration-300 transform 
    scale-100 -translate-y-1/2 top-1/2 start-3 z-10 origin-[0] /* Base: Centered Inside */
    
    peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:top-2 peer-focus:bg-white peer-focus:px-2 ${error ? 'peer-focus:text-red-500' : 'peer-focus:text-blue-600'} /* Focus: Floats up */
    peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-2 ${error ? 'text-red-500' : ''}/* Value Entered: Floats up */
  `.trim();

  const containerClasses = `relative w-full`; // Main container class

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (props.onFocus) props.onFocus(e);
  };
  
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (props.onBlur) props.onBlur(e);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.onChange) props.onChange(e);
  };
  
  return (
    <div className={containerClasses}>
      {/* Standard label (optional) */}
      {label && (
        <label 
          htmlFor={id} 
          className="block mb-1 text-sm font-medium text-gray-700" // Basic Tailwind for standard label
        >
          {label}
        </label>
      )}
      
      {/* Input and Float ing Label Container */}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            {icon}
          </div>
        )}
        
        <input
          id={id}
          className={finalInputClasses}
          ref={inputRef as React.Ref<HTMLInputElement>}
          placeholder=" "
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          {...props}
          type={inputType}
          value={props.value}
        />
        
        {/* Floating Label */}
        {placeholder && (
          <label htmlFor={id} className={finalLabelClasses}>
            {placeholder}
          </label>
        )}

        {/* Password Toggle Button */}
        {isPasswordInput && showPasswordToggle && (
          <button
            type="button"
            className={`absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700 ${showPassword ? 'text-blue-600' : ''}`}
            onClick={togglePasswordVisibility}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {/* SVGs remain the same */} 
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
      </div>
      
      {/* Error Message */}
      {error && (
        <p className="mt-1 text-xs text-red-500">{error}</p>
      )}
    </div>
  );
});

export default Input;