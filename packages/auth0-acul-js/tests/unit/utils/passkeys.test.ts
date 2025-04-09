import {
  getPasskeyCredentials,
  createPasskeyCredentials,
} from '../../../src/utils/passkeys';
import {
  base64UrlToUint8Array,
  uint8ArrayToBase64Url,
} from '../../../src/utils/codec';
import { isWebAuthPlatformAvailable } from '../../../src/utils/browser-capabilities';
import { Errors } from '../../../src/constants';
import type {
  PasskeyRead,
  PasskeyCreate,
} from '../../../interfaces/models/screen';
import type {
  PasskeyCreateResponse,
  PasskeyCredentialResponse,
} from '../../../interfaces/utils/passkeys';

jest.mock('../../../src/utils/browser-capabilities', () => ({
  isWebAuthPlatformAvailable: jest.fn(),
}));

jest.mock('../../../src/utils/codec', () => ({
  base64UrlToUint8Array: jest.fn(),
  uint8ArrayToBase64Url: jest.fn(),
}));

describe('getPasskeyCredentials', () => {
  let navigatorGetSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.resetAllMocks();
    Object.defineProperty(navigator, 'credentials', {
      value: {
        get: jest.fn(),
        create: jest.fn(),
      },
      configurable: true,
    });
  
    navigatorGetSpy = jest.spyOn(navigator.credentials, 'get');
  });
  

  it('should throw an error if publicKey.challenge is missing', async () => {
    await expect(getPasskeyCredentials({} as PasskeyRead['public_key'])).rejects.toThrow(
      Errors.PASSKEY_PUBLIC_KEY_UNAVAILABLE
    );
  });

  it('should call navigator.credentials.get and return expected values', async () => {
    (isWebAuthPlatformAvailable as jest.Mock).mockResolvedValue(true);
    const mockCredential = {
      id: 'mock-id',
      rawId: new Uint8Array([1, 2, 3]).buffer,
      type: 'public-key',
      authenticatorAttachment: 'platform',
      response: {
        clientDataJSON: new Uint8Array([4, 5, 6]).buffer,
        authenticatorData: new Uint8Array([7, 8, 9]).buffer,
        signature: new Uint8Array([10, 11, 12]).buffer,
        userHandle: new Uint8Array([13, 14, 15]).buffer,
      },
    };
    navigatorGetSpy.mockResolvedValue(mockCredential);

    (uint8ArrayToBase64Url as jest.Mock).mockImplementation((buffer) => `mocked-${buffer}`);

    const result = await getPasskeyCredentials({ challenge: 'mock-challenge' } as PasskeyRead['public_key']);

    expect(result).toEqual({
      id: 'mock-id',
      rawId: 'mocked-[object ArrayBuffer]',
      type: 'public-key',
      authenticatorAttachment: 'platform',
      response: {
        clientDataJSON: 'mocked-[object ArrayBuffer]',
        authenticatorData: 'mocked-[object ArrayBuffer]',
        signature: 'mocked-[object ArrayBuffer]',
        userHandle: 'mocked-[object ArrayBuffer]',
      },
      isUserVerifyingPlatformAuthenticatorAvailable: true,
    });

    expect(navigator.credentials.get).toHaveBeenCalled();
  });

  it('should throw an error if credentials.get returns null', async () => {
    navigatorGetSpy.mockResolvedValue(null);
    await expect(getPasskeyCredentials({ challenge: 'mock-challenge' } as PasskeyRead['public_key'])).rejects.toThrow(
      Errors.PASSKEY_CREDENTIALS_UNAVAILABLE
    );
  });

  it('should throw an error if response is not an AuthenticatorAssertionResponse', async () => {
    navigatorGetSpy.mockResolvedValue({
      id: 'mock-id',
      type: 'public-key',
      response: {},
    });
    await expect(getPasskeyCredentials({ challenge: 'mock-challenge' } as PasskeyRead['public_key'])).rejects.toThrow(
      Errors.PASSKEY_EXPECTED_ASSERTION_RESPONSE
    );
  });
});

