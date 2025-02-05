export function base64UrlToUint8Array(base64Url: string): ArrayBuffer {
  if (!base64Url || typeof base64Url !== 'string') {
    throw new TypeError('Invalid base64Url input');
  }

  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const paddingNeeded = (4 - (base64.length % 4)) % 4;
  const paddedBase64 = base64 + '='.repeat(paddingNeeded);
  const binaryString = atob(paddedBase64);
  const uint8Array = new Uint8Array(binaryString.length);

  for (let i = 0; i < binaryString.length; i++) {
    uint8Array[i] = binaryString.charCodeAt(i);
  }

  return uint8Array.buffer;
}

export function uint8ArrayToBase64Url(arraybuffer: ArrayBufferLike): string {
  if (!(arraybuffer instanceof ArrayBuffer)) {
    throw new TypeError('Expected an ArrayBuffer');
  }

  const bytes = new Uint8Array(arraybuffer);
  let binary = '';

  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  // Convert to Base64
  const base64 = btoa(binary)
    .replace(/\+/g, '-') // Convert '+' to '-'
    .replace(/\//g, '_') // Convert '/' to '_'
    .replace(/=+$/, ''); // Remove padding '='

  return base64;
}
