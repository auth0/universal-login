import React from 'react';

interface LogoProps {
  instance: any; // Using any to support all screen types
  altText?: string;
  logoUrl?: string;
}

const Logo: React.FC<LogoProps> = ({ instance: screenInstance, altText, logoUrl: propLogoUrl }) => {
  // Get logo URL from props, organization branding, or default
  const logoUrl = propLogoUrl || 
                 screenInstance.organization?.branding?.logoUrl || 
                 screenInstance.branding?.logoUrl ||
                 'https://cdn.auth0.com/ulp/react-components/1.59/img/theme-generic/logo-generic.svg'; // Default Auth0 logo
  
  // Get alt text from screen texts or use provided alt text or default
  const logoAltText = altText || 
                     screenInstance.screen?.texts?.logoAltText || 
                     screenInstance.organization?.displayName || 
                     'Logo';

  // Get logo height from instance if available
  const logoHeight = screenInstance.branding?.themes?.default?.widget?.logo_height || '52px';

  return (
    <div className="auth0-logo">
      <img 
        src={logoUrl} 
        alt={logoAltText} 
        style={{ height: logoHeight }}
      />
    </div>
  );
};

export default Logo;