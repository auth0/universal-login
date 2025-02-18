import type { CustomOptions } from '../common';
import type { BaseMembers } from '../models/base-context';

/**
 * Interface defining the available methods and properties for the mfa-detect-browser-capabilities screen
 */
export interface MfaDetectBrowserCapabilitiesMembers extends BaseMembers {
  /**
   * Picks an authenticator based on browser capabilities
   * @param payload The options containing browser capability flags
   * @example
   * ```typescript
   * const mfaDetectBrowserCapabilities = new MfaDetectBrowserCapabilities();
   * await mfaDetectBrowserCapabilities.detectCapabilities();
   * ```
   */
  detectCapabilities(payload: CustomOptions): Promise<void>;
}
