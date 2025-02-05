interface BraveNavigator extends Navigator {
  brave?: {
    isBrave?: () => Promise<boolean>;
  };
}

export async function isBrave(): Promise<boolean> {
  if (typeof navigator === 'undefined') {
    return false;
  }

  const navigatorBrave = navigator as BraveNavigator;

  if (navigatorBrave.brave?.isBrave && typeof navigatorBrave.brave.isBrave === 'function') {
    try {
      return Boolean(await navigatorBrave.brave.isBrave());
    } catch {
      return false; // Gracefully handle any errors
    }
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
  if (!window || !window.PublicKeyCredential) {
    return false;
  }

  console.log('xxxx2', window.PublicKeyCredential);

  try {
    return Boolean(await window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable());
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('isUserVerifyingPlatformAuthenticatorAvailable failed', err);
    return false;
  }
}
