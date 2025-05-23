import type { CustomOptions } from '../../interfaces/common';
import type { BaseMembers } from '../../interfaces/models/base-context';
import type { Scope, AuthorizationDetail, ScreenMembers } from '../../interfaces/models/screen';

/**
 * @interface ScreenMembersOnCustomizedConsent
 * @extends ScreenMembers
 * description Defines the specific properties available on the `screen` object for the 'customized-consent' screen.
 * This screen is presented when a user needs to consent to specific scopes and potentially detailed authorization requests.
 *
 * @property {object | null} data - Screen-specific data.
 * @property {Scope[]} data.scopes - An array of {@link Scope} objects detailing each permission (scope) being requested.
 *                                   These are typically high-level permissions like 'read:profile' or 'openid'.
 * @property {AuthorizationDetail[]} data.authorization_details - An array of {@link AuthorizationDetail} objects.
 *                                                              Each object provides granular details about specific data or
 *                                                              actions the application wants to perform, potentially related to
 *                                                              Rich Authorization Requests (RAR).
 */
export interface ScreenMembersOnCustomizedConsent extends ScreenMembers {
  /**
   * An array of {@link Scope} objects detailing each permission (scope) being requested.
   * These are typically high-level permissions like 'read:profile' or 'openid'.
   * This list should be displayed to the user for their review.
   * @type {Scope[]}
   */
  scopes: Scope[];

  /**
   * An array of {@link AuthorizationDetail} objects.
   * Each object provides granular details about specific data or
   * actions the application wants to perform, potentially related to
   * Rich Authorization Requests (RAR) or other fine-grained permission models.
   * This list should be displayed to the user for their review.
   * @type {AuthorizationDetail[]}
   */
  authorizationDetails: AuthorizationDetail[];
}

/**
 * @interface CustomizedConsentMembers
 * @extends BaseMembers
 * description Defines all accessible members (properties and methods) for the Customized Consent screen.
 * This screen allows a user to grant or deny an application's request for access, which can include
 * standard OAuth scopes and more detailed authorization requests. The SDK provides methods to `accept` or `deny` this consent.
 *
 * The `universal_login_context` for this screen (`window.universal_login_context`) will contain:
 * - `client`: Information about the application requesting consent.
 * - `organization` (optional): Details if the consent is in the context of an organization.
 * - `prompt`: Context of the current authentication prompt (e.g., 'customized-consent').
 * - `screen`: UI texts and screen-specific data (`scopes`, `authorization_details`).
 * - `transaction`: Details of the ongoing transaction, including state and any errors from previous attempts.
 * - `user`: Information about the user who is being asked for consent.
 */
export interface CustomizedConsentMembers extends BaseMembers {
  /**
   * Provides access to the specific properties and data of the Customized Consent screen,
   * including the list of `scopes` and `authorizationDetails` being requested.
   * @type {ScreenMembersOnCustomizedConsent}
   */
  screen: ScreenMembersOnCustomizedConsent;

  /**
   * Submits the user's decision to accept (grant) the requested permissions and authorization details.
   * This action posts to the `/u/customized-consent` endpoint with `action: "accept"`.
   * The transaction state is automatically included.
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
   * // Assuming 'customizedConsentManager' is an instance of the CustomizedConsent SDK class
   * try {
   *   await customizedConsentManager.accept();
   *   // If successful, the page will typically redirect.
   * } catch (error) {
   *   // Handle unexpected errors during the submission itself.
   *   console.error("Failed to submit consent acceptance:", error);
   * }
   * // After the await, check customizedConsentManager.transaction.errors for server-side validation issues.
   * ```
   */
  accept(payload?: CustomOptions): Promise<void>;

  /**
   * Submits the user's decision to deny (reject) the requested permissions and authorization details.
   * This action posts to the `/u/customized-consent` endpoint with `action: "deny"`.
   * The transaction state is automatically included.
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
   * // Assuming 'customizedConsentManager' is an instance of the CustomizedConsent SDK class
   * try {
   *   await customizedConsentManager.deny({ reason_code: "user_rejected_details" }); // Example custom option
   *   // If successful, the page will typically redirect.
   * } catch (error) {
   *   console.error("Failed to submit consent denial:", error);
   * }
   * // After the await, check customizedConsentManager.transaction.errors for server-side validation issues.
   * ```
   */
  deny(payload?: CustomOptions): Promise<void>;
}