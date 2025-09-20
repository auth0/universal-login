import {  
  getCurrentThemeOptions, 
  FlattenedTheme,
} from '@auth0/auth0-acul-js';

/**
 * React hook to get the current theme options with flattened configuration from branding context.
 * 
 * @returns FlattenedTheme object containing colors, fonts, borders, pageBackground, and widget configurations, or null if no branding is available
 * 
 * @example
 * ```tsx
 * import React from 'react';
 * import { useAuth0Themes } from '@auth0/auth0-acul-react';
 * 
 * const ThemedComponent: React.FC = () => {
 *   const theme = useAuth0Themes();
 * 
 *   if (!theme) {
 *     return <div>No theme available</div>;
 *   }
 * 
 *   return (
 *     <div 
 *       style={{
 *         backgroundColor: theme.colors?.primary,
 *         color: theme.colors?.primaryText,
 *         fontFamily: theme.fonts?.bodyFont?.name,
 *         borderRadius: theme.borders?.buttonBorderRadius,
 *         padding: '16px'
 *       }}
 *     >
 *       <h1 style={{ fontFamily: theme.fonts?.titleFont?.name }}>
 *         Styled with Auth0 Theme
 *       </h1>
 *       <p>Primary Color: {theme.colors?.primary}</p>
 *       <p>Font Family: {theme.fonts?.bodyFont?.name}</p>
 *     </div>
 *   );
 * };
 * ```
 * 
 * @example
 * ```tsx
 * // Using theme for conditional styling
 * import React from 'react';
 * import { useAuth0Themes } from '@auth0/auth0-acul-react';
 * 
 * const LoginButton: React.FC = () => {
 *   const theme = useAuth0Themes();
 * 
 *   const buttonStyle = {
 *     backgroundColor: theme?.colors?.primary || '#007bff',
 *     color: theme?.colors?.primaryText || '#ffffff',
 *     border: `1px solid ${theme?.colors?.primaryBorder || 'transparent'}`,
 *     borderRadius: theme?.borders?.buttonBorderRadius || '4px',
 *     padding: '12px 24px',
 *     fontFamily: theme?.fonts?.bodyFont?.name || 'inherit',
 *     cursor: 'pointer'
 *   };
 * 
 *   return (
 *     <button style={buttonStyle}>
 *       Login
 *     </button>
 *   );
 * };
 * ```
 */
export const useAuth0Themes = (): FlattenedTheme | null => {
  return getCurrentThemeOptions();
};