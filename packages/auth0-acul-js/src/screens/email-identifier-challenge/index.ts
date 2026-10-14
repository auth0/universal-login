import { ScreenIds, FormActions } from '../../constants';
import { BaseContext } from '../../models/base-context';
import { FormHandler } from '../../utils/form-handler';
import { createResendControl } from '../../utils/resend-control';

import { ScreenOverride } from './screen-override';

import type { CustomOptions } from '../../../interfaces/common';
import type { ScreenContext } from '../../../interfaces/models/screen';
import type {
  EmailChallengeOptions,
  EmailIdentifierChallengeMembers,
  ScreenMembersOnEmailIdentifierChallenge as ScreenOptions,
} from '../../../interfaces/screens/email-identifier-challenge';
import type { FormOptions } from '../../../interfaces/utils/form-handler';
import type { StartResendOptions, ResendControl } from  '../../../interfaces/utils/resend-control';

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
   * Requests a new verification code for the user's email address.
   *
   * @remarks
   * Submits a form POST with `action: "resend-code"`. Auth0 responds by rendering this
   * screen again, or the `interstitial-captcha` screen if a captcha is required. Either
   * way the browser loads a new page, and the current JavaScript context, including
   * component state and timers, is lost.
   *
   * Code after `await resendCode()` may still run, but anything it sets up, such as a
   * "code sent" message or a countdown, is gone after the reload. If the resend fails,
   * for example because of a rate limit, Auth0 renders this screen again without an
   * error, so that it doesn't reveal whether the user exists. Nothing appears in
   * `transaction.errors`, and the returned promise doesn't reject.
   *
   * To add a cooldown between resends, use `resendManager()`. It stores its countdown
   * in `localStorage`, so the countdown survives the reload.
   * It also disables resending when `screen.data.resendLimitReached` is `true`.
   *
   * @param payload - Optional custom parameters to send with the request.
   * @returns A promise that resolves once the form is submitted, before the new page
   * loads. It doesn't confirm that a new code was sent.
   *
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
   * @param options.onStatusChange - Callback to receive state updates (remaining seconds, disabled status)
   * @param options.onTimeout - Callback to execute when timeout countdown reaches zero
   * @returns ResendControl object with startResend method
   * @utilityFeature
   * 
   * @example
   * import EmailIdentifierChallenge from '@auth0/auth0-acul-js/email-identifier-challenge';
   *   const handleStatusChange = (remainingSeconds, isDisabled) => {
   *     setDisabled(isDisabled);
   *     setRemaining(remainingSeconds);
   *   };
   * 
   *   const handleTimeout = () => {
   *     console.log('Timeout completed, resend is now available');
   *   };
   * 
   *   const { startResend } = emailChallenge.resendManager({
   *     timeoutSeconds: 15,
   *     onStatusChange: handleStatusChange,
   *     onTimeout: handleTimeout
   *   });
   *   
   *   // Call startResend when user clicks resend button
   *   await startResend();
   * 
   */
  resendManager(options?: StartResendOptions): ResendControl {
    return createResendControl(
      EmailIdentifierChallenge.screenIdentifier,
      () => this.resendCode(),
      options,
      !!this.screen.data?.resendLimitReached
    );
  }

  /**
   * @remarks
   * Switches the authentication flow from OTP-based to password-based authentication.
   *
   * @example
   * import EmailIdentifierChallenge from '@auth0/auth0-acul-js/email-identifier-challenge';
   *
   * const emailIdentifierChallenge = new EmailIdentifierChallenge();
   * emailIdentifierChallenge.switchToPassword();
   */
  async switchToPassword(payload?: CustomOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [EmailIdentifierChallenge.screenIdentifier, 'switchToPassword'],
    };
    await new FormHandler(options).submitData<CustomOptions>({ ...payload, action: FormActions.SWITCH_TO_PASSWORD_AUTH });
  }
}

export { EmailIdentifierChallengeMembers, ScreenOptions as ScreenMembersOnEmailIdentifierChallenge, EmailChallengeOptions };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
