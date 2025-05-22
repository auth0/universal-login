import { ScreenIds } from '../../constants';
import { BaseContext } from '../../models/base-context';

import { ScreenOverride } from './screen-override';

import type { ScreenContext } from '../../../interfaces/models/screen';
import type {
  MfaEnrollResultMembers,
  ScreenMembersOnMfaEnrollResult as ScreenOptions,
} from '../../../interfaces/screens/mfa-enroll-result';

/**
 * @class MfaEnrollResult
 * @extends BaseContext
 * implements MfaEnrollResultMembers
 * description Manages the interactions and data for the MFA Enroll Result screen.
 * This screen displays the outcome of an MFA enrollment process.
 * It is primarily informational.
 *
 * @example
 * ```typescript
 * import MfaEnrollResult from '@auth0/auth0-acul-js/mfa-enroll-result';
 *
 * const mfaEnrollResultScreen = new MfaEnrollResult();
 *
 * // Access screen data
 * const enrollmentStatus = mfaEnrollResultScreen.screen.data?.status;
 * const pageTitle = mfaEnrollResultScreen.screen.texts?.title;
 *
 * console.log(`MFA Enrollment Status: ${enrollmentStatus}`);
 * console.log(`Page Title: ${pageTitle}`);
 * ```
 */
export default class MfaEnrollResult extends BaseContext implements MfaEnrollResultMembers {
  /**
   * static
   * @property {string} screenIdentifier - The unique identifier for the MFA Enroll Result screen.
   */
  static screenIdentifier: string = ScreenIds.MFA_ENROLL_RESULT;

  /**
   * @property {ScreenOptions} screen - Holds the specific screen data and properties for the
   * MFA Enroll Result screen, including the enrollment `status`.
   * @public
   */
  public screen: ScreenOptions;

  /**
   * Creates an instance of MfaEnrollResult screen manager.
   * It initializes the `BaseContext` and sets up the `screen` property
   * with an instance of `ScreenOverride` tailored for this screen.
   * @throws {Error} If the Universal Login Context is not available or if the
   * current screen name in the context does not match `MfaEnrollResult.screenIdentifier`.
   */
  constructor() {
    super(); // Calls BaseContext constructor for global context initialization and validation.
    const screenContext = this.getContext('screen') as ScreenContext;
    this.screen = new ScreenOverride(screenContext);
  }

  // This screen is typically informational.
  // If there's a "Continue" button, it would likely be a default action.
  // For example, if a `continue()` method was needed:
  /*
  async continue(payload?: CustomOptions): Promise<void> {
    const formOptions: SDKFormOptions = {
      state: this.transaction.state,
      telemetry: [MfaEnrollResult.screenIdentifier, 'continue'],
      route: '/u/mfa-enroll-result', // Assuming this is the endpoint
    };
    await new FormHandler(formOptions).submitData({ ...payload, action: FormActions.DEFAULT });
  }
  */
}

// Export the primary class and its relevant member and options interfaces.
export { MfaEnrollResultMembers, ScreenOptions as ScreenMembersOnMfaEnrollResult };
// Re-export common interfaces and base properties for convenience.
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
