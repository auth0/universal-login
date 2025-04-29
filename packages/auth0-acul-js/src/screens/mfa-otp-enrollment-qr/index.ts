import { FormActions } from '../../../src/constants';
import { BaseContext } from '../../models/base-context';
import { FormHandler } from '../../utils/form-handler';

import { ScreenOverride } from './screen-override';

import type { CustomOptions } from '../../../interfaces/common';
import type { ScreenContext } from '../../../interfaces/models/screen';
import type {
  MfaOtpEnrollmentQrMembers,
  ScreenMembersOnMfaOtpEnrollmentQr as ScreenOptions,
} from '../../../interfaces/screens/mfa-otp-enrollment-qr';
import type { FormOptions } from '../../../interfaces/utils/form-handler';

/**
 * Class implementing the mfa-otp-enrollment-qr screen functionality
 */
export default class MfaOtpEnrollmentQr extends BaseContext implements MfaOtpEnrollmentQrMembers {
  screen: ScreenOptions;

  /**
   * Creates an instance of MfaOtpEnrollmentQr screen manager
   */
  constructor() {
    super();
    const screenContext = this.getContext('screen') as ScreenContext;
    this.screen = new ScreenOverride(screenContext);
  }

  /**
   * Navigates to the authenticator selection screen.
   * @param payload Optional custom options to include with the request
   * @example
   * ```typescript
   * import MfaOtpEnrollmentQr from '@auth0/auth0-acul-js/mfa-otp-enrollment-qr';
   *
   * const mfaOtpEnrollmentQr = new MfaOtpEnrollmentQr();
   * await mfaOtpEnrollmentQr.toggleView();
   * ```
   */
  async toggleView(payload?: CustomOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [MfaOtpEnrollmentQr.screenIdentifier, 'toggleView'],
    };
    await new FormHandler(options).submitData<CustomOptions>({
      ...payload,
      action: FormActions.TOGGLE_VIEW,
    });
  }

  /**
   * Continues with the default action.
   * @param payload Optional custom options to include with the request
   * @example
   * ```typescript
   * import MfaOtpEnrollmentQr from '@auth0/auth0-acul-js/mfa-otp-enrollment-qr';
   *
   * const mfaOtpEnrollmentQr = new MfaOtpEnrollmentQr();
   * await mfaOtpEnrollmentQr.continue({ code: '123456' });
   * ```
   */
  async continue(payload: { code: string } & CustomOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [MfaOtpEnrollmentQr.screenIdentifier, 'continue'],
    };
    await new FormHandler(options).submitData({
      ...payload,
      action: FormActions.DEFAULT,
    });
  }

  /**
   * Navigates to the authenticator selection screen.
   * @param payload Optional custom options to include with the request
   * @example
   * ```typescript
   * import MfaOtpEnrollmentQr from '@auth0/auth0-acul-js/mfa-otp-enrollment-qr';
   *
   * const mfaOtpEnrollmentQr = new MfaOtpEnrollmentQr();
   * await mfaOtpEnrollmentQr.tryAnotherMethod();
   * ```
   */
  async tryAnotherMethod(payload?: CustomOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [MfaOtpEnrollmentQr.screenIdentifier, 'tryAnotherMethod'],
    };
    await new FormHandler(options).submitData<CustomOptions>({
      ...payload,
      action: FormActions.PICK_AUTHENTICATOR,
    });
  }
}

export { MfaOtpEnrollmentQrMembers, ScreenOptions as ScreenMembersOnMfaOtpEnrollmentQr };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
