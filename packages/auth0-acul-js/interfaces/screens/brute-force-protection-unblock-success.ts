import type { BaseMembers } from '../models/base-context';
import type { ScreenMembers } from '../models/screen';

/**
 * Represents the public interface of the Brute Force Protection Unblock Success screen.
 * It extends the base members and includes specific properties and methods for this screen.
 */
export interface BruteForceProtectionUnblockSuccessMembers extends BaseMembers {
  /**
   * Represents the screen-specific members for the brute force protection unblock success screen.
   */
  screen: ScreenMembersOnBruteForceProtectionUnblockSuccess;
}

/**
 * Represents the screen members specific to the Brute Force Protection Unblock Success screen.
 * Extends the base ScreenMembers interface.
 */
export interface ScreenMembersOnBruteForceProtectionUnblockSuccess extends ScreenMembers {}
