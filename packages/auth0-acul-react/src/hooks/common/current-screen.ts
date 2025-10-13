import { getCurrentScreenOptions, type CurrentScreenOptions } from '@auth0/auth0-acul-js';

/**
 * React hook that gets the current screen context and state.
 *
 * This hook provides access to client configuration, organization details, screen identification,
 * tenant settings, transaction state, and authorization parameters for building custom authentication UI.
 *
 * ## Return Value
 *
 * Returns `CurrentScreenOptions` object with the following properties, or `null` if unavailable:
 *
 * - **`client`** - Application identifier and metadata
 * - **`organization`** - Organization ID and metadata (for Auth0 Organizations)
 * - **`prompt`** - Current prompt name (e.g., "login", "consent", "mfa")
 * - **`screen`** - Current screen name (e.g., "login-id", "login-password", "mfa-otp-challenge")
 * - **`tenant`** - Tenant configuration including enabled locales
 * - **`transaction`** - Transaction state, errors array, and current locale
 * - **`untrustedData`** - Authorization parameters from the client (validate before use)
 *
 * ## Key Points
 *
 * - Use `screen.name` for conditional rendering of authentication screens
 * - Always use optional chaining (`?.`) as nested properties can be `null`
 * - Check `transaction.errors` for displaying validation errors
 * - Access `organization.metadata` for organization-specific branding
 *
 * @returns {CurrentScreenOptions | null} Current screen context data, or `null` if not available
 *
 * @example
 * Basic screen routing
 * ```tsx
 * import { useCurrentScreen } from '@auth0/auth0-acul-react';
 *
 * const AuthFlow = () => {
 *   const screenOptions = useCurrentScreen();
 *   const screen = screenOptions?.screen?.name || "login-id";
 *
 *   switch (screen) {
 *     case "login-id":
 *       return <LoginIdScreen />;
 *     case "login-password":
 *       return <LoginPasswordScreen />;
 *     case "mfa-otp-challenge":
 *       return <MfaOtpChallengeScreen />;
 *     default:
 *       return null;
 *   }
 * };
 * ```
 *
 * @example
 * Accessing multiple properties
 * ```tsx
 * import { useCurrentScreen } from '@auth0/auth0-acul-react';
 *
 * const CustomAuthScreen = () => {
 *   const screenOptions = useCurrentScreen();
 *   const organizationId = screenOptions?.organization?.id;
 *   const errors = screenOptions?.transaction?.errors || [];
 *   const locale = screenOptions?.transaction?.locale || 'en';
 *
 *   return (
 *     <div>
 *       {organizationId && <p>Organization: {organizationId}</p>}
 *       {errors.map((error, i) => (
 *         <p key={i} className="error">{error.message}</p>
 *       ))}
 *       <p>Language: {locale}</p>
 *     </div>
 *   );
 * };
 * ```
 *
 */
export const useCurrentScreen = (): CurrentScreenOptions | null => {
  return getCurrentScreenOptions();
};