describe('createPasskeyCredentials', () => {
  let navigatorCreateSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.resetAllMocks();
    navigatorCreateSpy = jest.spyOn(navigator.credentials, 'create');
  });

  it('should throw an error if publicKey.challenge is missing', async () => {
    await expect(createPasskeyCredentials({} as PasskeyCreate['public_key'])).rejects.toThrow(
      Errors.PASSKEY_PUBLIC_KEY_UNAVAILABLE
    );
  });

  it('should call navigator.credentials.create and return expected values', async () => {
    const mockCredential = {
      id: 'mock-id',
      rawId: new Uint8Array([1, 2, 3]).buffer,
      type: 'public-key',
      authenticatorAttachment: 'platform',
      response: {
        clientDataJSON: new Uint8Array([4, 5, 6]).buffer,
        attestationObject: new Uint8Array([7, 8, 9]).buffer,
        getTransports: jest.fn().mockReturnValue(['usb', 'nfc']),
      },
    };
  
    navigatorCreateSpy.mockResolvedValue(mockCredential);
  
    (uint8ArrayToBase64Url as jest.Mock).mockImplementation((buffer) => `mocked-${buffer}`);
  
    const result = await createPasskeyCredentials({
      challenge: 'mock-challenge',
      user: { id: 'user-id-123', name: 'John Doe', displayName: 'John' },
      rp: { id: 'example.com', name: 'Example Inc.' },
      pubKeyCredParams: [{ type: 'public-key', alg: -7 }],
      authenticatorSelection: { residentKey: 'preferred', userVerification: 'preferred' },
    });
  
    expect(result).toEqual({
      id: 'mock-id',
      rawId: 'mocked-[object ArrayBuffer]',
      type: 'public-key',
      authenticatorAttachment: 'platform',
      response: {
        clientDataJSON: 'mocked-[object ArrayBuffer]',
        attestationObject: 'mocked-[object ArrayBuffer]',
        transports: ['usb', 'nfc'],
      },
    });
  
    expect(navigator.credentials.create).toHaveBeenCalled();
  });
  
  it('should throw an error if credentials.create returns null', async () => {
    navigatorCreateSpy.mockResolvedValue(null);
  
    await expect(
      createPasskeyCredentials({
        challenge: 'mock-challenge',
        user: { id: 'user-id-123', name: 'John Doe', displayName: 'John' },
        rp: { id: 'example.com', name: 'Example Inc.' },
        pubKeyCredParams: [{ type: 'public-key', alg: -7 }],
        authenticatorSelection: { residentKey: 'preferred', userVerification: 'preferred' }
      })
    ).rejects.toThrow(Errors.PASSKEY_CREATE_FAILED);
  });

  it('should handle missing getTransports in response', async () => {
    const mockCredential = {
      id: 'mock-id',
      rawId: new Uint8Array([1, 2, 3]).buffer,
      type: 'public-key',
      authenticatorAttachment: 'platform',
      response: {
        clientDataJSON: new Uint8Array([4, 5, 6]).buffer,
        attestationObject: new Uint8Array([7, 8, 9]).buffer,
      },
    };
  
    navigatorCreateSpy.mockResolvedValue(mockCredential);
  
    const result = await createPasskeyCredentials({
      challenge: 'mock-challenge',
      user: { id: 'user-id-123', name: 'John Doe', displayName: 'John' },
      rp: { id: 'example.com', name: 'Example Inc.' },
      pubKeyCredParams: [{ type: 'public-key', alg: -7 }],
      authenticatorSelection: { residentKey: 'preferred', userVerification: 'preferred' },
    });
  
    expect(result.response.transports).toBeUndefined();
  });

  it('should handle missing getTransports in createPasskeyCredentials', async () => {
    const mockCredential = {
      id: 'mock-id',
      rawId: new Uint8Array([1, 2, 3]).buffer,
      type: 'public-key',
      authenticatorAttachment: 'platform',
      response: {
        clientDataJSON: new Uint8Array([4, 5, 6]).buffer,
        attestationObject: new Uint8Array([7, 8, 9]).buffer,
      }
    };
  
    navigatorCreateSpy.mockResolvedValue(mockCredential);
  
    const result = await createPasskeyCredentials({
      challenge: 'mock-challenge',
      user: { id: 'user-id-123', name: 'John Doe', displayName: 'John' },
      rp: { id: 'example.com', name: 'Example Inc.' },
      pubKeyCredParams: [{ type: 'public-key', alg: -7 }],
      authenticatorSelection: { residentKey: 'preferred', userVerification: 'preferred' },
    });
  
    expect(result.response.transports).toBeUndefined();
  });  
});
