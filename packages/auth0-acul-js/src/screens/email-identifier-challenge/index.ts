import { ScreenOverride } from './screen-override';
import type { CustomOptions } from '../../../interfaces/common';
import type { ScreenContext } from '../../../interfaces/models/screen';
import type {
  EmailChallengeOptions,
  EmailIdentifierChallengeMembers,
  ScreenMembersOnEmailIdentifierChallenge as ScreenOptions,
} from '../../../interfaces/screens/email-identifier-challenge';
import type { FormOptions } from '../../../interfaces/utils/form-handler';
import { BaseContext } from '../../models/base-context';
import { FormHandler } from '../../utils/form-handler';

export default class EmailIdentifierChallenge extends BaseContext implements EmailIdentifierChallengeMembers {
  screen: ScreenOptions;

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
    };
    await new FormHandler(options).submitData<CustomOptions>({ ...payload, action: 'resend-code' });
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
    };
    await new FormHandler(options).submitData<CustomOptions>({ ...payload, action: 'back-action' });
  }
}
