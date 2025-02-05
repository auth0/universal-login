import { base64UrlToUint8Array, uint8ArrayToBase64Url } from '../../../src/utils/codec';

// Mock TextEncoder to work in Jest (JSDOM)
beforeAll(() => {
  global.TextEncoder = class {
    encode(text: string) {
      return Uint8Array.from(Buffer.from(text, 'utf-8'));
    }
  } as any;
});

describe('base64UrlToUint8Array', () => {
  it('should correctly convert a base64url string to an ArrayBuffer', () => {
    const base64Url = 'SGVsbG8td29ybGQ'; // "Hello-world" in base64url
    const expected = new TextEncoder().encode('Hello-world').buffer;

    const result = base64UrlToUint8Array(base64Url);
    expect(new Uint8Array(result)).toEqual(new Uint8Array(expected));
  });

  it('should correctly add padding when needed', () => {
    const base64Url = 'U29mdHdhcmU'; // "Software" in base64url
    const expected = new TextEncoder().encode('Software').buffer;

    const result = base64UrlToUint8Array(base64Url);
    expect(new Uint8Array(result)).toEqual(new Uint8Array(expected));
  });

  it('should handle an empty base64url string', () => {
    expect(() => base64UrlToUint8Array('')).toThrow('Invalid base64Url input');
  });

  it('should throw an error for invalid base64url input', () => {
    expect(() => base64UrlToUint8Array('$$invalid$$')).toThrow();
  });
});

describe('uint8ArrayToBase64Url', () => {
  it('should correctly convert an ArrayBuffer to a base64url string', () => {
    const input = new TextEncoder().encode('Hello-world').buffer;
    const result = uint8ArrayToBase64Url(input);

    expect(result).toBe('SGVsbG8td29ybGQ');
  });

  it('should throw an error when input is not an ArrayBuffer', () => {
    expect(() => uint8ArrayToBase64Url(null as any)).toThrow('Expected an ArrayBuffer');
    expect(() => uint8ArrayToBase64Url({} as any)).toThrow('Expected an ArrayBuffer');
  });

  it('should handle an empty ArrayBuffer', () => {
    const input = new ArrayBuffer(0);
    const result = uint8ArrayToBase64Url(input);

    expect(result).toBe('');
  });

  it('should correctly handle padding removal', () => {
    const input = new TextEncoder().encode('Software').buffer;
    const result = uint8ArrayToBase64Url(input);

    expect(result).toBe('U29mdHdhcmU');
  });
});
