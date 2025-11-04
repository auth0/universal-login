import { Screen } from '../../models/screen';

import type { ScreenContext } from '../../../interfaces/models/screen';
import type { ScreenMembersOnMfaWebAuthnEnrollmentSuccess as OverrideOptions } from '../../../interfaces/screens/mfa-webauthn-enrollment-success';
import type { WebAuthnType } from '../../../interfaces/screens/mfa-webauthn-error'; // Reusing WebAuthnType

/**
 * @class ScreenOverride
 * @extends Screen
 * @implements OverrideOptions
 * @description Provides specific data accessors for the 'mfa-webauthn-enrollment-success' screen context.
 * It ensures that `nickname` and `webAuthnType` are correctly parsed and typed from the
 * `screen.data` object provided by the Universal Login context.
 */
export class ScreenOverride extends Screen implements OverrideOptions {
  /**
   * @property {object | null} data - Screen-specific data.
   * @property {string} data.nickname - The nickname of the enrolled WebAuthn authenticator.
   * @property {WebAuthnType} data.webAuthnType - The type of the enrolled WebAuthn authenticator.
   */
  public data: OverrideOptions['data'];

  /**
   * Initializes a new instance of the `ScreenOverride` class for the 'mfa-webauthn-enrollment-success' screen.
   * It calls the base `Screen` constructor and then parses the screen-specific data using `getScreenData`.
   * @param {ScreenContext} screenContext - The screen context object provided by Universal Login
   * for the 'mfa-webauthn-enrollment-success' screen.
   */
  constructor(screenContext: ScreenContext) {
    super(screenContext); // Initialize the base Screen class with the provided context.
    this.data = ScreenOverride.getScreenData(screenContext);
  }

  /**
   * @static
   * @method getScreenData
   * @description Extracts and transforms the screen-specific data from the provided `ScreenContext`.
   * Specifically, it retrieves `nickname` and `webAuthnType` from `screenContext.data`.
   *
   * @param {ScreenContext} screenContext - The screen context containing the raw data.
   * @returns {OverrideOptions['data']} A structured object containing `nickname` and `webAuthnType`.
   * Returns `null` if the essential data (`nickname` or `webAuthnType`) is missing or invalid in type.
   */
  static getScreenData = (screenContext: ScreenContext): OverrideOptions['data'] => {
    const rawData = screenContext.data;

    // Validate that data exists and contains the expected properties with correct types.
    if (
      !rawData ||
      typeof rawData.nickname !== 'string' ||
      (rawData.webauthnType !== 'webauthn-roaming' && rawData.webauthnType !== 'webauthn-platform')
    ) {
      // If essential data is missing or types are incorrect, return null.
      // This indicates an unexpected context structure.
      return null;
    }

    // Return the structured data object with validated and typed properties.
    return {
      nickname: rawData.nickname,
      webAuthnType: rawData.webauthnType as WebAuthnType,
    };
  };
}