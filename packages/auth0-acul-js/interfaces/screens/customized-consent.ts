import type { CustomOptions } from '../../interfaces/common';
import type { BaseMembers } from '../../interfaces/models/base-context';
import type { ScreenMembers } from '../../interfaces/models/screen';

/**
 * Interface describing the data available on the Customized Consent screen.
 */
export interface ScreenMembersOnCustomizedConsent extends ScreenMembers {
  data: {
    scopes: Record<string, string[]>;
  } | null;
}

/**
 * Interface describing the members of the Customized Consent screen.
 */
export interface CustomizedConsentMembers extends BaseMembers {
  screen: ScreenMembersOnCustomizedConsent;

  /**
   * Accepts the consent.
   * @param {CustomOptions} [payload] - Optional payload.
   * @returns {Promise<void>}
   */
  accept(payload?: CustomOptions): Promise<void>;

  /**
   * Declines the consent.
   * @param {CustomOptions} [payload] - Optional payload.
   * @returns {Promise<void>}
   */
  deny(payload?: CustomOptions): Promise<void>;
}
