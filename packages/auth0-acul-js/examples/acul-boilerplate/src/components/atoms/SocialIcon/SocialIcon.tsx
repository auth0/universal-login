import React from 'react';

export type SocialProvider = 
  | 'google-oauth2' 
  | 'facebook' 
  | 'github' 
  | 'apple' 
  | 'twitter' 
  | 'linkedin' 
  | 'microsoft' 
  | string;

export interface SocialIconProps {
  provider: SocialProvider;
  iconUrl?: string;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const SocialIcon: React.FC<SocialIconProps> = ({
  provider,
  iconUrl,
  size = 'medium',
  className = ''
}) => {
  const sizeClasses = {
    small: 'h-4 w-4',
    medium: 'h-5 w-5',
    large: 'h-6 w-6'
  };
  
  const combinedClasses = `${sizeClasses[size]} ${className}`;
  
  // If custom icon URL is provided, use it
  if (iconUrl) {
    return <img src={iconUrl} alt={`${provider} logo`} className={combinedClasses} />;
  }
  
  // Default icons for common providers
  switch (provider) {
    case 'google-oauth2':
      return (
        <svg className={combinedClasses} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
      );
    case 'facebook':
      return (
        <svg className={combinedClasses} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      );
    case 'github':
      return (
        <svg className={combinedClasses} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path fill="#333" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
      );
    case 'apple':
      return (
        <svg className={combinedClasses} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path fill="#000" d="M16.462 8.293c-.831 0-1.5-.662-1.5-1.5 0-.84.669-1.5 1.5-1.5.831 0 1.5.66 1.5 1.5 0 .838-.669 1.5-1.5 1.5zm-4.5 13.5c-2.485 0-4.5-2.01-4.5-4.5 0-2.486 2.015-4.5 4.5-4.5 2.486 0 4.5 2.014 4.5 4.5 0 2.49-2.014 4.5-4.5 4.5zm0-10.5c-3.309 0-6 2.691-6 6 0 3.309 2.691 6 6 6 3.309 0 6-2.691 6-6 0-3.309-2.691-6-6-6z" />
        </svg>
      );
    case 'twitter':
      return (
        <svg className={combinedClasses} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path fill="#1DA1F2" d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg className={combinedClasses} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path fill="#0A66C2" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );
    case 'microsoft':
      return (
        <svg className={combinedClasses} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path fill="#F25022" d="M11.4 24H0V12.6h11.4V24z" />
          <path fill="#00A4EF" d="M24 24H12.6V12.6H24V24z" />
          <path fill="#7FBA00" d="M11.4 11.4H0V0h11.4v11.4z" />
          <path fill="#FFB900" d="M24 11.4H12.6V0H24v11.4z" />
        </svg>
      );
    default:
      // Generic icon for other providers
      return (
        <svg className={combinedClasses} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
        </svg>
      );
  }
};

export default SocialIcon; 