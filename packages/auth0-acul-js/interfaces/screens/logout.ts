import type { CustomOptions } from '../common';
import type { BaseMembers } from '../models/base-context';

/**
 * Options for confirming logout
 */
export interface ConfirmLogoutOptions extends CustomOptions {
  /** The authentication transaction state */
  action: 'accept' | 'deny';
}

/**
 * Interface defining the available methods and properties for the logout screen
 */
export interface LogoutMembers extends BaseMembers {
  /**
   * Confirms the logout action (accept or deny)
   * @param payload The options containing the action to perform
   */
  confirmLogout(payload: ConfirmLogoutOptions): Promise<void>;
}
