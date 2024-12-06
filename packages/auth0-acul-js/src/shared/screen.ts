import type { PasskeyCreate, PasskeyRead, ScreenContext } from '../../interfaces/models/screen';

export function getSignupLink(screen: ScreenContext): string | null {
  const links = screen?.links;
  return links?.signup ?? null;
}

export function getBackLink(screen: ScreenContext): string | null {
  const links = screen?.links;
  return links?.back ?? null;
}

export function getLoginLink(screen: ScreenContext): string | null {
  const links = screen?.links;
  return links?.login ?? null;
}

export function getResetPasswordLink(screen: ScreenContext): string | null {
  const links = screen?.links;
  return links?.reset_password ?? null;
}

export function getForgotPasswordLink(screen: ScreenContext): string | null {
  const links = screen?.links;
  return links?.forgot_password ?? null;
}

export function getEditIdentifierLink(screen: ScreenContext): string | null {
  const links = screen?.links;
  return links?.edit_identifier ?? null;
}

export function getPublicKey(screen: ScreenContext): PasskeyRead['public_key'] | PasskeyCreate['public_key'] | null {
  const passkey = screen.data?.passkey as PasskeyRead | PasskeyCreate;
  return passkey?.public_key ?? null;
}
