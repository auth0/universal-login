import { FormActions, ScreenIds } from '../../constants';
import { BaseContext } from '../../models/base-context';
import { FormHandler } from '../../utils/form-handler';

import { ScreenOverride } from './screen-override';

import type { ScreenContext } from '../../../interfaces/models/screen';
import type {
  ContinueOptions,
  MfaRecoveryCodeChallengeNewCodeMembers,
  ScreenMembersOnMfaRecoveryCodeChallengeNewCode,
} from '../../../interfaces/screens/mfa-recovery-code-challenge-new-code';
import type { FormOptions } from '../../../interfaces/utils/form-handler';

/**
 * @class MfaRecoveryCodeChallengeNewCode
 * @extends BaseContext
 * implements MfaRecoveryCodeChallengeNewCodeMembers
 * description Manages the interactions and state for the 'mfa-recovery-code-challenge-new-code' screen.
 * This screen is crucial for ensuring the user securely stores their new recovery code after MFA enrollment.
 */
export default class MfaRecoveryCodeChallengeNewCode extends BaseContext implements MfaRecoveryCodeChallengeNewCodeMembers {
  /**
   * The unique identifier for this screen, used internally and for telemetry.
   * @type {string}
   */
  static screenIdentifier: string = ScreenIds.MFA_RECOVERY_CODE_CHALLENGE_NEW_CODE

  /**
   * Holds the specific screen data and properties, processed by ScreenOverride.
   * @type {ScreenMembersOnMfaRecoveryCodeChallengeNewCode}
   */
  screen: ScreenMembersOnMfaRecoveryCodeChallengeNewCode;

  /**
   * Initializes a new instance of the `MfaRecoveryCodeChallengeNewCode` class.
   * It retrieves the necessary context (screen, transaction, etc.) and sets up screen-specific properties.
   * @throws {Error} If the Universal Login Context is not available or if the screen name doesn't match.
   */
  constructor() {
    super(); // Calls BaseContext constructor
    const screenContext = this.getContext('screen') as ScreenContext;
    this.screen = new ScreenOverride(screenContext);
  }

  /**
   * Confirms that the user has saved the new recovery code and continues the authentication flow.
   * This method sends a POST request to the `/u/mfa-recovery-code-challenge-new-code` endpoint
   * with the required `state`, `action`, and `saved` parameters.
   *
   * @param {ContinueOptions} [payload] - Optional custom data to include with the request form body.
   * @returns {Promise<void>} A promise that resolves when the confirmation is successfully submitted.
   *                          On success, the browser will typically be redirected to the next step.
   * @throws {Error} Throws an error if the form submission fails (e.g., network issue, invalid state,
   *                 or if the server responds with a 400 error like 'no-confirmation').
   * @example
   * ```typescript
   * const screenManager = new MfaRecoveryCodeChallengeNewCode();
   * // Assuming a checkbox 'confirmSaved' is checked by the user
   * if (confirmSaved) {
   *   try {
   *     await screenManager.continue({ customData: 'optionalValue' });
   *   } catch (err) {
   *     // Handle errors, potentially check screenManager.transaction.errors
   *     console.error("Confirmation failed:", err);
   *   }
   * } else {
   *   // Prompt user to confirm saving the code
   * }
   * ```
   */
  async continue(payload?: ContinueOptions): Promise<void> {
    // Prepare options for the FormHandler, including state and telemetry
    const formHandlerOptions: FormOptions = {
      state: this.transaction.state,
      telemetry: [MfaRecoveryCodeChallengeNewCode.screenIdentifier, 'continue'],
      route: '/u/mfa-recovery-code-challenge-new-code', // Explicitly set the route
    };

    // Construct the data payload for the form submission
    // 'saved' is set to 'on' as calling this method implies user confirmation.
    // Include any custom payload properties.
    const submitPayload = {
      ...payload, // Spread custom options first
      action: FormActions.DEFAULT,
      saved: 'on', // Indicate confirmation
    };

    // Use FormHandler to submit the data via a POST request
    await new FormHandler(formHandlerOptions).submitData<typeof submitPayload>(submitPayload);
  }
}

// Export the members and options interfaces for external use
export {
  MfaRecoveryCodeChallengeNewCodeMembers,
  ContinueOptions,
  ScreenMembersOnMfaRecoveryCodeChallengeNewCode,
};

// Re-export common interfaces and base properties for convenience
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';