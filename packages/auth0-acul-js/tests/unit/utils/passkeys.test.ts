import { Errors } from '../../../src/constants';
import { isWebAuthPlatformAvailable } from '../../../src/utils/browser-capabilities';
import {
  base64UrlToUint8Array,
  uint8ArrayToBase64Url,
} from '../../../src/utils/codec';
import {
  getPasskeyCredentials,
  createPasskeyCredentials,
  registerPasskeyAutofill
} from '../../../src/utils/passkeys';

import type {
  PasskeyRead,
  PasskeyCreate,
} from '../../../interfaces/models/screen';

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

describe('registerPasskeyAutofill', () => {
  let mockGet: jest.Mock;
  let originalPublicKeyCredential: unknown;
  let onResolve: jest.Mock;
  let onReject: jest.Mock;

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.resetAllMocks();
  
    mockGet = jest.fn().mockResolvedValue({ id: 'mock-credential' }); // default safe mock
  
    Object.defineProperty(navigator, 'credentials', {
      configurable: true,
      writable: true,
      value: { get: mockGet },
    });
  
    document.body.innerHTML = '';
    onResolve = jest.fn();
    onReject = jest.fn();
  
    originalPublicKeyCredential = (global as any).PublicKeyCredential;
    (global as any).PublicKeyCredential = {
      isConditionalMediationAvailable: jest.fn().mockResolvedValue(true),
    };
  
    (base64UrlToUint8Array as jest.Mock).mockReturnValue(new Uint8Array([1, 2, 3]));
  });

  afterEach(() => {
    (global as any).PublicKeyCredential = originalPublicKeyCredential;
  });

  it('should throw if publicKey.challenge is missing', async () => {
    await expect(
      registerPasskeyAutofill({
        publicKey: {} as any,
        onResolve,
      })
    ).rejects.toThrow(Errors.PASSKEY_PUBLIC_KEY_UNAVAILABLE);
  });

  it('should reject if conditional mediation is not supported', async () => {
    (global as any).PublicKeyCredential.isConditionalMediationAvailable = jest.fn().mockResolvedValue(false);

    await registerPasskeyAutofill({
      publicKey: { challenge: 'mock-challenge' },
      onResolve,
      onReject,
    });

    expect(onReject).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Conditional mediation not supported by this browser.',
      })
    );
  });

  it('should reject if WebAuthn is not supported', async () => {
    delete (navigator as any).credentials; // remove credentials to simulate unsupported
    await registerPasskeyAutofill({
      publicKey: { challenge: 'mock-challenge' },
      onResolve,
      onReject,
    });

    expect(onReject).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'WebAuthn is not supported in this environment.',
      })
    );
  });

  it('should update autocomplete attribute on valid input', async () => {
    const input = document.createElement('input');
    input.id = 'login-input';
    document.body.appendChild(input);

    mockGet.mockResolvedValue({ id: 'mock-credential' });

    const controller = await registerPasskeyAutofill({
      publicKey: { challenge: 'mock-challenge' },
      inputId: 'login-input',
      onResolve,
      onReject,
    });

    expect(input.getAttribute('autocomplete')).toBe('username webauthn');
    expect(controller).toHaveProperty('abort');
    expect(controller).toHaveProperty('signal');
  });

  it('should warn if element id is invalid or not input', async () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const div = document.createElement('div');
    div.id = 'non-input';
    document.body.appendChild(div);

    await registerPasskeyAutofill({
      publicKey: { challenge: 'mock-challenge' },
      inputId: 'non-input',
      onResolve,
    });

    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('No valid <input> found with id="non-input"')
    );

    warnSpy.mockRestore();
  });

  it('should call onResolve when credentials.get resolves successfully', async () => {
    const mockCredential = { id: 'mock-credential' };
    mockGet.mockResolvedValue(mockCredential);

    const controller = await registerPasskeyAutofill({
      publicKey: { challenge: 'mock-challenge' },
      onResolve,
      onReject,
    });

    // Simulate async resolution
    await Promise.resolve();

    expect(onResolve).toHaveBeenCalledWith(mockCredential);
    expect(onReject).not.toHaveBeenCalled();
    expect(controller).toHaveProperty('abort');
    expect(controller).toHaveProperty('signal');
  });

  it('should call onReject when credentials.get throws an error', async () => {
    const error = new Error('Some WebAuthn failure');
    mockGet.mockRejectedValue(error);

    await registerPasskeyAutofill({
      publicKey: { challenge: 'mock-challenge' },
      onResolve,
      onReject,
    });

    await Promise.resolve(); // allow promise to resolve

    expect(onReject).toHaveBeenCalledWith(error);
  });

  it('should ignore AbortError exceptions', async () => {
    const abortError = new DOMException('Aborted', 'AbortError');
    mockGet.mockRejectedValue(abortError);

    await registerPasskeyAutofill({
      publicKey: { challenge: 'mock-challenge' },
      onResolve,
      onReject,
    });

    await Promise.resolve();

    // AbortError should not trigger onReject
    expect(onReject).not.toHaveBeenCalled();
  });
});
