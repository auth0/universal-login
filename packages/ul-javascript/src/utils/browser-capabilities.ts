export async function isBrave() {
  // @ts-ignore
  const isBrave = (navigator.brave && await navigator.brave.isBrave()) || false;
  return isBrave;
}

export function isWebAuthAvailable() {
  return typeof window.PublicKeyCredential !== 'undefined';
}

export function isJsAvailable() {
  return true;
}

export async function isWebAuthPlatformAvailable(): Promise<boolean> {
  if (typeof window.PublicKeyCredential === 'undefined') {
    return false;
  }
  const isAvailable = await window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
  return isAvailable;
}

export function base64UrlToUint8Array(base64string: string) {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';

  // Use a lookup table to find the index.
  const lookup = new Uint8Array(256);
  for (var i = 0; i < chars.length; i++) {
    lookup[chars.charCodeAt(i)] = i;
  }

  const bufferLength = base64string.length * 0.75;

  let p = 0,
    encoded1,
    encoded2,
    encoded3,
    encoded4;

  var bytes = new Uint8Array(bufferLength);

  for (let i = 0; i < base64string.length; i += 4) {
    encoded1 = lookup[base64string.charCodeAt(i)];
    encoded2 = lookup[base64string.charCodeAt(i + 1)];
    encoded3 = lookup[base64string.charCodeAt(i + 2)];
    encoded4 = lookup[base64string.charCodeAt(i + 3)];

    bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
    bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
    bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
  }

  return bytes.buffer;
}

export function uint8ArrayToBase64Url(arraybuffer: ArrayBufferLike) {
  if (!arraybuffer) {
    return null;
  }
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';

  var bytes = new Uint8Array(arraybuffer);
  let base64url = '';

  for (let i = 0; i < bytes.length; i += 3) {
    base64url += chars[bytes[i] >> 2];
    base64url += chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
    base64url += chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
    base64url += chars[bytes[i + 2] & 63];
  }

  if (bytes.length % 3 === 2) {
    base64url = base64url.substring(0, base64url.length - 1);
  } else if (bytes.length % 3 === 1) {
    base64url = base64url.substring(0, base64url.length - 2);
  }

  return base64url;
}

