import { BaseContext } from '../../models/base-context';
import { FormHandler } from '../../utils/form-handler';

import type { CustomOptions } from '../../../interfaces/common';
import type {
  BruteForceProtectionUnblockMembers
} from '../../../interfaces/screens/brute-force-protection-unblock';
import type { FormOptions } from '../../../interfaces/utils/form-handler';
// import type { ScreenContext } from '../../../interfaces/models/screen';

/**
 * Represents the BruteForceProtectionUnblock screen.
 * This class provides methods to interact with the brute-force protection unblock screen, such as submitting the unblock request.
 */
export default class BruteForceProtectionUnblock extends BaseContext implements BruteForceProtectionUnblockMembers {
  /**
   * Creates an instance of BruteForceProtectionUnblock.
   */
  constructor() {
    super();
  }

  /**
   * Submits the unblock request.
   * This method sends a request to unblock the account associated with the current transaction.
   *
   * @param {CustomOptions} [payload] - Optional payload to include with the unblock request. This can include additional data required by the server.
   * @returns {Promise<void>} A promise that resolves when the unblock request is successfully submitted.
   *
   * @example
   * ```typescript
   * import BruteForceProtectionUnblock from '@auth0/auth0-acul-js/brute-force-protection-unblock';
   *
   * const unblockScreen = new BruteForceProtectionUnblock();
   * unblockScreen.unblockAccount({}).then(() => {
   *   console.log('Account unblock request submitted successfully.');
   * }).catch((error) => {
   *   console.error('Failed to submit account unblock request:', error);
   * });
   * ```
   */
  async unblockAccount(payload?: CustomOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: []
    };

    await new FormHandler(options).submitData<CustomOptions>({
      ...payload,
      action: 'default',
    });
  }
}

export { BruteForceProtectionUnblockMembers };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';