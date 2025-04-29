import { ScreenIds, FormActions } from '../../constants';
import { BaseContext } from '../../models/base-context';
import { FormHandler } from '../../utils/form-handler';

import type { CustomOptions } from '../../../interfaces/common';
import type { ResetPasswordMfaRecoveryCodeChallengeMembers } from '../../../interfaces/screens/reset-password-mfa-recovery-code-challenge';
import type { FormOptions } from '../../../interfaces/utils/form-handler';

/**
 * Class implementing the Reset Password MFA Recovery Code Challenge screen functionality.
 */
export default class ResetPasswordMfaRecoveryCodeChallenge extends BaseContext implements ResetPasswordMfaRecoveryCodeChallengeMembers {
  static screenIdentifier: string = ScreenIds.RESET_PASSWORD_MFA_RECOVERY_CODE_CHALLENGE;

  /**
   * Creates an instance of the ResetPasswordMfaRecoveryCodeChallenge screen.
   */
  constructor() {
    super();
  }

  /**
   * Continues with the provided recovery code.
   * @param {string} code - The recovery code entered by the user.
   * @param {CustomOptions} [payload] - Optional payload.
   * @returns {Promise<void>}
   */
  async continue(code: string, payload?: CustomOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [ResetPasswordMfaRecoveryCodeChallenge.screenIdentifier, 'continue'],
    };

    await new FormHandler(options).submitData<CustomOptions>({
      ...payload,
      code,
      action: FormActions.DEFAULT,
    });
  }

  /**
   * Navigates to the screen where the user can pick another MFA method.
   * @param {CustomOptions} [payload] - Optional payload.
   * @returns {Promise<void>}
   */
  async tryAnotherMethod(payload?: CustomOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [ResetPasswordMfaRecoveryCodeChallenge.screenIdentifier, 'tryAnotherMethod'],
    };

    await new FormHandler(options).submitData<CustomOptions>({
      ...payload,
      action: FormActions.PICK_AUTHENTICATOR,
    });
  }
}

export { ResetPasswordMfaRecoveryCodeChallengeMembers };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
