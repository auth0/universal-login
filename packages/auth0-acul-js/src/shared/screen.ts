import type { PasskeyCreate, PasskeyRead, ScreenContext } from '../../interfaces/models/screen';

/**
 * Retrieves the signup link from the screen context.
 * 
 * @param {ScreenContext} screen - The screen context object from Universal Login.
 * @returns {string | null} - The signup link URL or null if not available.
 */
export function getSignupLink(screen: ScreenContext): string | null {
  const links = screen?.links;
  return links?.signup ?? null;
}

/**
 * Retrieves the back link from the screen context.
 * 
 * @param {ScreenContext} screen - The screen context object from Universal Login.
 * @returns {string | null} - The back link URL or null if not available.
 */
export function getBackLink(screen: ScreenContext): string | null {
  const links = screen?.links;
  return links?.back ?? null;
}

/**
 * Retrieves the login link from the screen context.
 * 
 * @param {ScreenContext} screen - The screen context object from Universal Login.
 * @returns {string | null} - The login link URL or null if not available.
 */
export function getLoginLink(screen: ScreenContext): string | null {
  const links = screen?.links;
  return links?.login ?? null;
}

/**
 * Retrieves the reset password link from the screen context.
 * 
 * @param {ScreenContext} screen - The screen context object from Universal Login.
 * @returns {string | null} - The reset password link URL or null if not available.
 */
export function getResetPasswordLink(screen: ScreenContext): string | null {
  const links = screen?.links;
  return links?.reset_password ?? null;
}

/**
 * Retrieves the forgot password link from the screen context.
 * 
 * @param {ScreenContext} screen - The screen context object from Universal Login.
 * @returns {string | null} - The forgot password link URL or null if not available.
 */
export function getForgotPasswordLink(screen: ScreenContext): string | null {
  const links = screen?.links;
  return links?.forgot_password ?? null;
}

/**
 * Retrieves the edit identifier link from the screen context.
 * 
 * @param {ScreenContext} screen - The screen context object from Universal Login.
 * @returns {string | null} - The edit identifier link URL or null if not available.
 */
export function getEditIdentifierLink(screen: ScreenContext): string | null {
  const links = screen?.links;
  return links?.edit_identifier ?? null;
}

/**
 * Retrieves the public key for passkeys from the screen context.
 * 
 * @param {ScreenContext} screen - The screen context object from Universal Login.
 * @returns {PasskeyRead['public_key'] | PasskeyCreate['public_key'] | null} - The public key for passkeys or null if not available.
 */
export function getPublicKey(screen: ScreenContext): PasskeyRead['public_key'] | PasskeyCreate['public_key'] | null {
  const passkey = screen.data?.passkey as PasskeyRead | PasskeyCreate;
  return passkey?.public_key ?? null;
}