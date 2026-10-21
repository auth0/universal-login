import type { CustomOptions } from '../common';
import type { BaseMembers } from '../models/base-context';
import type { ScreenMembers, ScreenData } from '../models/screen';

export interface ResetPasswordEmailOptions {
  [key: string]: string | number | boolean | undefined;
}

export interface ScreenDataOptions extends ScreenData {
  username?: string;
  email?: string;
}

export interface ScreenMembersOnResetPasswordEmail extends ScreenMembers {
  data: {
    username?: string;
    email?: string;
  } | null;
}

export interface ResetPasswordEmailMembers extends BaseMembers {
  screen: ScreenMembersOnResetPasswordEmail;
  /**
   * Returns the user to the reset password request screen to request a new email.
   *
   * @remarks
   * Submits a form POST with `action: "resend-email-action"`. Auth0 doesn't send a
   * new email at this step. It renders the `reset-password-request` screen, where the
   * user submits their email or username again to receive a new email. The browser
   * loads a new page, and the current JavaScript context, including component state
   * and timers, is lost.
   *
   * @param payload - Optional custom parameters to send with the request.
   * @returns A promise that resolves once the form is submitted, before the new
   * page loads. It doesn't confirm that an email was sent.
   */
  resendEmail(payload?: CustomOptions): Promise<void>;
}
