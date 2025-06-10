import type { CustomOptions } from '../common';
import type { BaseMembers } from '../models/base-context';
// import type { ScreenMembers } from '../models/screen';

/**
 * Represents the members of the BruteForceProtectionUnblock screen.
 */
export interface BruteForceProtectionUnblockMembers extends BaseMembers {
  /**
   * Submits the unblock account request.
   * @param {CustomOptions} [payload] - Optional payload to include with the unblock request.
   * @returns {Promise<void>} A promise that resolves when the unblock request is successfully submitted.
   */
  unblockAccount(payload?: CustomOptions): Promise<void>;
}