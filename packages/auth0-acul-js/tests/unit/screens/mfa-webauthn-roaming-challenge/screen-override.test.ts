import { Screen } from '../../../../src/models/screen';
import { ScreenOverride } from '../../../../src/screens/mfa-webauthn-roaming-challenge/screen-override';

import type { ScreenContext } from '../../../../interfaces/models/screen';

describe('MfaWebAuthnRoamingChallenge ScreenOverride', () => {
  const mockPublicKey = {
    challenge: 'mockChallengeStringBase64Url',
  };

  it('should correctly initialize with valid screen context data', () => {
    const screenContext: ScreenContext = {
      name: 'mfa-webauthn-roaming-challenge',
      data: {
        show_remember_device: true,
        webauthnType: 'roaming',
        passkey: { public_key: mockPublicKey },
      },
    };

    const screenOverride = new ScreenOverride(screenContext);

    expect(screenOverride).toBeInstanceOf(Screen);
    expect(screenOverride.showRememberDevice).toBe(true);
    expect(screenOverride.webauthnType).toBe('roaming');
    expect(screenOverride.publicKey).toEqual(mockPublicKey);
  });

  it('should handle show_remember_device being false', () => {
    const screenContext: ScreenContext = {
      name: 'mfa-webauthn-roaming-challenge',
      data: {
        show_remember_device: false,
        webauthnType: 'roaming',
        passkey: { public_key: mockPublicKey },
      },
    };
    const screenOverride = new ScreenOverride(screenContext);
    expect(screenOverride.showRememberDevice).toBe(false);
  });

  it('should handle show_remember_device being undefined', () => {
    const screenContext: ScreenContext = {
      name: 'mfa-webauthn-roaming-challenge',
      data: {
        // show_remember_device is omitted
        webauthnType: 'roaming',
        passkey: { public_key: mockPublicKey },
      },
    };
    const screenOverride = new ScreenOverride(screenContext);
    expect(screenOverride.showRememberDevice).toBeFalsy();
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

    it('should extract webauthnType correctly', () => {
      const screenContext: ScreenContext = {
        name: 'mfa-webauthn-roaming-challenge',
        data: {
          webauthnType: 'roaming',
        },
      };
      const result = ScreenOverride.getWebAuthnType(screenContext);
      expect(result).toBe('roaming');
    });

    it('should return null for webauthnType if it is missing', () => {
      const screenContext: ScreenContext = {
        name: 'mfa-webauthn-roaming-challenge',
        data: {
          // webauthnType is missing
        },
      };
      const result = ScreenOverride.getWebAuthnType(screenContext);
      expect(result).toBeNull();
    });

    it('should extract showRememberDevice correctly', () => {
      const screenContext: ScreenContext = {
        name: 'mfa-webauthn-roaming-challenge',
        data: {
          show_remember_device: true,
        },
      };
      const result = ScreenOverride.getShowRememberDevice(screenContext);
      expect(result).toBe(true);
    });

    it('should handle showRememberDevice when it is missing', () => {
      const screenContext: ScreenContext = {
        name: 'mfa-webauthn-roaming-challenge',
        data: {
          // show_remember_device is missing
        },
      };
      const result = ScreenOverride.getShowRememberDevice(screenContext);
      expect(result).toBe(false);
    });
  });
});