import { Screen } from '../../../../src/models/screen';
import { ScreenOverride } from '../../../../src/screens/mfa-webauthn-roaming-challenge/screen-override';

import type { ScreenContext } from '../../../../interfaces/models/screen';
import type { WebAuthnType } from '../../../../interfaces/screens/mfa-webauthn-error';

describe('MfaWebAuthnRoamingChallenge ScreenOverride', () => {
  const mockPublicKey = {
    challenge: 'mockChallengeStringBase64Url',
  };
  const validWebauthnTypeRoaming: WebAuthnType = 'webauthn-roaming';

  it('should correctly initialize with valid screen context data', () => {
    const screenContext: ScreenContext = {
      name: 'mfa-webauthn-roaming-challenge',
      data: {
        show_remember_device: true,
        webauthnType: validWebauthnTypeRoaming,
        passkey: { public_key: mockPublicKey },
      },
    };

    const screenOverride = new ScreenOverride(screenContext);

    expect(screenOverride).toBeInstanceOf(Screen);
    expect(screenOverride.data?.showRememberDevice).toBe(true);
    expect(screenOverride.data?.webAuthnType).toBe(validWebauthnTypeRoaming);
    expect(screenOverride.publicKey).toEqual(mockPublicKey);
  });

  it('should handle show_remember_device being false', () => {
    const screenContext: ScreenContext = {
      name: 'mfa-webauthn-roaming-challenge',
      data: {
        show_remember_device: false,
        webauthnType: validWebauthnTypeRoaming,
        passkey: { public_key: mockPublicKey },
      },
    };
    const screenOverride = new ScreenOverride(screenContext);
    expect(screenOverride.data?.showRememberDevice).toBe(false);
  });

  it('should handle show_remember_device being undefined', () => {
    const screenContext: ScreenContext = {
      name: 'mfa-webauthn-roaming-challenge',
      data: {
        // show_remember_device is omitted
        webauthnType: validWebauthnTypeRoaming,
        passkey: { public_key: mockPublicKey },
      },
    };
    const screenOverride = new ScreenOverride(screenContext);
    // When show_remember_device is not present, getShowRememberDevice returns false
    // So our code sets it to undefined only if it's not a boolean, but getShowRememberDevice always returns boolean
    // Therefore, showRememberDevice will be false (the default from getShowRememberDevice)
    expect(screenOverride.data?.showRememberDevice).toBe(false);
  });

  describe('static methods', () => {
    it('should extract publicKey correctly', () => {
      const screenContext: ScreenContext = {
        name: 'mfa-webauthn-roaming-challenge',
        data: {
          passkey: { public_key: mockPublicKey },
        },
      };
      const result = ScreenOverride.getPublicKey(screenContext);
      expect(result).toEqual(mockPublicKey);
    });

    it('should return null for publicKey if public_key is missing', () => {
      const screenContext: ScreenContext = {
        name: 'mfa-webauthn-roaming-challenge',
        data: {
          passkey: undefined, // public_key is missing
        },
      };
      const result = ScreenOverride.getPublicKey(screenContext);
      expect(result).toBeNull();
    });

    it('should return null for publicKey if passkey is missing', () => {
      const screenContext: ScreenContext = {
        name: 'mfa-webauthn-roaming-challenge',
        data: {
          // passkey is missing
        },
      };
      const result = ScreenOverride.getPublicKey(screenContext);
      expect(result).toBeNull();
    });

    it('should extract screen data with webAuthnType and showRememberDevice correctly', () => {
      const screenContext: ScreenContext = {
        name: 'mfa-webauthn-roaming-challenge',
        data: {
          webauthnType: validWebauthnTypeRoaming,
          show_remember_device: true,
        },
      };
      const result = ScreenOverride.getScreenData(screenContext);
      expect(result?.webAuthnType).toBe(validWebauthnTypeRoaming);
      expect(result?.showRememberDevice).toBe(true);
    });

    it('should return null if webAuthnType is missing', () => {
      const screenContext: ScreenContext = {
        name: 'mfa-webauthn-roaming-challenge',
        data: {
          // webauthnType is missing
          show_remember_device: true,
        },
      };
      const result = ScreenOverride.getScreenData(screenContext);
      // Since webAuthnType is required (non-optional), return null when missing
      expect(result).toBeNull();
    });

    it('should return false for showRememberDevice when it is missing', () => {
      const screenContext: ScreenContext = {
        name: 'mfa-webauthn-roaming-challenge',
        data: {
          webauthnType: validWebauthnTypeRoaming,
          // show_remember_device is missing
        },
      };
      const result = ScreenOverride.getScreenData(screenContext);
      expect(result?.webAuthnType).toBe(validWebauthnTypeRoaming);
      // getShowRememberDevice returns false when missing
      expect(result?.showRememberDevice).toBe(false);
    });

    it('should return null for screen data if data is missing', () => {
      const screenContext: ScreenContext = {
        name: 'mfa-webauthn-roaming-challenge',
        data: undefined,
      };
      const result = ScreenOverride.getScreenData(screenContext);
      expect(result).toBeNull();
    });
  });
});