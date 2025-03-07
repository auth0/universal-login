import { BaseContext } from '../../models/base-context';
import { ScreenIds } from '../../utils/enums';
import { FormHandler } from '../../utils/form-handler';

import type { CustomOptions } from '../../../interfaces/common';
import type { ScreenContext } from '../../../interfaces/models/screen';
import type { MfaPushWelcomeMembers, ScreenMembersOnMfaPushWelcome as ScreenOptions } from '../../../interfaces/screens/mfa-push-welcome';
import type { FormOptions } from '../../../interfaces/utils/form-handler';

/**
 * @extends {BaseContext}
 * Implements the mfa-push-welcome screen functionality.
 */
export default class MfaPushWelcome extends BaseContext implements MfaPushWelcomeMembers {
  static screenIdentifier: string = ScreenIds.MFA_PUSH_WELCOME;
  screen: ScreenOptions;

  /**
   * Initializes the MfaPushWelcome screen with data from the Universal Login Context.
   */
  constructor() {
    super();
    const screenContext = this.getContext('screen') as ScreenContext;
    this.screen = screenContext as ScreenOptions;
  }

  /**
   * Navigates to the enrollment screen.
   * @param {CustomOptions} [payload] - Optional custom options to include with the request.
   * @example
   * ```typescript
   * import MfaPushWelcome from '@auth0/auth0-acul-js/mfa-push-welcome';
   *
   * const mfaPushWelcome = new MfaPushWelcome();
   * await mfaPushWelcome.enroll();
   * ```
   */
  async enroll(payload?: CustomOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
    };
    await new FormHandler(options).submitData<CustomOptions>({
      ...payload,
      action: 'enroll',
    });
  }

  /**
   * Navigates to the authenticator selection screen.
   * @param {CustomOptions} [payload] - Optional custom options to include with the request.
   * @example
   * ```typescript
   * import MfaPushWelcome from '@auth0/auth0-acul-js/mfa-push-welcome';
   *
   * const mfaPushWelcome = new MfaPushWelcome();
   * await mfaPushWelcome.pickAuthenticator();
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

export { MfaPushWelcomeMembers, ScreenOptions as ScreenMembersOnMfaPushWelcome };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
