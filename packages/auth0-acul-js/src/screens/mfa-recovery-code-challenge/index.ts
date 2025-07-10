import { ScreenIds, FormActions } from '../../constants';
import { BaseContext } from '../../models/base-context';
import { FormHandler } from '../../utils/form-handler';

import type { CustomOptions } from '../../../interfaces/common';
import type {
  MfaRecoveryCodeChallengeMembers, ContinueOptions
} from '../../../interfaces/screens/mfa-recovery-code-challenge';
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
   * @param payload - The payload containing the recovery code and optional custom options.
   * @returns {Promise<void>}
   * @example
   * ```typescript
   * import MfaRecoveryCodeChallenge from '@auth0/auth0-acul-js/mfa-recovery-code-challenge';
   * const mfaRecoveryCodeChallengeManager = new MfaRecoveryCodeChallenge();
   * const handleContinueEnrollment = async () => {
   *  try {
   *    await mfaRecoveryCodeChallengeManager.continue('YOUR_RECOVERY_CODE');
   *  } catch (error) {
   *    console.error('Error continuing with recovery code:', error);
   *  }
   * }
   * ```
   */
  async continue(payload: ContinueOptions): Promise<void> {
    if (!payload || !payload?.code) {
      return Promise.reject(new Error('The recovery code is required.'));
    }

    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [MfaRecoveryCodeChallenge.screenIdentifier, 'continue'],
    };

    await new FormHandler(options).submitData<ContinueOptions>({
      ...payload,
      action: FormActions.DEFAULT,
    });
  }

  /**
   * Navigates to the screen where the user can pick another MFA method.
   * @param payload Optional payload.
   * @returns {Promise<void>}
   * @example
   * ```typescript
   * import MfaRecoveryCodeChallenge from '@auth0/auth0-acul-js/mfa-recovery-code-challenge';
   * const mfaRecoveryCodeChallengeManager = new MfaRecoveryCodeChallenge();
   * const switchAuthenticator = async () => {
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

export { MfaRecoveryCodeChallengeMembers, ContinueOptions };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
