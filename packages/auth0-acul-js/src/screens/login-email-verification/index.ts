import { ScreenIds, FormActions } from '../../constants';
import { BaseContext } from '../../models/base-context';
import { FormHandler } from '../../utils/form-handler';
import { createResendControl } from '../../utils/resend-control';

import type {
  LoginEmailVerificationMembers,
  ContinueWithCodeOptions,
  ResendCodeOptions,
} from '../../../interfaces/screens/login-email-verification';
import type { FormOptions as InternalFormOptions } from '../../../interfaces/utils/form-handler';
import type { StartResendOptions, ResendControl } from '../../../interfaces/utils/resend-control';

/**
 * @class LoginEmailVerification
 * classdesc Manages interactions for the "login-email-verification" screen.
 * This screen prompts the user to enter a one-time code sent to their email address
 * to verify their identity during the login process.
 *
 * It provides methods to submit the entered code (`continueWithCode`) or
 * to request a new code if the original one was not received or has expired (`resendCode`).
 *
 * Inherits from `BaseContext` to access shared authentication flow data like
 * transaction state, client information, and internationalization texts.
 *
 * @extends {BaseContext}
 * implements {LoginEmailVerificationMembers}
 *
 * @example
 * ```typescript
 * // How to use the LoginEmailVerification screen SDK:
 * import LoginEmailVerification from '@auth0/auth0-acul-js/login-email-verification';
 *
 * // Instantiate the manager for the login email verification screen
 * const loginEmailVerificationManager = new LoginEmailVerification();
 *
 * // Accessing screen-specific texts (e.g., for titles, labels, button texts)
 * const screenTexts = loginEmailVerificationManager.screen.texts;
 * const pageTitle = screenTexts?.title || 'Verify Your Email';
 * const codePlaceholder = screenTexts?.codePlaceholder || 'Enter code here';
 *
 * // Accessing transaction errors from a previous attempt
 * const transactionErrors = loginEmailVerificationManager.transaction.errors;
 * if (transactionErrors && transactionErrors.length > 0) {
 *   transactionErrors.forEach(error => {
 *     console.error(`Error Code: ${error.code}, Message: ${error.message}`);
 *     // Display these errors to the user appropriately.
 *   });
 * }
 *
 * // Example of handling code submission from a form
 * async function onCodeSubmit(enteredCode: string) {
 *   try {
 *     await loginEmailVerificationManager.continueWithCode({ code: enteredCode });
 *     // On successful verification, Auth0 will typically redirect the user.
 *     // If there's a validation error (e.g., invalid code), the page will
 *     // re-render, and `loginEmailVerificationManager.transaction.errors` will be updated.
 *   } catch (e) {
 *     // This catch block is for unexpected errors during submission (e.g., network issues).
 *     console.error('An unexpected error occurred while submitting the code:', e);
 *   }
 * }
 *
 * // Example of handling a resend code request
 * async function onResendCodeClick() {
 *   await loginEmailVerificationManager.resendCode();
 *   // The page reloads, so any "code sent" message set here is lost.
 *   // On the reloaded page, check `loginEmailVerificationManager.transaction.errors`
 *   // for issues like "too-many-emails".
 * }
 * ```
 */
export default class LoginEmailVerification extends BaseContext implements LoginEmailVerificationMembers {
  /**
   * The unique identifier for the Login Email Verification screen.
   * This static property is used by the SDK's `BaseContext` to ensure that the
   * class is instantiated in the correct screen context.
   * @type {string}
   * static
   * @readonly
   */
  static screenIdentifier: string = ScreenIds.LOGIN_EMAIL_VERIFICATION;

  /**
   * Creates an instance of the `LoginEmailVerification` screen manager.
   * The constructor initializes the `BaseContext`, which involves parsing the
   */
  constructor() {
    super();
  }

