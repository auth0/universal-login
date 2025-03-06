import { BaseContext } from '../../models/base-context';
import { FormHandler } from '../../utils/form-handler';

import { ScreenOverride } from './screen-override';

import type { CustomOptions } from '../../../interfaces/common';
import type { ScreenContext } from '../../../interfaces/models/screen';
import type {
  MfaPushEnrollmentQrMembers,
  ScreenMembersOnMfaPushEnrollmentQr as ScreenOptions,
} from '../../../interfaces/screens/mfa-push-enrollment-qr';
import type { FormOptions } from '../../../interfaces/utils/form-handler';

/**
 * Class implementing the mfa-push-enrollment-qr screen functionality
 */
export default class MfaPushEnrollmentQr extends BaseContext implements MfaPushEnrollmentQrMembers {
  static screenIdentifier: string = 'mfa-push-enrollment-qr';
  screen: ScreenOptions;

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
   * import MfaPushEnrollmentQr from '@auth0/auth0-acul-js/mfa-push-enrollment-qr';
   *
   * const mfaPushEnrollmentQr = new MfaPushEnrollmentQr();
   * await mfaPushEnrollmentQr.pickAuthenticator();
   * ```
   */
  async pickAuthenticator(payload?: CustomOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
    };
    await new FormHandler(options).submitData<CustomOptions>({
      ...payload,
      action: 'pick-authenticator',
    });
  }
}

export { MfaPushEnrollmentQrMembers, ScreenOptions as ScreenMembersOnMfaPushEnrollmentQr };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
