import { BaseContext } from '../../models/base-context';
import { ScreenIds } from '../../utils/enums';

import type { MfaEnrollResultMembers } from '../../../interfaces/screens/mfa-enroll-result';

/**
 * Class implementing the MFA enrollment result screen functionality.
 * This screen is displayed after successful MFA enrollment to show the result.
 */
export default class MfaEnrollResult extends BaseContext implements MfaEnrollResultMembers {
  static screenIdentifier: string = ScreenIds.MFA_ENROLL_RESULT;

  /**
   * Creates an instance of MfaEnrollResult screen manager.
   */
  constructor() {
    super();
  }
}

export { MfaEnrollResultMembers };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
