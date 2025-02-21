import { BaseContext } from '../../models/base-context';

import type { MfaEnrollResultMembers } from '../../../interfaces/screens/mfa-enroll-result';

/**
 * Class implementing the MFA enrollment result screen functionality.
 * This screen is displayed after successful MFA enrollment to show the result.
 */
export default class MfaEnrollResult extends BaseContext implements MfaEnrollResultMembers {
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
