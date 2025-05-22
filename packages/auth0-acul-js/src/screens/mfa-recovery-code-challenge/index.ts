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
   * import React, { useState } from 'react';
   * import MfaVoiceEnrollment from '@auth0/auth0-acul-js/mfa-voice-enrollment';
   * const [phone, setPhone] = useState('');
   * const mfaVoiceEnrollment = new MfaVoiceEnrollment();
   * const handleContinueEnrollment = async () => {
   *  await mfaVoiceEnrollment.continue({ phone });
   * };
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
   * import React, { useState } from 'react';
   * import MfaVoiceEnrollment from '@auth0/auth0-acul-js/mfa-voice-enrollment';
   * const mfaVoiceEnrollment = new MfaVoiceEnrollment();
   * const handleTryAnotherMethod = async () => {
   *  await mfaVoiceEnrollment.tryAnotherMethod();
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
