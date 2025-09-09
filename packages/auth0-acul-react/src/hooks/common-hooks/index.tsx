import { 
  getCurrentScreenOptions, 
  getCurrentThemeOptions, 
  getErrors, 
  CurrentScreenOptions, 
  FlattenedTheme,
  type Error as TransactionError
} from '@auth0/auth0-acul-js';

/**
 * React hook to get the current screen options including client, organization, prompt, screen, tenant, transaction, and untrusted data.
 * 
 * @returns Current screen options object with all available context data, or null if no screen context is available
 * 
 * @example
 * ```tsx
 * import React from 'react';
 * import { useCurrentScreen } from '@auth0/auth0-acul-react';
 * 
 * const MyComponent: React.FC = () => {
 *   const screenOptions = useCurrentScreen();
 * 
 *   if (!screenOptions) {
 *     return <div>Loading...</div>;
 *   }
 * 
 *   return (
 *     <div>
 *       <h1>Current Screen: {screenOptions.screen?.name}</h1>
 *       <p>Tenant ID: {screenOptions.tenant?.enabledLocales?.join(', ')}</p>
 *       <p>Transaction State: {screenOptions.transaction?.state}</p>
 *       {screenOptions.organization && (
 *         <p>Organization: {screenOptions.organization.id}</p>
 *       )}
 *       {screenOptions.transaction?.errors && (
 *         <div>
 *           <h3>Errors:</h3>
 *           {screenOptions.transaction.errors.map((error, index) => (
 *             <p key={index} style={{ color: 'red' }}>
 *               {error.code}: {error.description}
 *             </p>
 *           ))}
 *         </div>
 *       )}
 *     </div>
 *   );
 * };
 * ```
 */
export const useCurrentScreen = (): CurrentScreenOptions | null => {
  return getCurrentScreenOptions();
};

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

export const useErrors = (): TransactionError[] | null => {
  return getErrors();
};
