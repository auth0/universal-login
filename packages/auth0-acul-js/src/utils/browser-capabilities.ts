export async function isBrave(): Promise<boolean> {
  // @ts-expect-error: navigator.brave may not exist on all browsers
  const navigatorBrave = navigator?.brave as { isBrave?: () => Promise<boolean> } | undefined;

  if (navigatorBrave && typeof navigatorBrave.isBrave === 'function') {
    const isBraveBrowser = await navigatorBrave.isBrave();
    return Boolean(isBraveBrowser);
  }

  return false;
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
  return Boolean(isAvailable);
}
