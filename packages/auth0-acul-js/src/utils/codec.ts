export function base64UrlToUint8Array(base64Url: string): ArrayBuffer {
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const padding = base64.length % 4 ? '='.repeat(4 - (base64.length % 4)) : '';
  const base64WithPadding = base64 + padding;

  const binaryString = atob(base64WithPadding);
  const length = binaryString.length;
  const uint8Array = new Uint8Array(length);

  for (let i = 0; i < length; i++) {
    uint8Array[i] = binaryString.charCodeAt(i);
  }

  return uint8Array.buffer;
}

export function uint8ArrayToBase64Url(arraybuffer: ArrayBufferLike): string | null {
  if (!(arraybuffer instanceof ArrayBuffer)) return null;

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
  const bytes = new Uint8Array(arraybuffer);
  let base64url = '';

  for (let i = 0; i < bytes.length; i += 3) {
    base64url += chars[bytes[i] >> 2];
    base64url += chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
    base64url += chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
    base64url += chars[bytes[i + 2] & 63];
  }

  if (bytes.length % 3 === 2) base64url = base64url.slice(0, -1);
  else if (bytes.length % 3 === 1) base64url = base64url.slice(0, -2);

  return base64url;
}
