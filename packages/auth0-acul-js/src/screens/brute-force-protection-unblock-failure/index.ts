import { BaseContext } from '../../models/base-context';

import { ScreenOverride } from './screen-override';

import type { ScreenContext } from '../../../interfaces/models/screen';
import type {
  BruteForceProtectionUnblockFailureMembers,
  ScreenMembersOnBruteForceProtectionUnblockFailure as ScreenOptions,
} from '../../../interfaces/screens/brute-force-protection-unblock-failure';
/**
 * Represents the Brute Force Protection Unblock Failure screen.
 */
export default class BruteForceProtectionUnblockFailure extends BaseContext implements BruteForceProtectionUnblockFailureMembers {
  /**
   * The screen interface for the Brute Force Protection Unblock Failure screen.
   * @ignore
   */
  screen: ScreenOptions;
  
  /**
   * Creates an instance of the BruteForceProtectionUnblockFailure screen.
   * @constructor
   */
  constructor() {
    super();

    const screenContext = this.getContext('screen') as ScreenContext;
    this.screen = new ScreenOverride(screenContext);
  }
}

export {
  BruteForceProtectionUnblockFailureMembers,
  ScreenOptions as ScreenMembersOnBruteForceProtectionUnblockFailure,
};
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
