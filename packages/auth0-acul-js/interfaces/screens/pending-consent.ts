import type { CustomOptions } from '../common';
import type { BaseMembers } from '../models/base-context';
import type { MfaPollingOptions, MfaPushPollingControl } from '../utils/polling-control';

/**
 * Interface describing the members of the Pending Consent screen.
 *
 * This screen is a waiting room shown during PAR, RAR, or CIBA flows when no
 * customized-consent prompt is configured. The user approves or denies the request
 * off-browser through the My Account experience while this screen polls for the outcome.
 */
export interface PendingConsentMembers extends BaseMembers {
  /**
   * Continues the flow once the pending consent has been resolved off-browser.
   *
   * Posts only the transaction `state`. Auth0 reads the approve/deny outcome from the
   * consent status, not from the request body. If the consent is still pending, Auth0
   * renders this screen again instead of redirecting.
   *
   * @param payload Optional custom options to include with the request.
   */
  continue(payload?: CustomOptions): Promise<void>;

  /**
   * Polls the pending-consent status until the consent is resolved off-browser.
   *
   * `onCompleted` fires when the consent has been approved or denied. Call `continue()`
   * from it to advance the flow.
   *
   * @param options Configuration options for polling of type {@link MfaPollingOptions}.
   * @returns An object to control the polling process.
   */
  pollingManager(options: MfaPollingOptions): MfaPushPollingControl;
}
