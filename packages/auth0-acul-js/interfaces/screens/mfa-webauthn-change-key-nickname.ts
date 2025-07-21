import type { CustomOptions } from '../common';
import type { BaseMembers } from '../models/base-context';
import type { ScreenMembers } from '../models/screen';

/**
 * @interface ScreenMembersOnMfaWebAuthnChangeKeyNickname
 * @extends ScreenMembers
 * description Defines the specific properties available on the `screen` object for the
 * 'mfa-webauthn-change-key-nickname' screen.
 *
 * @property {object | null} data - Screen-specific data.
 * @property {string} data.nickname - The current nickname of the WebAuthn security key.
 *                                     This is the nickname that the user wants to change.
 */
export interface ScreenMembersOnMfaWebAuthnChangeKeyNickname extends ScreenMembers {
  /**
   * Screen-specific data containing the current nickname of the WebAuthn key.
   * @type {{ nickname: string; } | null}
   */
  data: {
    /**
     * The current nickname of the WebAuthn security key that the user is about to change.
     * This value should be displayed to the user for context.
     * @type {string}
     * @example "My YubiKey"
     * @example "Work Security Key"
     */
    nickname: string;
  } | null;
}

/**
 * @interface ContinueOptions
 * @extends CustomOptions
 * description Defines the options for the `continueWithNewNickname` method on the
 * MFA WebAuthn Change Key Nickname screen. This operation is used when the user submits
 * the new desired nickname for their security key.
 *
 * @property {string} nickname - The new nickname for the WebAuthn security key.
 *                               This is the value entered by the user in the input field.
 *                               It must adhere to length and character constraints defined by the server.
 */
export interface ContinueOptions extends CustomOptions {
  /**
   * The new nickname that the user wants to assign to their WebAuthn security key.
   * This value will be sent to the server for an update.
   * The server will validate this nickname (e.g., for length, allowed characters).
   * @type {string}
   * @example "Primary YubiKey"
   * @example "Home Office Key"
   */
  nickname: string;
}

/**
 * @interface MfaWebAuthnChangeKeyNicknameMembers
 * @extends BaseMembers
 * description Defines all accessible members (properties and methods) for the
 * MFA WebAuthn Change Key Nickname screen. This screen allows a user to update
 * the nickname of one of their registered WebAuthn security keys.
 *
 * The `universal_login_context` for this screen (`window.universal_login_context`) will contain:
 * - `client`: Information about the Auth0 application.
 * - `organization` (optional): Details if the operation is for a specific organization.
 * - `prompt`: Context of the current authentication prompt.
 * - `screen`: UI texts and screen-specific data, including the `screen.data.nickname` (current nickname).
 * - `transaction`: Details of the ongoing transaction, including state and any errors from previous
 *                  attempts (e.g., "no-nickname", "nickname-too-long").
 */
export interface MfaWebAuthnChangeKeyNicknameMembers extends BaseMembers {
  /**
   * Submits the new nickname for the WebAuthn security key.
   * This action corresponds to the user entering a new nickname and clicking a "Save" or "Continue" button.
   * The SDK will POST this new nickname to the Auth0 `/u/mfa-webauthn-change-key-nickname` endpoint.
   *
   * If the new nickname is valid and the update is successful, Auth0 will typically redirect the user
   * to the next appropriate screen (e.g., back to MFA factor management or a success confirmation).
   * If the nickname is invalid (e.g., empty, too long, too short), Auth0 will re-render the
   * 'mfa-webauthn-change-key-nickname' screen, and the `transaction.errors` array in the SDK's
   * context will be updated with details about the validation failure.
   *
   * @param {ContinueOptions} payload - An object containing the `nickname` (string) entered by the user.
   *                                    It can also include any `CustomOptions` for extensibility.
   * @returns {Promise<void>} A promise that resolves when the form submission is initiated.
   *                          It does not return data directly upon resolution, as a redirect or
   *                          page re-render is the common outcome.
   * @throws {Error} Throws an error if `payload.nickname` is not provided or is not a string,
   *                 or if the `FormHandler` encounters an unrecoverable issue during submission (e.g., network error).
   *                 Validation errors from Auth0 (like an invalid nickname) are not thrown as JavaScript errors
   *                 but are reflected in `this.transaction.errors` after the operation.
   *
   * @example
   * ```typescript
   * // Assuming 'sdk' is an instance of MfaWebAuthnChangeKeyNickname
   * const newNickname = "My Favorite YubiKey"; // Value from user input
   * try {
   *   await sdk.continueWithNewNickname({ nickname: newNickname });
   *   // If successful, page redirects.
   * } catch (error) {
   *   // This catch is for unexpected errors during the SDK call itself.
   *   console.error("Failed to submit the new nickname:", error);
   * }
   * // After the await, always check sdk.transaction.errors for server-side validation issues.
   * if (sdk.transaction.errors && sdk.transaction.errors.length > 0) {
   *   sdk.transaction.errors.forEach(err => {
   *     if (err.field === 'nickname') {
   *       // Display err.message related to the nickname input field.
   *       // e.g., "Name is too short", "Name is required"
   *     }
   *   });
   * }
   * ```
   */
  continueWithNewNickname(payload: ContinueOptions): Promise<void>;
}