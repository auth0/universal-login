import { type BaseMembers } from '@auth0/auth0-acul-js';

/**
 * Factory class that creates context hooks for accessing Auth0 Universal Login data.
 * These hooks provide access to various aspects of the authentication flow and tenant configuration.
 */
export class ContextHooks<T extends BaseMembers> {
  constructor(private instance: T) {}

  /**
   * Hook to access user information and profile data.
   * @returns User object containing profile information, attributes, and user-specific data
   * @example
   * ```jsx
   * import { useUser } from '@auth0/auth0-acul-react/login-id';
   * function UserProfile() {
   *   const user = useUser();
   * }
   * ```
   */
  useUser = () => this.instance.user as T['user'];

  /**
   * Hook to access tenant configuration and settings.
   * @returns Tenant object containing domain, region, and tenant-specific configuration
   * @example
   * ```jsx
   * import { useTenant } from '@auth0/auth0-acul-react/login-id';
   * function TenantInfo() {
   *   const tenant = useTenant();
   * }
   * ```
   */
  useTenant = () => this.instance.tenant as T['tenant'];

  /**
   * Hook to access branding and theme configuration.
   * @returns Branding object containing colors, logos, fonts, and visual customization settings
   * @example
   * ```jsx
   * import { useBranding } from '@auth0/auth0-acul-react/login-id';
   * function CustomTheme() {
   *   const branding = useBranding();
   * }
   * ```
   */
  useBranding = () => this.instance.branding as T['branding'];

  /**
   * Hook to access Auth0 application (client) configuration.
   * @returns Client object containing application settings, callbacks, and client-specific data
   * @example
   * ```jsx
   * import { useClient } from '@auth0/auth0-acul-react/login-id';
   * function AppInfo() {
   *   const client = useClient();
   * }
   * ```
   */
  useClient = () => this.instance.client as T['client'];

  /**
   * Hook to access organization context and settings.
   * @returns Organization object containing org-specific data, metadata, and configuration
   * @example
   * ```jsx
   * import { useOrganization } from '@auth0/auth0-acul-react/login-id';
   * function OrgSelector() {
   *   const organization = useOrganization();
   *   if (!organization) {
   *     return <p>No organization context</p>;
   *   }
   * }
   * ```
   */
  useOrganization = () => this.instance.organization as T['organization'];

  /**
   * Hook to access prompt configuration and flow settings.
   * @returns Prompt object containing flow configuration, screen settings, and prompt-specific data
   * @example
   * ```jsx
   * import { usePrompt } from '@auth0/auth0-acul-react/login-id';
   * function FlowInfo() {
   *   const prompt = usePrompt();
   * }
   * ```
   */
  usePrompt = () => this.instance.prompt as T['prompt'];

  /**
   * Hook to access untrusted data from URL parameters and form submissions.
   * @returns Object containing untrusted user input that should be validated before use
   * @example
   * ```jsx
   * import { useUntrustedData } from '@auth0/auth0-acul-react/login-id';
   * function PrefilledForm() {
   *   const untrustedData = useUntrustedData();
   * }
   * ```
   */
  useUntrustedData = () => this.instance.untrustedData as T['untrustedData'];

  /**
   * Hook to access current screen information and metadata.
   * @returns Screen object containing current screen name, configuration, and screen-specific data
   * @example
   * ```jsx
   * import { useScreen } from '@auth0/auth0-acul-react/login-id';
   * function ScreenDebug() {
   *   const screen = useScreen();
   * }
   * ```
   */
  useScreen = () => this.instance.screen as T['screen'];

  /**
   * Hook to access transaction state and authentication flow data.
   * @returns Transaction object containing flow state, session data, and transaction-specific information
   * @example
   * ```jsx
   * import { useTransaction } from '@auth0/auth0-acul-react/login-id';
   * function TransactionInfo() {
   *   const transaction = useTransaction();
   * }
   * ```
   */
  useTransaction = () => this.instance.transaction as T['transaction'];
}
