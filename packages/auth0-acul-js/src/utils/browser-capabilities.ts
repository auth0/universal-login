export async function isBrave(): Promise<boolean> {
  // @ts-ignore
  const isBrave = (navigator.brave && (await navigator.brave?.isBrave())) || false;
  return isBrave;
}

export function isWebAuthAvailable(): boolean {
  return typeof window.PublicKeyCredential !== 'undefined';
}

export function isJsAvailable(): boolean {
  return true;
}

export async function isWebAuthPlatformAvailable(): Promise<boolean> {
  if (typeof window.PublicKeyCredential === 'undefined') {
    return false;
  }
  const isAvailable = await window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
  return isAvailable;
}
