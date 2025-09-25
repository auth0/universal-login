import { FormActions, ScreenIds } from '../../constants';
import { BaseContext } from '../../models/base-context';
import { FormHandler } from '../../utils/form-handler';

import { ScreenOverride } from './screen-override';

import type { CustomOptions } from '../../../interfaces/common';
import type { ScreenContext } from '../../../interfaces/models/screen';
import type {
  MfaOtpEnrollmentCodeMembers,
  ContinueOptions,
  TryAnotherMethodOptions,
  ScreenMembersOnMfaOtpEnrollmentCode as ScreenOptions,
} from '../../../interfaces/screens/mfa-otp-enrollment-code';
import type { FormOptions } from '../../../interfaces/utils/form-handler';

/**
 * Class implementing the mfa-otp-enrollment-code screen functionality.
 * This screen is displayed when the user needs to enter the OTP code received during MFA enrollment.
 */
export default class MfaOtpEnrollmentCode extends BaseContext implements MfaOtpEnrollmentCodeMembers {
  /**
   * Screen identifier for validation and telemetry
   */
  static screenIdentifier: string = ScreenIds.MFA_OTP_ENROLLMENT_CODE;
  /**
   * The screen properties for the mfa-otp-enrollment-code screen.
   */
  screen: ScreenOptions;

  /**
   * Creates an instance of MfaOtpEnrollmentCode.
   */
  constructor() {
    super();
    const screenContext = this.getContext('screen') as ScreenContext;
    this.screen = new ScreenOverride(screenContext);
  }

  /**
   * Continues the MFA OTP enrollment process by submitting the OTP code.
   *
   * @param {ContinueOptions} payload - The options containing the OTP code.
   * @returns {Promise<void>}
   * @example
   * ```typescript
   * import MfaOtpEnrollmentCode from '@auth0/auth0-acul-js/mfa-otp-enrollment-code';
   *
   * const mfaOtpEnrollmentCode = new MfaOtpEnrollmentCode();
   * await mfaOtpEnrollmentCode.continue({
   *   code: '123456',
   * });
   * ```
   */
  async continue(payload: ContinueOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [MfaOtpEnrollmentCode.screenIdentifier, 'continue'],
    };
    await new FormHandler(options).submitData<ContinueOptions>({
      ...payload,
      action: FormActions.DEFAULT,
    });
  }

  /**
   * Allows the user to try another MFA method.
   *
   * @param {TryAnotherMethodOptions} [payload] - Optional payload.
   * @returns {Promise<void>}
   * @example
   * ```typescript
   * import MfaOtpEnrollmentCode from '@auth0/auth0-acul-js/mfa-otp-enrollment-code';
   *
   * const mfaOtpEnrollmentCode = new MfaOtpEnrollmentCode();
   * await mfaOtpEnrollmentCode.tryAnotherMethod();
   * ```
   */
  async tryAnotherMethod(payload?: TryAnotherMethodOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [MfaOtpEnrollmentCode.screenIdentifier, 'tryAnotherMethod'],
    };
    await new FormHandler(options).submitData<CustomOptions>({
      ...payload,
      action: FormActions.PICK_AUTHENTICATOR,
    });
  }
}

export { MfaOtpEnrollmentCodeMembers, ContinueOptions, TryAnotherMethodOptions, ScreenOptions as ScreenMembersOnMfaOtpEnrollmentCode };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
