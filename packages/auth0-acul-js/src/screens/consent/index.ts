import { Scope } from '../../../interfaces/models/screen';
import { ScreenIds, FormActions } from '../../constants';
import { BaseContext } from '../../models/base-context';
import { FormHandler } from '../../utils/form-handler';

import { ScreenOverride } from './screen-override';

import type { CustomOptions } from '../../../interfaces/common';
import type { ScreenContext } from '../../../interfaces/models/screen';
import type { ConsentMembers, ScreenMembersOnConsent } from '../../../interfaces/screens/consent';
import type { FormOptions as SDKFormOptions } from '../../../interfaces/utils/form-handler';

export default class Consent extends BaseContext implements ConsentMembers {
  static screenIdentifier: string = ScreenIds.CONSENT;

  /**
   * Holds the specific screen data and properties for the Consent screen,
   * processed by `ScreenOverride`. This includes the list of `scopes` being requested
   * and the `hideScopes` flag.
   * @type {ScreenMembersOnConsent}
   * @public
   */
  public screen: ScreenMembersOnConsent;

  /**
   * Creates an instance of the `Consent` screen manager.
   * The constructor initializes the `BaseContext` and sets up the `screen` property
   * with an instance of `ScreenOverride` tailored for the consent screen.
   * @throws {Error} If the Universal Login Context is not available or if the
   * current screen name in the context does not match `Consent.screenIdentifier`.
   */
  constructor() {
    super();
    const screenContext = this.getContext('screen') as ScreenContext;
    this.screen = new ScreenOverride(screenContext);
  }

  /**
   * Submits the user's decision to accept (grant) the requested permissions.
   * This method prepares and posts form data to the `/u/consent?state=<transaction_state>` endpoint
   * with `action: "accept"`. The transaction state is automatically included in both the
   * URL query parameter and the form body.
   *
   * @param {CustomOptions} [payload] - Optional. An object for any custom key-value pairs
   *                                    to be sent with the request. These parameters will be
   *                                    included in the form data submitted to the server.
   * @returns {Promise<void>} A promise that resolves once the form submission is initiated.
   *                          Typically, a successful submission leads to a server-side redirect.
   * @throws {Error} Throws an error if `FormHandler` encounters an unrecoverable issue
   *                 during submission (e.g., network error). Server-side validation errors
   *                 from Auth0 (like "invalid_request") are not thrown as JavaScript errors
   *                 but are made available in `this.transaction.errors` after the operation.
   */
  async accept(payload?: CustomOptions): Promise<void> {
    const route = `/u/consent?state=${this.transaction.state}`;
    const formOptions: SDKFormOptions = {
      state: this.transaction.state, // For form body
      telemetry: [Consent.screenIdentifier, 'accept'],
      route: route, // For form action URL
    };

    const submitPayload = {
      ...payload,
      action: FormActions.ACCEPT,
    };

    await new FormHandler(formOptions).submitData<typeof submitPayload>(submitPayload);
  }

  /**
   * Submits the user's decision to deny (reject) the requested permissions.
   * This method prepares and posts form data to the `/u/consent?state=<transaction_state>` endpoint
   * with `action: "deny"`. The transaction state is automatically included in both the
   * URL query parameter and the form body.
   *
   * @param {CustomOptions} [payload] - Optional. An object for any custom key-value pairs
   *                                    to be sent with the request. These parameters will be
   *                                    included in the form data submitted to the server.
   * @returns {Promise<void>} A promise that resolves once the form submission is initiated.
   *                          A successful submission usually results in a server-side redirect.
   * @throws {Error} Throws an error if `FormHandler` encounters an issue (e.g., network error).
   *                 Server-side validation errors are reflected in `this.transaction.errors`.
   */
  async deny(payload?: CustomOptions): Promise<void> {
    const route = `/u/consent?state=${this.transaction.state}`;
    const formOptions: SDKFormOptions = {
      state: this.transaction.state, // For form body
      telemetry: [Consent.screenIdentifier, 'deny'],
      route: route, // For form action URL
    };

    const submitPayload = {
      ...payload,
      action: FormActions.DENY,
    };

    await new FormHandler(formOptions).submitData<typeof submitPayload>(submitPayload);
  }
}

// Export all necessary types and members for this screen
export { ConsentMembers, ScreenMembersOnConsent, Scope };
export * from '../../../interfaces/export/common'; // Re-export common types
export * from '../../../interfaces/export/base-properties'; // Re-export base model members