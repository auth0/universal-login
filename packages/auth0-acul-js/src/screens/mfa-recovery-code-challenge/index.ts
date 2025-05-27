import { ScreenIds, FormActions } from '../../constants';
import { BaseContext } from '../../models/base-context';
import { FormHandler } from '../../utils/form-handler';

import type { CustomOptions } from '../../../interfaces/common';
import type { MfaRecoveryCodeChallengeMembers } from '../../../interfaces/screens/mfa-recovery-code-challenge';
import type { FormOptions } from '../../../interfaces/utils/form-handler';

/**
 * Class implementing the MFA Recovery Code Challenge screen functionality.
 */
export default class MfaRecoveryCodeChallenge extends BaseContext implements MfaRecoveryCodeChallengeMembers {
  static screenIdentifier: string = ScreenIds.MFA_RECOVERY_CODE_CHALLENGE;

  /**
   * Creates an instance of the MfaRecoveryCodeChallenge screen.
   */
  constructor() {
    super();
  }

  /**
   * Continues with the provided recovery code.
   * @param {string} code - The recovery code entered by the user.
   * @param {CustomOptions} [payload] - Optional payload.
   * @returns {Promise<void>}
   * @example
   * ```typescript
   * import MfaRecoveryCodeChallenge from '@auth0/auth0-acul-js/mfa-recovery-code-challenge';
   * const handleContinueEnrollment = async () => {
   *  const mfaRecoveryCodeChallengeManager = new MfaRecoveryCodeChallenge();
   *  try {
   *    await mfaRecoveryCodeChallengeManager.continue('YOUR_RECOVERY_CODE');
   *  } catch (error) {
   *    console.error('Error continuing with recovery code:', error);
   *  }
   * }
   * ```
   */
  async continue(code: string, payload?: CustomOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [MfaRecoveryCodeChallenge.screenIdentifier, 'continue'],
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
   * @example
   * ```typescript
   * import MfaRecoveryCodeChallenge from '@auth0/auth0-acul-js/mfa-recovery-code-challenge';
   * const switchAuthenticator = async () => {
   *  const mfaRecoveryCodeChallengeManager = new MfaRecoveryCodeChallenge();
   *  try {
   *    await mfaRecoveryCodeChallengeManager.tryAnotherMethod();
   *    console.log('Switched to another authentication method.');
   *  } catch (error) {
   *    console.error('Error switching authenticator:', error);
   *  }
   * };
   * ```
   */
  async tryAnotherMethod(payload?: CustomOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [MfaRecoveryCodeChallenge.screenIdentifier, 'tryAnotherMethod'],
    };

    await new FormHandler(options).submitData<CustomOptions>({
      ...payload,
      action: FormActions.PICK_AUTHENTICATOR,
    });
  }
}

export { MfaRecoveryCodeChallengeMembers };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
