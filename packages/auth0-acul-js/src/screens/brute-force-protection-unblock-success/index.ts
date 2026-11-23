import { ScreenIds } from '../../constants';
import { BaseContext } from '../../models/base-context';

import type { BruteForceProtectionUnblockSuccessMembers, ScreenMembersOnBruteForceProtectionUnblockSuccess as ScreenOptions } from '../../../interfaces/screens/brute-force-protection-unblock-success';

/**
 * Represents the Brute Force Protection Unblock Success screen.
 * This screen is displayed when a user successfully unblocks their account after brute force protection measures were triggered.
 */
export default class BruteForceProtectionUnblockSuccess extends BaseContext implements BruteForceProtectionUnblockSuccessMembers {
  static screenIdentifier: string = ScreenIds.BRUTE_FORCE_PROTECTION_UNBLOCK_SUCCESS;

  /**
   * Creates an instance of the BruteForceProtectionUnblockSuccess screen.
   * @throws {Error} If the Universal Login Context is not available on the global window object.
   */
  constructor() {
    super();
  }
}

export { BruteForceProtectionUnblockSuccessMembers, ScreenOptions as ScreenMembersOnBruteForceProtectionUnblockSuccess };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';