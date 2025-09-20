import { 
  getCurrentScreenOptions, 
  CurrentScreenOptions
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