import type { CustomOptions } from '../common';
import type { BaseMembers } from '../models/base-context';
import type { Scope, ScreenMembers } from '../models/screen';

/**
 * @interface ScreenMembersOnConsent
 * @extends ScreenMembers
 * description Defines the specific properties available on the `screen.data` object for the 'consent' screen.
 * This screen is presented to the user to request their permission for an application to access certain data or perform actions
 * on their behalf, as defined by a list of scopes.
 *
 * @property {object | null} data - Screen-specific data.
 * @property {Scope[]} data.scopes - An array of {@link Scope} objects detailing each permission being requested.
 *                                   This is the core information displayed to the user on the consent screen.
 * @property {boolean} data.hideScopes - A boolean flag indicating whether the list of scopes should be hidden from the user.
 *                                       If true, the consent screen might show a more generic approval request without
 *                                       listing individual scopes. This is typically used in scenarios where the scopes
 *                                       are implicitly understood or too numerous to display effectively.
 */
export interface ScreenMembersOnConsent extends ScreenMembers {
  scopes: Scope[];
  hideScopes: boolean;
}

/**
 * @interface ConsentMembers
 * @extends BaseMembers
 * description Defines all accessible members (properties and methods) for the Consent screen.
 * This screen allows a user to grant or deny an application's request for access (defined by scopes).
 * The SDK provides methods to `accept` or `deny` this consent request.
 *
 * The `universal_login_context` for this screen (`window.universal_login_context`) will contain:
 * - `client`: Information about the application requesting consent.
 * - `organization` (optional): Details if the consent is in the context of an organization.
 * - `prompt`: Context of the current authentication prompt (e.g., 'consent').
 * - `screen`: UI texts and screen-specific data (`scopes`, `hideScopes`).
 * - `transaction`: Details of the ongoing transaction, including state and any errors.
 * - `user`: Information about the user who is being asked for consent.
 */
export interface ConsentMembers extends BaseMembers {
  /**
   * Provides access to the specific properties and data of the Consent screen,
   * including the list of `scopes` being requested and the `hideScopes` flag.
   * @type {ScreenMembersOnConsent}
   */
  screen: ScreenMembersOnConsent;

  /**
   * Submits the user's decision to accept (grant) the requested permissions.
   * This action posts to the `/u/consent` endpoint with `action: "accept"`.
   *
   * @param {CustomOptions} [payload] - Optional. An object for any custom key-value pairs
   *                                    to be sent with the request. These parameters will be
   *                                    included in the form data submitted to the server.
   * @returns {Promise<void>} A promise that resolves when the accept action is successfully submitted.
   *                          On success, Auth0 typically redirects the user back to the application
   *                          or to the next step in the authentication flow.
   * @throws {Error} Throws an error if the form submission fails (e.g., network issue, invalid state).
   *                 Server-side errors (like "invalid_request") will be reflected in `this.transaction.errors`
   *                 after the operation, rather than being thrown as JavaScript errors.
   *
   * @example
   * ```typescript
   * // Assuming 'consentManager' is an instance of the Consent screen SDK class
   * try {
   *   await consentManager.accept();
   *   // If successful, the page will typically redirect.
   * } catch (error) {
   *   // Handle unexpected errors during the submission itself.
   *   console.error("Failed to submit consent acceptance:", error);
   * }
   * // After the await, check consentManager.transaction.errors for server-side validation issues.
   * ```
   */
  accept(payload?: CustomOptions): Promise<void>;

  /**
   * Submits the user's decision to deny (reject) the requested permissions.
   * This action posts to the `/u/consent` endpoint with `action: "deny"`.
   *
   * @param {CustomOptions} [payload] - Optional. An object for any custom key-value pairs
   *                                    to be sent with the request. These parameters will be
   *                                    included in the form data submitted to the server.
   * @returns {Promise<void>} A promise that resolves when the deny action is successfully submitted.
   *                          On success, Auth0 typically redirects the user, potentially showing an
   *                          access denied message or returning an error to the application.
   * @throws {Error} Throws an error if the form submission fails (e.g., network issue, invalid state).
   *                 Server-side errors are reflected in `this.transaction.errors`.
   *
   * @example
   * ```typescript
   * // Assuming 'consentManager' is an instance of the Consent screen SDK class
   * try {
   *   await consentManager.deny({ reason: "user_declined" }); // Example custom option
   *   // If successful, the page will typically redirect.
   * } catch (error) {
   *   console.error("Failed to submit consent denial:", error);
   * }
   * // After the await, check consentManager.transaction.errors for server-side validation issues.
   * ```
   */
  deny(payload?: CustomOptions): Promise<void>;
}