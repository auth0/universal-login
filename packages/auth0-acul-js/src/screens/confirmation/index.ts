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
    await new FormHandler(options).submitData<CustomOptions>({ ...payload, action: FormActions.PROCEED_TO_SIGNUP });
  }

  /**
   * Navigates back to the previous screen.
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
    await new FormHandler(options).submitData<CustomOptions>({ ...payload, action: FormActions.BACK });
  }
}

export { ConfirmationMembers };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
