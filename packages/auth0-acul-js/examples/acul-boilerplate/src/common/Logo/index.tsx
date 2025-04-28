import React from 'react';

// Export the props interface
export interface LogoProps {
  instance: any; // Using any to support all screen types
  altText?: string;
  logoUrl?: string;
}

const Logo: React.FC<LogoProps> = ({ instance: screenInstance, altText, logoUrl: propLogoUrl }) => {
  // Debug log to check logo sources

  // Get logo URL with proper fallback sequence as per requirements
  const logoUrl = propLogoUrl || 
                  screenInstance.organization?.branding?.logo_url || 
                  screenInstance.branding?.themes?.default?.widget?.logo_url || 
                  'https://cdn.auth0.com/ulp/react-components/1.59/img/theme-generic/logo-generic.svg'; // Default Auth0 logo
  
  // Get alt text from screen texts or use provided alt text or default
  const logoAltText = altText || 
                     screenInstance.screen?.texts?.logoAltText || 
                     screenInstance.organization?.displayName || 
                     'Logo';

  // Get logo height from instance if available
  const logoHeight = screenInstance.branding?.themes?.default?.widget?.logo_height || '52px';

  return (
    <div className="flex justify-center mb-6">
      <img 
        src={logoUrl} 
        alt={logoAltText} 
        className={`max-w-full h-[${logoHeight}] max-h-[52px]`}
      />
    </div>
  );
};

export default Logo;