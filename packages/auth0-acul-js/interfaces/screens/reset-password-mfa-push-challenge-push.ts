import type { CustomOptions } from "../common";
import type { BaseMembers } from "../models/base-context";
import type { ScreenMembers } from "../models/screen";
import type {
  MfaPollingOptions,
  MfaPushPollingControl,
} from "../utils/polling-control.ts";

/**
 * Interface for the screen data specific to reset-password-mfa-push-challenge-push screen
 */
export interface ScreenMembersOnResetPasswordMfaPushChallengePush
  extends ScreenMembers {
  data: {
    deviceName: string;
    rememberDevice?: boolean;
  } | null;
}

/**
 * Interface defining the available methods and properties for the reset-password-mfa-push-challenge-push screen
 */
export interface ResetPasswordMfaPushChallengePushMembers extends BaseMembers {
  screen: ScreenMembersOnResetPasswordMfaPushChallengePush;

  /**
   * Continues with the push notification challenge
   * @param payload Optional custom options to include with the request
   */
  continue(payload?: CustomOptions): Promise<void>;

  /**
   * Resends the push notification.
   *
   * @remarks
   * Submits a form POST with `action: "resend"`. Auth0 sends a new push notification
   * and renders this screen again. The browser reloads the page, and the current
   * JavaScript context, including component state, timers, and active polling, is lost.
   *
   * Code after `await resendPushNotification()` may still run, but anything it sets up,
   * such as a "notification sent" message, is gone after the reload. Server-side errors
   * appear in `transaction.errors` (or `useErrors()` in React) on the reloaded page.
   * They don't reject the returned promise.
   *
   * @param payload - Optional custom parameters to send with the request.
   * @returns A promise that resolves once the form is submitted, before the page
   * reloads. It doesn't confirm that a new notification was sent.
   */
  resendPushNotification(payload?: CustomOptions): Promise<void>;

  /**
   * Switches to entering the verification code manually
   * @param payload Optional custom options to include with the request
   */
  enterCodeManually(payload?: CustomOptions): Promise<void>;

  /**
   * Allows trying another authentication method
   * @param payload Optional custom options to include with the request
   */
  tryAnotherMethod(payload?: CustomOptions): Promise<void>;

  /**
   * Allows polling for the push notification challenge to be approved.
   * @param options of type {@link MfaPollingOptions}
   */
  pollingManager(options?: MfaPollingOptions): MfaPushPollingControl;
}
