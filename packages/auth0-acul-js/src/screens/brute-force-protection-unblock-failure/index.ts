import { BaseContext } from '../../models/base-context';

import { ScreenOverride } from './screen-override';

import type { ScreenContext } from '../../../interfaces/models/screen';
import type { BruteForceProtectionUnblockFailureMembers } from '../../../interfaces/screens/brute-force-protection-unblock-failure';

/**
 * Represents the Brute Force Protection Unblock Failure screen.
 */
export default class BruteForceProtectionUnblockFailure extends BaseContext implements BruteForceProtectionUnblockFailureMembers {
  /**
   * @ignore
   */
  public screen: ScreenOverride;

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
