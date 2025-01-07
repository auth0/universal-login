import { ScreenOverride } from './screen-override';
import type { CustomOptions } from '../../../interfaces/common';
import type { ScreenContext } from '../../../interfaces/models/screen';
import type {
  PasskeyEnrollmentLocalMembers,
  ScreenMembersOnPasskeyEnrollmentLocal as ScreenOptions,
  AbortEnrollmentOptions,
} from '../../../interfaces/screens/passkey-enrollment-local';
import type { FormOptions } from '../../../interfaces/utils/form-handler';
import { BaseContext } from '../../models/base-context';
import { FormHandler } from '../../utils/form-handler';
import { createPasskeyCredentials } from '../../utils/passkeys';

export default class PasskeyEnrollmentLocal extends BaseContext implements PasskeyEnrollmentLocalMembers {
  screen: ScreenOptions;

  constructor() {
    super();

    const screenContext = this.getContext('screen') as ScreenContext;

    this.screen = new ScreenOverride(screenContext);
  }

  /**
   * @example
   * import PasskeyEnrollmentLocal from '@auth0/auth0-acul-js/passkey-enrollment-local';
   *
   * const passkeyEnrollment = new PasskeyEnrollmentLocal();
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
   * import PasskeyEnrollmentLocal from '@auth0/auth0-acul-js/passkey-enrollment-local';
   *
   * const passkeyEnrollment = new PasskeyEnrollmentLocal();
   * passkeyEnrollment.abortPasskeyEnrollment({
   *     doNotShowAgain: <boolean>
   * });
   */
  async abortPasskeyEnrollment(payload: AbortEnrollmentOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
    };

    const userActions: { [key: string]: string } = {};
    if (payload['doNotShowAgain'] === true) {
      userActions['dontShowAgain'] = 'on';
    }
    await new FormHandler(options).submitData<AbortEnrollmentOptions>({ ...payload, action: 'abort-passkey-enrollment', ...userActions });
  }
}

export {
  PasskeyEnrollmentLocalMembers,
  AbortEnrollmentOptions
}
