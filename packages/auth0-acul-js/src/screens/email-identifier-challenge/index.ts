import { ScreenIds, FormActions } from '../../constants';
import { BaseContext } from '../../models/base-context';
import { FormHandler } from '../../utils/form-handler';
import { createResendControl } from '../../utils/resend-utils';

import { ScreenOverride } from './screen-override';

import type { CustomOptions, StartResendOptions, ResendControl } from '../../../interfaces/common';
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

  /**
   * Gets resend functionality with timeout management for this screen
   * @param options - Configuration options for resend functionality
   * @param options.timeoutSeconds - Number of seconds to wait before allowing resend (default: 10)
   * @param options.resendCallback - Optional custom callback function to execute on resend
   * @returns Object containing disabled state, remaining time, and callback function
   * 
   * @example
   * import EmailIdentifierChallenge from '@auth0/auth0-acul-js/email-identifier-challenge';
   *
   * const emailIdentifierChallenge = new EmailIdentifierChallenge();
   * const resendControl = emailIdentifierChallenge.startResend({ timeoutSeconds: 40 });
   * if (!resendControl.disabled) {
   *   await resendControl.callback();
   * }
   */
  startResend(options?: StartResendOptions): ResendControl {
    return createResendControl(
      EmailIdentifierChallenge.screenIdentifier,
      () => this.resendCode(),
      options || {}
    );
  }
}

export { EmailIdentifierChallengeMembers, ScreenOptions as ScreenMembersOnEmailIdentifierChallenge, EmailChallengeOptions };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
