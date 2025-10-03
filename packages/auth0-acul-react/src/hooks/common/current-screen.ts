import { getCurrentScreenOptions, type CurrentScreenOptions } from '@auth0/auth0-acul-js';

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
 * const App: React.FC = () => {
 *   const screenOptions = useCurrentScreen();
 *   const screen = screenOptions?.screen?.name || "login-id";
 *
 *   const renderScreen = () => {
 *     switch (screen) {
 *       case "login-id":
 *         return <LoginIdScreen />;
 *       case "login-password":
 *         return <LoginPasswordScreen />;
 *       case "login":
 *         return <Login />;
 *       case "login-passwordless-email-code":
 *         return <LoginPasswordlessEmailCodeScreen />;
 *       default:
 *         return null;
 *     }
 *   };
 *
 *   return <div>{renderScreen()}</div>;
 * };
 * ```
 */
export const useCurrentScreen = (): CurrentScreenOptions | null => {
  return getCurrentScreenOptions();
};
