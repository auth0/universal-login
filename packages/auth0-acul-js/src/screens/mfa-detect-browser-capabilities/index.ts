import { BaseContext } from '../../models/base-context';
import { FormHandler } from '../../utils/form-handler';

import { ScreenOverride } from './screen-override';

import type { ScreenContext } from '../../../interfaces/models/screen';
import type {
  MfaDetectBrowserCapabilitiesMembers,
  ScreenMembersOnMfaDetectBrowserCapabilities as ScreenOptions,
  PickAuthenticatorOptions,
} from '../../../interfaces/screens/mfa-detect-browser-capabilities';
import type { FormOptions } from '../../../interfaces/utils/form-handler';

/**
 * Class implementing the mfa-detect-browser-capabilities screen functionality
 * This screen detects browser capabilities for MFA authentication methods
 */
export default class MfaDetectBrowserCapabilities extends BaseContext implements MfaDetectBrowserCapabilitiesMembers {
  screen: ScreenOptions;

  /**
   * Creates an instance of MfaDetectBrowserCapabilities screen manager
   */
  constructor() {
    super();
    const screenContext = this.getContext('screen') as ScreenContext;
    this.screen = new ScreenOverride(screenContext);
  }

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
  async pickAuthenticator(payload: PickAuthenticatorOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
    };
    await new FormHandler(options).submitData<PickAuthenticatorOptions>({
      ...payload,
      action: 'pick-authenticator',
    });
  }
}

export { MfaDetectBrowserCapabilitiesMembers, PickAuthenticatorOptions, ScreenOptions as ScreenMembersOnMfaDetectBrowserCapabilities };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
