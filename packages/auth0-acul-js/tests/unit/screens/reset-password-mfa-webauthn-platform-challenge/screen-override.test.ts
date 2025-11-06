import { Screen } from '../../../../src/models/screen';
import { ScreenOverride } from '../../../../src/screens/reset-password-mfa-webauthn-platform-challenge/screen-override';

import type { ScreenContext, PasskeyRead } from '../../../../interfaces/models/screen';

/**
 * @group unit
 * @group screens
 */
describe('ResetPasswordMfaWebAuthnPlatformChallenge ScreenOverride', () => {
  const mockPublicKeyChallenge: PasskeyRead['public_key'] = {
    challenge: 'mockChallengeBase64UrlEncodedString',
    // Other potential properties like rpId, allowCredentials etc. would be here if defined by PasskeyRead
  };

  it('should correctly initialize with valid screen context data', () => {
    const screenContext: ScreenContext = {
      name: 'reset-password-mfa-webauthn-platform-challenge',
      data: {
        show_remember_device: true,
        passkey: { public_key: mockPublicKeyChallenge },
      },
      links: {},
      texts: {},
      captcha: undefined,
    };
    const screenOverride = new ScreenOverride(screenContext);

    expect(screenOverride).toBeInstanceOf(Screen);
    expect(screenOverride.publicKey).toEqual(mockPublicKeyChallenge);
    expect(screenOverride.data?.showRememberDevice).toBe(true);
  });

  it('should set showRememberDevice to false if show_remember_device is missing in data', () => {
    const screenContext: ScreenContext = {
      name: 'reset-password-mfa-webauthn-platform-challenge',
      data: {
        passkey: { public_key: mockPublicKeyChallenge },
        // show_remember_device is omitted
      },
    } as ScreenContext;
    const screenOverride = new ScreenOverride(screenContext);
    expect(screenOverride.data?.showRememberDevice).toBe(false);
  });

  it('should set showRememberDevice to false if show_remember_device is undefined in data', () => {
    const screenContext: ScreenContext = {
      name: 'reset-password-mfa-webauthn-platform-challenge',
      data: {
        passkey: { public_key: mockPublicKeyChallenge },
        show_remember_device: undefined,
      },
    } as ScreenContext;
    const screenOverride = new ScreenOverride(screenContext);
    expect(screenOverride.data?.showRememberDevice).toBe(false);
  });

  it('should set publicKey to null if passkey data is missing', () => {
    const screenContext: ScreenContext = {
      name: 'reset-password-mfa-webauthn-platform-challenge',
      data: {
        show_remember_device: true,
        // passkey property is missing
      },
    } as ScreenContext;
    const screenOverride = new ScreenOverride(screenContext);
    expect(screenOverride.publicKey).toBeNull();
  });

  it('should set publicKey to null if passkey.public_key is missing', () => {
    const screenContext: ScreenContext = {
      name: 'reset-password-mfa-webauthn-platform-challenge',
      data: {
        show_remember_device: true,
        passkey: {} as PasskeyRead, // public_key is missing inside passkey
      },
    } as ScreenContext;
    const screenOverride = new ScreenOverride(screenContext);
    expect(screenOverride.publicKey).toBeNull();
  });

  it('should set publicKey to null if screenContext.data is undefined', () => {
    const screenContext: ScreenContext = {
      name: 'reset-password-mfa-webauthn-platform-challenge',
      data: undefined,
    } as ScreenContext;
    const screenOverride = new ScreenOverride(screenContext);
    expect(screenOverride.publicKey).toBeNull();
    expect(screenOverride.data).toBeNull();
  });

  describe('static getPublicKeyChallenge method', () => {
    it('should extract publicKey correctly when present', () => {
      const screenContext: ScreenContext = {
        name: 'test-screen',
        data: { passkey: { public_key: mockPublicKeyChallenge } },
      } as ScreenContext;
      expect(ScreenOverride.getPublicKeyChallenge(screenContext)).toEqual(mockPublicKeyChallenge);
    });

    it('should return null if data.passkey is missing', () => {
      const screenContext: ScreenContext = { name: 'test-screen', data: {} } as ScreenContext;
      expect(ScreenOverride.getPublicKeyChallenge(screenContext)).toBeNull();
    });

    it('should return null if data.passkey.public_key is missing', () => {
      const screenContext: ScreenContext = { name: 'test-screen', data: { passkey: {} } } as unknown as ScreenContext;
      expect(ScreenOverride.getPublicKeyChallenge(screenContext)).toBeNull();
    });

    it('should return null if data itself is missing', () => {
      const screenContext: ScreenContext = { name: 'test-screen' } as ScreenContext;
      expect(ScreenOverride.getPublicKeyChallenge(screenContext)).toBeNull();
    });
  });

  describe('static getScreenData method', () => {
    it('should extract showRememberDevice correctly when true', () => {
      const screenContext: ScreenContext = { name: 'test-screen', data: { show_remember_device: true } } as ScreenContext;
      expect(ScreenOverride.getScreenData(screenContext)?.showRememberDevice).toBe(true);
    });

    it('should extract showRememberDevice correctly when false', () => {
      const screenContext: ScreenContext = { name: 'test-screen', data: { show_remember_device: false } } as ScreenContext;
      expect(ScreenOverride.getScreenData(screenContext)?.showRememberDevice).toBe(false);
    });

    it('should return data with showRememberDevice as false if show_remember_device is missing', () => {
      const screenContext: ScreenContext = { name: 'test-screen', data: {} } as ScreenContext;
      expect(ScreenOverride.getScreenData(screenContext)?.showRememberDevice).toBe(false);
    });

    it('should return null if data is missing', () => {
      const screenContext: ScreenContext = { name: 'test-screen' } as ScreenContext;
      expect(ScreenOverride.getScreenData(screenContext)).toBeNull();
    });
  });
});