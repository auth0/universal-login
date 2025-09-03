import { ScreenIds, FormActions } from '../../constants';
import { BaseContext } from '../../models/base-context';
import { FormHandler } from '../../utils/form-handler';

import { ScreenOverride } from './screen-override';

import type { CustomOptions } from '../../../interfaces/common';
import type { ScreenContext } from '../../../interfaces/models/screen';
import type {
  EmailChallengeOptions,
  EmailIdentifierChallengeMembers,
  ScreenMembersOnEmailIdentifierChallenge as ScreenOptions,
} from '../../../interfaces/screens/email-identifier-challenge';
import type { FormOptions } from '../../../interfaces/utils/form-handler';

export default class EmailIdentifierChallenge extends BaseContext implements EmailIdentifierChallengeMembers {
  screen: ScreenOptions;
  static screenIdentifier: string = ScreenIds.EMAIL_IDENTIFIER_CHALLENGE;

  constructor() {
    super();
    const screenContext = this.getContext('screen') as ScreenContext;
    this.screen = new ScreenOverride(screenContext);
  }

  /**
   * @example
   * import EmailIdentifierChallenge from '@auth0/auth0-acul-js/email-identifier-challenge';
   *
   * const emailIdentifierChallenge = new EmailIdentifierChallenge();
   * emailIdentifierChallenge.submitEmailChallenge({
   *     code: "<string>"
   * });
   */
  async submitEmailChallenge(payload: EmailChallengeOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [EmailIdentifierChallenge.screenIdentifier, 'submitEmailChallenge'],
    };
    await new FormHandler(options).submitData(payload);
  }

  /**
   * @example
   * import EmailIdentifierChallenge from '@auth0/auth0-acul-js/email-identifier-challenge';
   *
   * const emailIdentifierChallenge = new EmailIdentifierChallenge();
   * emailIdentifierChallenge.resendCode();
   */
  async resendCode(payload?: CustomOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [EmailIdentifierChallenge.screenIdentifier, 'resendCode'],
    };
    await new FormHandler(options).submitData<CustomOptions>({ ...payload, action: FormActions.RESEND_CODE });
  }

  /**
   * @example
   * import EmailIdentifierChallenge from '@auth0/auth0-acul-js/email-identifier-challenge';
   *
   * const emailIdentifierChallenge = new EmailIdentifierChallenge();
   * emailIdentifierChallenge.returnToPrevious();
   */
  async returnToPrevious(payload?: CustomOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [EmailIdentifierChallenge.screenIdentifier, 'returnToPrevious'],
    };
    await new FormHandler(options).submitData<CustomOptions>({ ...payload, action: FormActions.BACK });
  }
}

export { EmailIdentifierChallengeMembers, ScreenOptions as ScreenMembersOnEmailIdentifierChallenge, EmailChallengeOptions };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
