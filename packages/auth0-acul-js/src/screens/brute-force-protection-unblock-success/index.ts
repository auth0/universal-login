import { BaseContext } from '../../models/base-context';
import { FormHandler } from '../../utils/form-handler';

import type { CustomOptions } from '../../../interfaces/common';
import type { ScreenMembers } from '../../../interfaces/models/screen';
import type {
  BruteForceProtectionUnblockSuccessMembers,
  SubmitOTPCodeOptions,
  ResendCodeOptions,
  CancelMFAOptions
} from '../../../interfaces/screens/brute-force-protection-unblock-success';
import type { FormOptions } from '../../../interfaces/utils/form-handler';

/**
 * Represents the Brute Force Protection Unblock Success screen.
 */
export default class BruteForceProtectionUnblockSuccess extends BaseContext implements BruteForceProtectionUnblockSuccessMembers {
  screen: ScreenMembers;

  /**
   * Creates an instance of BruteForceProtectionUnblockSuccess.
   */
  constructor() {
    super();
    this.screen = this.getContext('screen') as ScreenMembers;
  }

  /**
   * Submits the OTP code to complete the MFA challenge.
   * @param payload The payload containing the OTP code and MFA token.
   * @throws {Error} If the OTP code or MFA token is missing.
   * @example
   * ```typescript
   * import { BruteForceProtectionUnblockSuccess } from '@auth0/auth0-acul-js/brute-force-protection-unblock-success';
   *
   * const bruteForceProtectionUnblockSuccess = new BruteForceProtectionUnblockSuccess();
   * bruteForceProtectionUnblockSuccess.submitOTPCode({
   *   otp: '123456',
   *   mfa_token: 'some_mfa_token',
   * });
   * ```
   */
  async submitOTPCode(payload: SubmitOTPCodeOptions): Promise<void> {
    if (!payload.otp) {
      throw new Error('OTP code is required.');
    }
    if (!payload.mfa_token) {
      throw new Error('MFA token is required.');
    }

    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [],
    };
    await new FormHandler(options).submitData(payload);
  }

  /**
   * Resends the OTP code to the user's phone number.
   * @param payload The payload containing the MFA token.
   * @throws {Error} If the MFA token is missing.
   * @example
   * ```typescript
   * import { BruteForceProtectionUnblockSuccess } from '@auth0/auth0-acul-js/brute-force-protection-unblock-success';
   *
   * const bruteForceProtectionUnblockSuccess = new BruteForceProtectionUnblockSuccess();
   * bruteForceProtectionUnblockSuccess.resendCode({
   *   mfa_token: 'some_mfa_token',
   * });
   * ```
   */
  async resendCode(payload: ResendCodeOptions): Promise<void> {
    if (!payload.mfa_token) {
      throw new Error('MFA token is required.');
    }

    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [],
    };
    await new FormHandler(options).submitData({
      ...payload,
      action: 'resend',
    });
  }

  /**
   * Cancels the MFA process and returns to the previous screen.
   * @param payload The payload containing the MFA token.
   * @throws {Error} If the MFA token is missing.
   * @example
   * ```typescript
   * import { BruteForceProtectionUnblockSuccess } from '@auth0/auth0-acul-js/brute-force-protection-unblock-success';
   *
   * const bruteForceProtectionUnblockSuccess = new BruteForceProtectionUnblockSuccess();
   * bruteForceProtectionUnblockSuccess.cancelMFA({
   *   mfa_token: 'some_mfa_token',
   * });
   * ```
   */
  async cancelMFA(payload: CancelMFAOptions, options?: CustomOptions): Promise<void> {
    if (!payload.mfa_token) {
      throw new Error('MFA token is required.');
    }

    const formOptions: FormOptions = {
      state: this.transaction.state,
      telemetry: [],
    };

    await new FormHandler(formOptions).submitData({
      ...payload,
      action: 'cancel',
      ...options,
    });
  }
}

export { BruteForceProtectionUnblockSuccessMembers, SubmitOTPCodeOptions, ResendCodeOptions, CancelMFAOptions };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
