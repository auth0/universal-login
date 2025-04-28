import React, { InputHTMLAttributes, useState, useRef, forwardRef } from 'react';

// Export the props interface
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
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
    'peer block w-full border rounded-md text-sm h-12 box-border transition-colors duration-150'; // Increased height to h-12
  const borderClasses = error 
    ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
    : 'border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600';
  const paddingClasses = icon ? 'py-3.5 pl-11 pr-4' : showPasswordToggle ? 'py-3.5 pl-4 pr-11' : 'p-3.5';
  
  const finalInputClasses = `${baseInputClasses} ${borderClasses} ${paddingClasses} ${className}`.trim();
  
  const finalLabelClasses = `
    absolute text-sm text-gray-500 duration-150 transform -translate-y-1/2 top-1/2 start-3 z-10 origin-[0] 
    
    /* Adjust float-up position based on new padding/height */
    peer-focus:scale-75 peer-focus:-translate-y-[1.15rem] peer-focus:top-3.5 peer-focus:bg-white peer-focus:px-2 ${error ? 'peer-focus:text-red-500' : 'peer-focus:text-blue-600'} 
    peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:-translate-y-[1.15rem] peer-[:not(:placeholder-shown)]:top-3.5 peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-2 ${error ? 'text-red-500' : ''}
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
      {/* Standard label (optional, rendered only if NO placeholder for floating label is provided) */}
      {label && !placeholder && (
        <label 
          htmlFor={id} 
          className="block mb-1 text-sm font-medium text-gray-700"
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
        
        {/* Floating Label (rendered only if placeholder is provided) */}
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
            title={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
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