import type { CustomOptions } from '../common';
import type { BaseMembers } from '../models/base-context';
import type { ScreenMembers } from '../models/screen';

/**
 * Interface for the screen data specific to mfa-detect-browser-capabilities screen
 */
export interface ScreenMembersOnMfaDetectBrowserCapabilities extends ScreenMembers {}

/**
 * Options for picking an authenticator
 */
export interface PickAuthenticatorOptions extends CustomOptions {
  /** Whether JavaScript is available */
  'js-available': boolean;
  /** Whether the browser is Brave */
  'is-brave': boolean;
  /** Whether WebAuthn is available */
  'webauthn-available': boolean;
  /** Whether WebAuthn platform authenticator is available */
  'webauthn-platform-available': boolean;
  /** Any additional custom options */
  [key: string]: string | number | boolean;
}

/**
 * Interface defining the available methods and properties for the mfa-detect-browser-capabilities screen
 */
export interface MfaDetectBrowserCapabilitiesMembers extends BaseMembers {
  screen: ScreenMembersOnMfaDetectBrowserCapabilities;
  /**
   * Picks an authenticator based on browser capabilities
   * @param payload The options containing browser capability flags
   * @example
   * ```typescript
   * const mfaDetectBrowserCapabilities = new MfaDetectBrowserCapabilities();
   * await mfaDetectBrowserCapabilities.pickAuthenticator({
   *   'js-available': true,
   *   'is-brave': false,
   *   'webauthn-available': true,
   *   'webauthn-platform-available': true
   * });
   * ```
   */
  pickAuthenticator(payload: PickAuthenticatorOptions): Promise<void>;
}
