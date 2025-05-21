import { ScreenIds, FormActions } from '../../constants';
import { BaseContext } from '../../models/base-context';
import { FormHandler } from '../../utils/form-handler';

import { ScreenOverride } from './screen-override';

import type { CustomOptions } from '../../../interfaces/common';
import type { Scope, AuthorizationDetail, ScreenContext } from '../../../interfaces/models/screen';
import type { CustomizedConsentMembers, ScreenMembersOnCustomizedConsent } from '../../../interfaces/screens/customized-consent';
import type { FormOptions as SDKFormOptions } from '../../../interfaces/utils/form-handler';

/**
 * @class CustomizedConsent
 * @extends BaseContext
 * implements CustomizedConsentMembers
 * description Manages interactions for the "customized-consent" screen.
 * This screen allows users to review and consent to an application's request for
 * specific OAuth scopes and potentially more detailed authorization details (e.g., RAR).
 *
 * It provides methods to `accept` or `deny` the consent request.
 *
 * @example
 * ```typescript
 * // How to use the CustomizedConsent screen SDK:
 * import CustomizedConsent from '@auth0/auth0-acul-js/customized-consent';
 *
 * // Instantiate the manager for the customized consent screen
 * const consentManager = new CustomizedConsent();
 *
 * // Accessing screen data
 * const clientName = consentManager.client.name;
 * const userEmail = consentManager.user.email;
 * const requestedScopes = consentManager.screen.scopes;
 * const authorizationDetails = consentManager.screen.authorizationDetails;
 *
 * console.log(`${clientName} is requesting consent from ${userEmail}.`);
 * console.log("Requested Scopes:", requestedScopes);
 * console.log("Authorization Details:", authorizationDetails);
 *
 * // Accessing transaction errors from a previous attempt
 * const transactionErrors = consentManager.transaction.errors;
 * if (transactionErrors && transactionErrors.length > 0) {
 *   transactionErrors.forEach(error => {
 *     console.error(`Error: ${error.message}`);
 *     // Display these errors to the user.
 *   });
 * }
 *
 * // Example of handling consent acceptance
 * async function onAcceptConsent() {
 *   try {
 *     await consentManager.accept();
 *     // On success, Auth0 will typically redirect.
 *   } catch (e) {
 *     console.error('Failed to accept consent:', e);
 *   }
 * }
 *
 * // Example of handling consent denial
 * async function onDenyConsent() {
 *   try {
 *     await consentManager.deny({ denial_reason: "user_declined" });
 *     // On success, Auth0 will typically redirect.
 *   } catch (e) {
 *     console.error('Failed to deny consent:', e);
 *   }
 * }
 * ```
 */
export default class CustomizedConsent extends BaseContext implements CustomizedConsentMembers {
  /**
   * The unique identifier for the Customized Consent screen.
   * This static property is used by the SDK's `BaseContext` to ensure that the
   * class is instantiated in the correct screen context.
   * @type {string}
   * static
   * @readonly
   */
  static screenIdentifier: string = ScreenIds.CUSTOMIZED_CONSENT;

  /**
   * Holds the specific screen data and properties for the Customized Consent screen,
   * processed by `ScreenOverride`. This includes `scopes` and `authorizationDetails`.
   * @type {ScreenMembersOnCustomizedConsent}
   * @public
   */
  public screen: ScreenMembersOnCustomizedConsent;

  /**
   * Creates an instance of the `CustomizedConsent` screen manager.
   * The constructor initializes the `BaseContext` and sets up the `screen` property
   * with an instance of `ScreenOverride` tailored for the customized consent screen.
   * @throws {Error} If the Universal Login Context is not available or if the
   * current screen name in the context does not match `CustomizedConsent.screenIdentifier`.
   */
  constructor() {
    super();
    const screenContext = this.getContext('screen') as ScreenContext;
    this.screen = new ScreenOverride(screenContext);
  }

  /**
   * Submits the user's decision to accept (grant) the requested permissions and authorization details.
   * This method prepares and posts form data to the `/u/customized-consent?state=<transaction_state>` endpoint
   * with `action: "accept"`. The transaction state is automatically included in both the
   * URL query parameter and the form body.
   *
   * @param {CustomOptions} [payload] - Optional. An object for any custom key-value pairs
   *                                    to be sent with the request. These parameters will be
   *                                    included in the form data submitted to the server.
   * @returns {Promise<void>} A promise that resolves once the form submission is initiated.
   *                          Typically, a successful submission leads to a server-side redirect.
   * @throws {Error} Throws an error if `FormHandler` encounters an unrecoverable issue
   *                 during submission (e.g., network error). Server-side validation errors
   *                 from Auth0 (like "invalid_request") are not thrown as JavaScript errors
   *                 but are made available in `this.transaction.errors` after the operation.
   */
  async accept(payload?: CustomOptions): Promise<void> {
    const route = `/u/customized-consent?state=${this.transaction.state}`;
    const formOptions: SDKFormOptions = {
      state: this.transaction.state, // For form body
      telemetry: [CustomizedConsent.screenIdentifier, 'accept'],
      route: route, // For form action URL
    };
    const submitPayload = {
      ...payload,
      action: FormActions.ACCEPT,
    };
    await new FormHandler(formOptions).submitData<typeof submitPayload>(submitPayload);
  }

  /**
   * Submits the user's decision to deny (reject) the requested permissions and authorization details.
   * This method prepares and posts form data to the `/u/customized-consent?state=<transaction_state>` endpoint
   * with `action: "deny"`. The transaction state is automatically included in both the
   * URL query parameter and the form body.
   *
   * @param {CustomOptions} [payload] - Optional. An object for any custom key-value pairs
   *                                    to be sent with the request. These parameters will be
   *                                    included in the form data submitted to the server.
   * @returns {Promise<void>} A promise that resolves once the form submission is initiated.
   *                          A successful submission usually results in a server-side redirect.
   * @throws {Error} Throws an error if `FormHandler` encounters an issue (e.g., network error).
   *                 Server-side validation errors are reflected in `this.transaction.errors`.
   */
  async deny(payload?: CustomOptions): Promise<void> {
    const route = `/u/customized-consent?state=${this.transaction.state}`;
    const formOptions: SDKFormOptions = {
      state: this.transaction.state, // For form body
      telemetry: [CustomizedConsent.screenIdentifier, 'deny'],
      route: route, // For form action URL
    };
    const submitPayload = {
      ...payload,
      action: FormActions.DENY,
    };
    await new FormHandler(formOptions).submitData<typeof submitPayload>(submitPayload);
  }
}

// Export all necessary types and members for this screen
export { CustomizedConsentMembers, ScreenMembersOnCustomizedConsent, Scope, AuthorizationDetail };
export * from '../../../interfaces/export/common'; // Re-export common types
export * from '../../../interfaces/export/base-properties'; // Re-export base model members