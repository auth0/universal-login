import { isJsAvailable, isBrave, isWebAuthAvailable, isWebAuthPlatformAvailable } from '../../../src/utils/browser-capabilities';
import { BaseContext } from '../../models/base-context';
import { ScreenIds } from '../../utils/enums';
import { FormHandler } from '../../utils/form-handler';

import type { MfaDetectBrowserCapabilitiesMembers } from '../../../interfaces/screens/mfa-detect-browser-capabilities';
import type { FormOptions } from '../../../interfaces/utils/form-handler';
import type { CustomOptions } from 'interfaces/common';

/**
 * Class implementing the mfa-detect-browser-capabilities screen functionality
 * This screen detects browser capabilities for MFA authentication methods
 */
export default class MfaDetectBrowserCapabilities extends BaseContext implements MfaDetectBrowserCapabilitiesMembers {
  static screenIdentifier: string = ScreenIds.MFA_DETECT_BROWSER_CAPABILITIES;

  /**
   * Creates an instance of MfaDetectBrowserCapabilities screen manager
   */
  constructor() {
    super();
  }

  /**
   * Picks an authenticator based on browser capabilities
   * @param payload The options containing browser capability flags
   * @example
   * ```typescript
   * const mfaDetectBrowserCapabilities = new MfaDetectBrowserCapabilities();
   * await mfaDetectBrowserCapabilities.detectCapabilities();
   * ```
   */
  async detectCapabilities(payload?: CustomOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [MfaDetectBrowserCapabilities.screenIdentifier, 'detectCapabilities'],
    };
    await new FormHandler(options).submitData<CustomOptions>({
      ...payload,
      'js-available': isJsAvailable(),
      'is-brave': await isBrave(),
      'webauthn-available': isWebAuthAvailable(),
      'webauthn-platform-available': await isWebAuthPlatformAvailable(),
      action: 'pick-authenticator',
    });
  }
}

export { MfaDetectBrowserCapabilitiesMembers };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
