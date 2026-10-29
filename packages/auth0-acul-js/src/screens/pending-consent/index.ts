import { ScreenIds } from '../../constants';
import { BaseContext } from '../../models/base-context';
import { FormHandler } from '../../utils/form-handler';
import { createPollingControl } from '../../utils/polling-control';

import type { CustomOptions } from '../../../interfaces/common';
import type { PendingConsentMembers } from '../../../interfaces/screens/pending-consent';
import type { FormOptions } from '../../../interfaces/utils/form-handler';
import type { MfaPollingOptions, MfaPushPollingControl } from '../../../interfaces/utils/polling-control';

/**
 * Class implementing the Pending Consent screen functionality.
 * This screen is a waiting room shown during PAR, RAR, or CIBA flows when no
 * customized-consent prompt is configured. The user approves or denies the request
 * off-browser through the My Account experience while this screen polls for the outcome.
 */
export default class PendingConsent extends BaseContext implements PendingConsentMembers {
  static screenIdentifier: string = ScreenIds.PENDING_CONSENT;

  /**
   * Creates an instance of the PendingConsent screen.
   * @throws {Error} If the Universal Login Context is not available or if the
   * current screen name in the context does not match `PendingConsent.screenIdentifier`.
   */
  constructor() {
    super();
  }

  /**
   * Continues the flow once the pending consent has been resolved off-browser.
   *
   * @remarks
   * Submits a form POST that carries only the transaction `state`. Auth0 reads the
   * approve/deny outcome from the consent status, not from the request body, so there is
   * no separate accept or deny action. If the consent is still pending, Auth0 renders this
   * screen again instead of redirecting, and the page reloads.
   *
   * @param payload Optional custom options to include with the request.
   * @throws {Error} Throws an error if `FormHandler` encounters an unrecoverable issue
   *                 during submission (e.g., network error). Server-side validation errors
   *                 from Auth0 are not thrown as JavaScript errors but are made available
   *                 in `this.transaction.errors` after the operation.
   * @example
   * ```typescript
   * import PendingConsent from '@auth0/auth0-acul-js/pending-consent';
   *
   * const pendingConsent = new PendingConsent();
   * await pendingConsent.continue();
   * ```
   */
  async continue(payload?: CustomOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [PendingConsent.screenIdentifier, 'continue'],
    };

    await new FormHandler(options).submitData<CustomOptions>({ ...payload });
  }

  /**
   * Starts and manages polling for the pending-consent status.
   *
   * Creates a polling session that repeatedly checks the pending-consent endpoint
   * at the specified interval until the consent is resolved off-browser or an error occurs.
   * The consent counts as resolved when it has been either approved or denied. At that point
   * the provided {@link MfaPollingOptions.onCompleted | onCompleted} callback is invoked and
   * polling stops automatically. Call `continue()` from `onCompleted` to advance the flow.
   * Auth0 then applies the approve/deny outcome.
   *
   * Use the returned {@link MfaPushPollingControl} to start, stop, or check the
   * status of the polling process at any time.
   *
   * @param options - {@link MfaPollingOptions | Configuration options} for the polling process:
   * - `intervalMs` — Optional polling interval in milliseconds (defaults to SDK’s internal value, typically 5000 ms).
   * - `onCompleted` — Optional callback fired when the consent has been approved or denied.
   * - `onError` — Optional callback fired when a polling error occurs, receiving an {@link Error}.
   *
   * @returns A {@link MfaPushPollingControl} instance exposing:
   * - `startPolling()` — Starts or resumes polling.
   * - `stopPolling()` — Cancels polling immediately.
   * - `isRunning()` — Indicates whether polling is currently active.
   *
   * @utilityFeature
   *
   * @example
   * ```ts
   * import PendingConsent from '@auth0/auth0-acul-js/pending-consent';
   *
   * const pendingConsent = new PendingConsent();
   *
   * // Poll every 5 seconds until the consent is approved or denied off-browser
   * const control = pendingConsent.pollingManager({
   *   intervalMs: 5000,
   *   onCompleted: () => pendingConsent.continue(),
   *   onError: (error) => console.error('Polling error:', error),
   * });
   *
   * control.startPolling();
   *
   * // Later, cancel polling if needed
   * control.stopPolling();
   * ```
   *
   * @remarks
   * - HTTP 429 (rate limit) responses are handled internally: polling automatically
   *   waits until the rate limit resets before retrying.
   * - Safe to call `startPolling()` multiple times; it has no effect if already running.
   */
  pollingManager(options: MfaPollingOptions): MfaPushPollingControl {
    return createPollingControl(options);
  }
}

export { PendingConsentMembers, MfaPollingOptions, MfaPushPollingControl };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
