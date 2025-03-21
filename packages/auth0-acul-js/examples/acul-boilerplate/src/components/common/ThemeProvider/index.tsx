import React, { useEffect, ReactNode } from 'react';

interface ThemeProviderProps {
  children: ReactNode;
  instance: any; // Using any to support all screen types
}

// Helper function to get value with fallbacks
const getThemeValue = (instance: any, paths: string[], defaultValue: any) => {
  for (const path of paths) {
    const value = path.split('.').reduce((acc, part) => acc && acc[part], instance);
    if (value !== undefined && value !== null) {
      return value;
    }
  }
  return defaultValue;
};

// Convert hex to rgba for transparency variations
const hexToRgba = (hex: string, alpha: number = 1) => {
  if (!hex || typeof hex !== 'string') return '';
  
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const fullHex = hex.replace(shorthandRegex, (_, r, g, b) => r + r + g + g + b + b);

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
  if (!result) return '';
  
  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);
  
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, instance: screenInstance }) => {
  useEffect(() => {
    if (!screenInstance) return;
    
    const root = document.documentElement;
    
    // Get primary color with fallbacks
    const primaryColor = getThemeValue(
      screenInstance, 
      [
        'organization.branding.colors.primary', 
        'branding.settings.colors.primary',
        'branding.themes.default.colors.primary_button'
      ], 
      '#635dff'
    );
    
    // Get page background with fallbacks
    const pageBackground = getThemeValue(
      screenInstance,
      [
        'organization.branding.colors.page_background', 
        'branding.settings.colors.pageBackground',
        'branding.themes.default.pageBackground.background_color'
      ],
      '#f2f2f2'
    );
    
    // Get logo URL with fallbacks
    const logoUrl = getThemeValue(
      screenInstance,
      [
        'organization.branding.logo_url',
        'branding.themes.default.widget.logo_url'
      ],
      'https://cdn.auth0.com/ulp/react-components/1.59/img/theme-generic/logo-generic.svg'
    );
    
    // Calculate derived colors for primary
    const primaryLight = hexToRgba(primaryColor, 0.1);
    const primaryDark = hexToRgba(primaryColor, 0.8);
    
    // Set only the essential variables
    root.style.setProperty('--color-primary', primaryColor);
    root.style.setProperty('--color-primary-light', primaryLight);
    root.style.setProperty('--color-primary-dark', primaryDark);
    root.style.setProperty('--color-page-background', pageBackground);
    root.style.setProperty('--logo-url', `url(${logoUrl})`);
    
    // Set essential variables that are needed for components to work
    root.style.setProperty('--auth0-primary-color', primaryColor);
    root.style.setProperty('--auth0-primary-color-dark', primaryDark);
    root.style.setProperty('--color-primary-button-label', '#ffffff');
    
  }, [screenInstance]);

  return (
    <div className="auth0-acul">
      {children}
    </div>
  );
};

export default ThemeProvider; 