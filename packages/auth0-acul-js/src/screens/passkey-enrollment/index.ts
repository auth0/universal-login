import { ScreenOverride } from './screen-override';
import type { CustomOptions } from '../../../interfaces/common';
import type { ScreenContext } from '../../../interfaces/models/screen';
import type { PasskeyEnrollmentMembers, ScreenMembersOnPasskeyEnrollment as ScreenOptions } from '../../../interfaces/screens/passkey-enrollment';
import type { FormOptions } from '../../../interfaces/utils/form-handler';
import { BaseContext } from '../../models/base-context';
import { FormHandler } from '../../utils/form-handler';
import { createPasskeyCredentials } from '../../utils/passkeys';

export default class PasskeyEnrollment extends BaseContext implements PasskeyEnrollmentMembers {
  screen: ScreenOptions;

  constructor() {
    super();

    const screenContext = this.getContext('screen') as ScreenContext;

    this.screen = new ScreenOverride(screenContext);
  }

  /**
   * @example
   * import PasskeyEnrollment from '@auth0/auth0-acul-js/passkey-enrollment';
   *
   * const passkeyEnrollment = new PasskeyEnrollment();
   * passkeyEnrollment.continuePasskeyEnrollment();
   */
  async continuePasskeyEnrollment(payload?: CustomOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
    };

    const publicKey = this.screen.publicKey;
    const encoded = publicKey && createPasskeyCredentials(publicKey);

    await new FormHandler(options).submitData<CustomOptions>({ ...payload, passkey: JSON.stringify(encoded) });
  }

  /**
   * @example
   * import PasskeyEnrollment from '@auth0/auth0-acul-js/passkey-enrollment';
   *
   * const passkeyEnrollment = new PasskeyEnrollment();
   * passkeyEnrollment.abortPasskeyEnrollment();
   */
  async abortPasskeyEnrollment(payload?: CustomOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
    };

    await new FormHandler(options).submitData<CustomOptions>({ ...payload, action: 'abort-passkey-enrollment' });
  }
}

export {
  PasskeyEnrollmentMembers
}
