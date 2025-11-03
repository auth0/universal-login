import { Screen } from '../../../../src/models/screen';
import { ScreenOverride } from '../../../../src/screens/reset-password-mfa-webauthn-roaming-challenge/screen-override';
import * as sharedScreen from '../../../../src/shared/screen';

import type { ScreenContext, PasskeyRead } from '../../../../interfaces/models/screen';

// Mock the shared utility functions
jest.mock('../../../../src/shared/screen', () => ({
  getPublicKey: jest.fn(),
  getShowRememberDevice: jest.fn(),
}));

describe('ResetPasswordMfaWebAuthnRoamingChallenge ScreenOverride', () => {
  const mockPublicKeyData: PasskeyRead['public_key'] = {
    challenge: 'mockChallengeDataForPasswordResetMfa',
    // Other properties if defined in PasskeyRead.public_key
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should correctly initialize with valid screen context data', () => {
    const screenContext: ScreenContext = {
      name: 'reset-password-mfa-webauthn-roaming-challenge',
      data: {
        passkey: { public_key: mockPublicKeyData },
        show_remember_device: true,
      },
    } as ScreenContext; // Cast for test purposes

    // Setup mocks for shared utility functions
    (sharedScreen.getPublicKey as jest.Mock).mockReturnValue(mockPublicKeyData);
    (sharedScreen.getShowRememberDevice as jest.Mock).mockReturnValue(true);

    const screenOverride = new ScreenOverride(screenContext);

    expect(screenOverride).toBeInstanceOf(Screen); // Check inheritance
    expect(sharedScreen.getPublicKey).toHaveBeenCalledWith(screenContext);
    expect(sharedScreen.getShowRememberDevice).toHaveBeenCalledWith(screenContext);
    expect(screenOverride.publicKey).toEqual(mockPublicKeyData);
    expect(screenOverride.data?.showRememberDevice).toBe(true);
  });

  it('should handle show_remember_device being false', () => {
    const screenContext: ScreenContext = {
      name: 'reset-password-mfa-webauthn-roaming-challenge',
      data: {
        passkey: { public_key: mockPublicKeyData },
        show_remember_device: false,
      },
    } as ScreenContext;

    // Setup mocks
    (sharedScreen.getPublicKey as jest.Mock).mockReturnValue(mockPublicKeyData);
    (sharedScreen.getShowRememberDevice as jest.Mock).mockReturnValue(false);

    const screenOverride = new ScreenOverride(screenContext);
    expect(screenOverride.data?.showRememberDevice).toBe(false);
  });

  it('should default showRememberDevice to false if show_remember_device is undefined in context', () => {
    const screenContext: ScreenContext = {
      name: 'reset-password-mfa-webauthn-roaming-challenge',
      data: {
        passkey: { public_key: mockPublicKeyData },
        // show_remember_device is omitted
      },
    } as ScreenContext;

    // Setup mocks
    (sharedScreen.getPublicKey as jest.Mock).mockReturnValue(mockPublicKeyData);
    (sharedScreen.getShowRememberDevice as jest.Mock).mockReturnValue(false); // Default behavior

    const screenOverride = new ScreenOverride(screenContext);
    expect(screenOverride.data?.showRememberDevice).toBe(false);
  });

  it('should set publicKey to null if passkey data is missing', () => {
    const screenContext: ScreenContext = {
      name: 'reset-password-mfa-webauthn-roaming-challenge',
      data: {
        show_remember_device: true,
        // passkey property is missing
      },
    } as ScreenContext;

    // Setup mocks
    (sharedScreen.getPublicKey as jest.Mock).mockReturnValue(null);
    (sharedScreen.getShowRememberDevice as jest.Mock).mockReturnValue(true);

    const screenOverride = new ScreenOverride(screenContext);
    expect(screenOverride.publicKey).toBeNull();
  });

  it('should set publicKey to null if passkey.public_key is missing', () => {
    const screenContext: ScreenContext = {
      name: 'reset-password-mfa-webauthn-roaming-challenge',
      data: {
        show_remember_device: true,
        passkey: {} as PasskeyRead, // public_key is missing inside passkey
      },
    } as ScreenContext;

    // Setup mocks
    (sharedScreen.getPublicKey as jest.Mock).mockReturnValue(null);
    (sharedScreen.getShowRememberDevice as jest.Mock).mockReturnValue(true);

    const screenOverride = new ScreenOverride(screenContext);
    expect(screenOverride.publicKey).toBeNull();
  });

  it('should handle when screenContext.data is undefined', () => {
    const screenContext: ScreenContext = {
      name: 'reset-password-mfa-webauthn-roaming-challenge',
      data: undefined,
    } as ScreenContext;

    // Setup mocks
    (sharedScreen.getPublicKey as jest.Mock).mockReturnValue(null);
    (sharedScreen.getShowRememberDevice as jest.Mock).mockReturnValue(false);

    const screenOverride = new ScreenOverride(screenContext);
    expect(screenOverride.publicKey).toBeNull();
    expect(screenOverride.data).toBeNull();
  });

  describe('static methods', () => {
    it('should call getPublicKey from shared/screen', () => {
      const screenContext: ScreenContext = {
        name: 'test-screen',
        data: { passkey: { public_key: mockPublicKeyData } },
      } as ScreenContext;

      ScreenOverride.getPublicKey(screenContext);
      expect(sharedScreen.getPublicKey).toHaveBeenCalledWith(screenContext);
    });

    it('getScreenData should extract and transform screen data correctly', () => {
      const screenContext: ScreenContext = {
        name: 'test-screen',
        data: { show_remember_device: true },
      } as ScreenContext;

      (sharedScreen.getShowRememberDevice as jest.Mock).mockReturnValue(true);
      const result = ScreenOverride.getScreenData(screenContext);
      expect(sharedScreen.getShowRememberDevice).toHaveBeenCalledWith(screenContext);
      expect(result?.showRememberDevice).toBe(true);
    });

    it('getScreenData should return null when data is missing', () => {
      const screenContext: ScreenContext = {
        name: 'test-screen',
        data: undefined,
      } as ScreenContext;

      const result = ScreenOverride.getScreenData(screenContext);
      expect(result).toBeNull();
    });
  });
});