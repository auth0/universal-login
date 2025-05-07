/**
 * @file Implements the functionality for the Consent screen (consent).
 */

import { ScreenIds, FormActions } from '../../constants';
import { BaseContext } from '../../models/base-context';
import { FormHandler } from '../../utils/form-handler';

import { ScreenOverride } from './screen-override';

import type { CustomOptions } from '../../../interfaces/common';
import type { ScreenContext, Scope } from '../../../interfaces/models/screen';
import type { ConsentMembers, ScreenMembersOnConsent, AcceptOrDeclineConsentOptions } from '../../../interfaces/screens/consent';
import type { FormOptions } from '../../../interfaces/utils/form-handler';

/**
 * @class Consent
 * @extends {BaseContext}
 * implements {ConsentMembers}
 * Manages the interactions and state for the Consent screen. Provides access to
 * client, user, organization, resource server, and scope details, along with
 * methods to accept or deny the consent request.
 */
export default class Consent extends BaseContext implements ConsentMembers {
  /** The unique identifier for this screen for internal SDK use. */
  static screenIdentifier: string = ScreenIds.CONSENT;

  /** Parsed data specific to the `screen.data` object (scopes). */
  readonly screen: ScreenMembersOnConsent;


  /**
   * Initializes a new instance of the `Consent` class.
   * Parses the screen context for scopes and the root context for resource servers.
   * Inherits client, user, transaction etc. from BaseContext.
   * @throws {Error} If BaseContext initialization fails (e.g., context unavailable).
   * @throws {Error} If ResourceServer model parsing fails for any entry in `resource_servers`.
   */
  constructor() {
    super(); // BaseContext handles basic context setup and validation
    const screenContext = this.getContext('screen') as ScreenContext;
    this.screen = new ScreenOverride(screenContext);
  }

  /**
   * @private
   * Prepares the scope and audience payload required for accept/deny actions.
   * @returns {Promise<{ scope: string[]; audience: string }>} The extracted scope values and the primary audience.
   * @throws {Error} If scopes or a valid primary resource server/audience cannot be determined.
   */
  private prepareConsentPayload(): { scope: string[]; audience: string } {
    // Retrieve scopes directly from the parsed screen data
    const scopesData = this.screen.data?.scopes;
    if (!scopesData || !Array.isArray(scopesData)) {
        // This check might be redundant if ScreenOverride guarantees an array, but safe to keep.
      throw new Error('Consent screen data is invalid: scopes not found in screen.data.');
    }

    // Retrieve resource servers from the parsed instance property
    if (!this.resourceServers || this.resourceServers.length === 0) {
      throw new Error('Consent screen data is invalid: No valid resource servers found.');
    }

    // Extract all scope *values* into a flat array of strings
    const scope: string[] = scopesData.flatMap((s: Scope) => s.values || []); // Use Scope type here

    // Extract audience from the *first valid* resource server
    // The ResourceServer constructor already validated that audience is a non-empty string
    const audience = this.resourceServers[0].audience;

    return { scope, audience };
  }

  /**
   * Submits the user's decision to accept the requested permissions.
   * @param {CustomOptions} [payload] - Optional custom key-value pairs to include in the form submission.
   * @returns {Promise<void>} A promise that resolves upon successful submission.
   * @throws {Error} If required data is missing/invalid or submission fails.
   */
  async accept(payload?: CustomOptions): Promise<void> {
    const { scope, audience } = this.prepareConsentPayload(); // No longer async needed here

    const formHandlerOptions: FormOptions = {
      state: this.transaction.state,
      telemetry: [Consent.screenIdentifier, 'accept'],
      route: '/u/consent', // From OpenAPI spec
    };

    const submitPayload: AcceptOrDeclineConsentOptions & { action: string } = {
      ...payload,
      scope,
      audience,
      action: FormActions.ACCEPT,
    };
    await new FormHandler(formHandlerOptions).submitData(submitPayload);
  }

  /**
   * Submits the user's decision to deny the requested permissions.
   * @param {CustomOptions} [payload] - Optional custom key-value pairs to include in the form submission.
   * @returns {Promise<void>} A promise that resolves upon successful submission.
   * @throws {Error} If required data is missing/invalid or submission fails.
   */
  async deny(payload?: CustomOptions): Promise<void> {
    const { scope, audience } = this.prepareConsentPayload(); // No longer async needed here

    const formHandlerOptions: FormOptions = {
      state: this.transaction.state,
      telemetry: [Consent.screenIdentifier, 'deny'],
      route: '/u/consent', // From OpenAPI spec
    };

    const submitPayload: AcceptOrDeclineConsentOptions & { action: string } = {
      ...payload,
      scope, // Send scope even for deny as per examples
      audience,
      action: FormActions.DENY,
    };
    await new FormHandler(formHandlerOptions).submitData(submitPayload);
  }
}

// Export necessary types
export { ConsentMembers, ScreenMembersOnConsent, AcceptOrDeclineConsentOptions, Scope };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
