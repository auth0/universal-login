import { ScreenIds, FormActions } from '../../constants';
import { BaseContext } from '../../models/base-context';
import { FormHandler } from '../../utils/form-handler';

import type { CustomOptions } from '../../../interfaces/common';
import type { ConfirmationMembers } from '../../../interfaces/screens/confirmation';
import type { FormOptions } from '../../../interfaces/utils/form-handler';

/**
 * Class implementing the Confirmation screen functionality.
 * This screen allows users to confirm or decline auto-signup after OTP verification.
 */
export default class Confirmation extends BaseContext implements ConfirmationMembers {
  static screenIdentifier: string = ScreenIds.CONFIRMATION;

  /**
   * Creates an instance of the Confirmation screen.
   * @throws {Error} If the Universal Login Context is not available or if the
   * current screen name in the context does not match `Confirmation.screenIdentifier`.
   */
  constructor() {
    super();
  }

  /**
   * Proceeds with account creation after OTP verification.
   * @param payload Optional custom options to include with the request.
   * @throws {Error} Throws an error if `FormHandler` encounters an unrecoverable issue
   *                 during submission (e.g., network error). Server-side validation errors
   *                 from Auth0 are not thrown as JavaScript errors but are made available
   *                 in `this.transaction.errors` after the operation.
   * @example
   * ```typescript
   * import Confirmation from '@auth0/auth0-acul-js/confirmation';
   *
   * const confirmation = new Confirmation();
   * await confirmation.proceedToSignup();
   * ```
   */
  async proceedToSignup(payload?: CustomOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [Confirmation.screenIdentifier, 'proceedToSignup'],
    };

    const submitPayload = { ...payload, action: FormActions.PROCEED_TO_SIGNUP };

    await new FormHandler(options).submitData<typeof submitPayload>(submitPayload);
  }

  /**
   * Declines auto-signup and returns the user to the login screen without creating an account.
   * @param payload Optional custom options to include with the request.
   * @throws {Error} Throws an error if `FormHandler` encounters an unrecoverable issue
   *                 during submission (e.g., network error). Server-side validation errors
   *                 from Auth0 are not thrown as JavaScript errors but are made available
   *                 in `this.transaction.errors` after the operation.
   * @example
   * ```typescript
   * import Confirmation from '@auth0/auth0-acul-js/confirmation';
   *
   * const confirmation = new Confirmation();
   * await confirmation.goBack();
   * ```
   */
  async goBack(payload?: CustomOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [Confirmation.screenIdentifier, 'goBack'],
    };

    const submitPayload = { ...payload, action: FormActions.BACK };

    await new FormHandler(options).submitData<typeof submitPayload>(submitPayload);
  }
}

export { ConfirmationMembers };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
