import { getCurrentThemeOptions, type FlattenedTheme } from '@auth0/auth0-acul-js';

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
 *         backgroundColor: theme.colors.primary_button,
 *         color: theme.colors.primary_button_label,
 *         borderRadius: theme.borders.button_border_radius,
 *       }}
 *     >
 *       <h1
 *         style={{
 *           fontWeight: theme.fonts.title.bold ? 'bold' : 'normal',
 *           fontSize: `${theme.fonts.title.size}%`,
 *         }}
 *       >
 *         Styled with Auth0 Theme
 *       </h1>
 *       <button
 *         style={{
 *           backgroundColor: theme.colors.primary_button,
 *           borderRadius: theme.borders.button_border_radius,
 *         }}
 *       >
 *         Primary Button
 *       </button>
 *       <p>Body text color: {theme.colors.body_text}</p>
 *     </div>
 *   );
 * };
 */

export const useAuth0Themes = (): FlattenedTheme | null => {
  return getCurrentThemeOptions();
};