  /**
   * Submits the email verification code entered by the user to Auth0.
   * This method prepares and posts the form data, including the verification code
   * and the required `action: "default"`, to the `/u/login-email-verification` endpoint.
   *
   * @param {ContinueWithCodeOptions} payload - An object containing the `code` (string)
   *                                            entered by the user. May also contain
   *                                            other custom parameters if needed.
   * @returns {Promise<void>} A promise that resolves once the form submission is initiated.
   *                          Typically, a successful submission leads to a server-side redirect.
   *                          If the code is incorrect or an error occurs, the page will
   *                          re-render, and `this.transaction.errors` will be populated.
   * @throws {Error} If the `payload.code` is missing or not a string. It can also
   *                 throw if `FormHandler` encounters an issue during submission (e.g. network error).
   *                 Auth0 validation errors (e.g. "invalid-code") are not thrown as JS errors
   *                 but are made available in `this.transaction.errors` post-operation.
   *
   * @example
   * ```typescript
   * const manager = new LoginEmailVerification();
   * // Assuming 'userInputCode' is a string obtained from a form input
   * manager.continueWithCode({ code: userInputCode })
   *   .catch(err => {
   *     // Handle unexpected submission errors
   *     displayGlobalError("Could not submit your code. Please try again.");
   *   });
   * // After the operation, check manager.transaction.errors for validation messages.
   * ```
   */
  async continueWithCode(payload: ContinueWithCodeOptions): Promise<void> {
    if (!payload || typeof payload.code !== 'string') {
      throw new Error('The `code` property in the payload is required and must be a string.');
    }

    const formOptions: InternalFormOptions = {
      state: this.transaction.state,
      telemetry: [LoginEmailVerification.screenIdentifier, 'continueWithCode']
    };

    // Prepare the data to be submitted.
    // The `action: "default"` signals the server to process the code.
    const submitPayload = {
      ...payload, // Includes the 'code' and any other custom options passed in.
      action: FormActions.DEFAULT,
    };

    // Use FormHandler to submit the data.
    await new FormHandler(formOptions).submitData<typeof submitPayload>(submitPayload);
  }

  /**
   * Requests Auth0 to send a new verification code to the user's email address.
   * This is typically used when the user didn't receive the original code, or it has expired.
   *
   * @remarks
   * Submits a form POST with `action: "resend-code"`. Auth0 responds by rendering this
   * screen again, so the browser reloads the page and the current JavaScript context,
   * including component state and timers, is lost.
   *
   * Code after `await resendCode()` may still run, but anything it sets up, such as a
   * "code sent" message or a countdown, is gone after the reload. Server-side errors,
   * such as rate limits (`too-many-emails`), appear in `transaction.errors` on the
   * reloaded page. They don't reject the returned promise.
   *
   * To add a cooldown between resends, use `resendManager()`. It stores its countdown
   * in `localStorage`, so the countdown survives the reload.
   *
   * @param payload - Optional custom parameters to send with the request.
   * @returns A promise that resolves once the form is submitted, before the page
   * reloads. It doesn't confirm that a new code was sent.
   *
   * @example
   * ```typescript
   * import LoginEmailVerification from '@auth0/auth0-acul-js/login-email-verification';
   *
   * const loginEmailVerification = new LoginEmailVerification();
   * await loginEmailVerification.resendCode();
   * // The page reloads. On the new page, check `transaction.errors` for issues
   * // such as `too-many-emails`.
   * ```
   */
  async resendCode(payload?: ResendCodeOptions): Promise<void> {
    const formOptions: InternalFormOptions = {
      state: this.transaction.state,
      telemetry: [LoginEmailVerification.screenIdentifier, 'resendCode']
    };

    // Prepare the data for resending the code.
    // The `action: "resend-code"` signals the server to dispatch a new code.
    const submitPayload = {
      ...payload, // Includes any custom options passed in.
      action: FormActions.RESEND_CODE,
    };

    // Use FormHandler to submit the data.
    await new FormHandler(formOptions).submitData<typeof submitPayload>(submitPayload);
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
   * ```typescript
   * import LoginEmailVerification from '@auth0/auth0-acul-js/login-email-verification';
   * 
   * const loginEmailVerification = new LoginEmailVerification();
   * const { startResend } = loginEmailVerification.resendManager({
   *   timeoutSeconds: 15,
   *   onStatusChange: (remainingSeconds, isDisabled) => {
   *     console.log(`Resend available in ${remainingSeconds}s, disabled: ${isDisabled}`);
   *   },
   *   onTimeout: () => {
   *     console.log('Resend is now available');
   *   }
   * });
   * 
   * // Call startResend when user clicks resend button
   * startResend();
   * ```
   */
  resendManager(options?: StartResendOptions): ResendControl {
    return createResendControl(
      LoginEmailVerification.screenIdentifier,
      () => this.resendCode(),
      options
    );
  }
}

// Export all necessary types and members for this screen
export { LoginEmailVerificationMembers, ContinueWithCodeOptions, ResendCodeOptions };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';