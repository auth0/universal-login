import { ScreenIds, FormActions } from '../../constants';
import { BaseContext } from '../../models/base-context';
import { FormHandler } from '../../utils/form-handler';

import { ScreenOverride } from './screen-override';

import type { ScreenContext } from '../../../interfaces/models/screen';
import type {
  ResetPasswordMfaPhoneChallengeMembers,
  ScreenMembersOnResetPasswordMfaPhoneChallenge as ScreenOptions,
  ContinueOptions,
  TryAnotherMethodOptions,
} from '../../../interfaces/screens/reset-password-mfa-phone-challenge';
import type { FormOptions } from '../../../interfaces/utils/form-handler';

/**
 * @class ResetPasswordMfaPhoneChallenge
 * @extends {BaseContext}
 * Manages the interactions and state for the Reset Password MFA Phone Challenge screen.
 * It allows triggering the sending of verification codes via SMS or voice call and
 * provides functionality to switch to a different MFA method.
 */
export default class ResetPasswordMfaPhoneChallenge extends BaseContext implements ResetPasswordMfaPhoneChallengeMembers {
  /**
   * The unique identifier for this screen, used internally and for telemetry.
   * @type {string}
   */
  static screenIdentifier: string = ScreenIds.RESET_PASSWORD_MFA_PHONE_CHALLENGE; // Use the exact screen name from context definition

  /**
   * Holds the specific screen data and properties, processed by ScreenOverride.
   * @type {ScreenOptions}
   */
  screen: ScreenOptions;

  /**
   * Initializes a new instance of the `ResetPasswordMfaPhoneChallenge` class.
   * It retrieves the screen context and sets up the screen-specific properties.
   * @throws {Error} If the Universal Login Context is not available or if the screen name doesn't match.
   */
  constructor() {
    super(); // Calls BaseContext constructor which handles context retrieval and validation
    const screenContext = this.getContext('screen') as ScreenContext;
    this.screen = new ScreenOverride(screenContext);
  }

  /**
   * Sends the verification code to the user's phone via the selected method (SMS or Voice).
   * Corresponds to the 'Continue' action in the OpenAPI definition (action: 'default').
   *
   * @param {ContinueOptions} payload - Contains the delivery type (`sms` or `voice`) and any optional custom data.
   * @returns {Promise<void>} A promise resolving upon successful submission to the server.
   * @throws {Error} If the form submission fails.
   * @example
   * ```typescript
   * const screen = new ResetPasswordMfaPhoneChallenge();
   * try {
   *   await screen.continue({ type: 'sms' });
   *   // Redirects to code entry screen on success
   * } catch (error) {
   *   console.error("Failed to send SMS code:", error);
   * }
   * ```
   */
  async continue(payload: ContinueOptions): Promise<void> {
    // Prepare options for the FormHandler
    const formHandlerOptions: FormOptions = {
      // The state token identifying the current transaction
      state: this.transaction.state,
      // Telemetry data identifying the screen and method for monitoring
      telemetry: [ResetPasswordMfaPhoneChallenge.screenIdentifier, 'continue'],
      // The route endpoint for this action (typically inferred if not provided)
      // As per OpenAPI, the endpoint is /u/mfa-phone-challenge
      route: '/u/mfa-phone-challenge',
    };

    // Construct the data payload to be sent in the form submission
    const submitPayload = {
      // Include any other custom options passed in the payload
      ...payload,
      // Set the action to 'default' as specified by the OpenAPI definition for this operation
      action: FormActions.DEFAULT,
    };

    // Use FormHandler to submit the data via a POST request
    await new FormHandler(formHandlerOptions).submitData(submitPayload);
  }

  /**
   * Initiates the process for the user to select a different MFA authenticator.
   * Corresponds to the 'Try Another Method' action in the OpenAPI definition (action: 'pick-authenticator').
   *
   * @param {TryAnotherMethodOptions} payload - Contains the *current* challenge type (`sms` or `voice`) as required by the API, and any optional custom data.
   * @returns {Promise<void>} A promise resolving upon successful submission to the server.
   * @throws {Error} If the form submission fails.
   * @example
   * ```typescript
   * const screen = new ResetPasswordMfaPhoneChallenge();
   * try {
   *   // Assuming the current screen was for SMS
   *   await screen.tryAnotherMethod({ type: 'sms' });
   *   // Redirects to authenticator selection screen on success
   * } catch (error) {
   *   console.error("Failed to switch MFA method:", error);
   * }
   * ```
   */
  async tryAnotherMethod(payload: TryAnotherMethodOptions): Promise<void> {
    // Prepare options for the FormHandler
    const formHandlerOptions: FormOptions = {
      // The state token identifying the current transaction
      state: this.transaction.state,
      // Telemetry data identifying the screen and method
      telemetry: [ResetPasswordMfaPhoneChallenge.screenIdentifier, 'tryAnotherMethod'],
      // The route endpoint for this action
      route: '/u/mfa-phone-challenge',
    };

    // Construct the data payload for the form submission
    const submitPayload = {
      // Include any other custom options passed in the payload
      ...payload,
      // Set the action to 'pick-authenticator' as specified by the OpenAPI definition
      action: FormActions.PICK_AUTHENTICATOR,
    };

    // Use FormHandler to submit the data
    await new FormHandler(formHandlerOptions).submitData(submitPayload);
  }
}

// Export the members and options interfaces for external use
export {
  ResetPasswordMfaPhoneChallengeMembers,
  ScreenOptions as ScreenMembersOnResetPasswordMfaPhoneChallenge,
  ContinueOptions,
  TryAnotherMethodOptions,
};

// Re-export common interfaces and base properties for convenience
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
