import { Screen } from '../../../../src/models/screen';
import { ScreenOverride } from '../../../../src/screens/mfa-webauthn-enrollment-success/screen-override';

import type { ScreenContext } from '../../../../interfaces/models/screen';
import type { WebAuthnType } from '../../../../interfaces/screens/mfa-webauthn-error';

describe('MfaWebAuthnEnrollmentSuccess ScreenOverride', () => {
  const validNickname = "My Laptop's Fingerprint";
  const validWebauthnTypePlatform: WebAuthnType = 'webauthn-platform';
  const validWebauthnTypeRoaming: WebAuthnType = 'webauthn-roaming';

  it('should correctly initialize with valid screen context data (platform)', () => {
    const screenContext: ScreenContext = {
      name: 'mfa-webauthn-enrollment-success',
      data: {
        nickname: validNickname,
        webauthnType: validWebauthnTypePlatform,
      },
    } as ScreenContext;

    const screenOverride = new ScreenOverride(screenContext);

    expect(screenOverride).toBeInstanceOf(Screen); // Check inheritance
    expect(screenOverride.data).toEqual({
      nickname: validNickname,
      webauthnType: validWebauthnTypePlatform,
    });
  });

  it('should correctly initialize with valid screen context data (roaming)', () => {
    const screenContext: ScreenContext = {
      name: 'mfa-webauthn-enrollment-success',
      data: {
        nickname: "YubiKey",
        webauthnType: validWebauthnTypeRoaming,
      },
    } as ScreenContext;

    const screenOverride = new ScreenOverride(screenContext);

    expect(screenOverride.data).toEqual({
      nickname: "YubiKey",
      webauthnType: validWebauthnTypeRoaming,
    });
  });


  it('should return null for data if screenContext.data is undefined', () => {
    const screenContext: ScreenContext = {
      name: 'mfa-webauthn-enrollment-success',
      data: undefined,
    } as ScreenContext;
    const screenOverride = new ScreenOverride(screenContext);
    expect(screenOverride.data).toBeNull();
  });

  it('should return null for data if screenContext.data is null', () => {
    const screenContext: ScreenContext = {
      name: 'mfa-webauthn-enrollment-success',
      data: null as any, 
    } as ScreenContext;
    const screenOverride = new ScreenOverride(screenContext);
    expect(screenOverride.data).toBeNull();
  });

  it('should return null if nickname property is missing in data', () => {
    const screenContext: ScreenContext = {
      name: 'mfa-webauthn-enrollment-success',
      data: {
        webauthnType: validWebauthnTypePlatform,
      },
    } as ScreenContext;
    const screenOverride = new ScreenOverride(screenContext);
    expect(screenOverride.data).toBeNull();
  });

  it('should return null if webauthnType property is missing in data', () => {
    const screenContext: ScreenContext = {
      name: 'mfa-webauthn-enrollment-success',
      data: {
        nickname: validNickname,
      },
    } as ScreenContext;
    const screenOverride = new ScreenOverride(screenContext);
    expect(screenOverride.data).toBeNull();
  });

  it('should return null if nickname is not a string', () => {
    const screenContext: ScreenContext = {
      name: 'mfa-webauthn-enrollment-success',
      data: {
        nickname: 12345 as any, // Invalid type
        webauthnType: validWebauthnTypePlatform,
      },
    } as ScreenContext;
    const screenOverride = new ScreenOverride(screenContext);
    expect(screenOverride.data).toBeNull();
  });

  it('should return null if webauthnType is not a valid WebAuthnType', () => {
    const screenContext: ScreenContext = {
      name: 'mfa-webauthn-enrollment-success',
      data: {
        nickname: validNickname,
        webauthnType: 'invalid-type' as any, // Invalid value
      },
    } as ScreenContext;
    const screenOverride = new ScreenOverride(screenContext);
    expect(screenOverride.data).toBeNull();
  });

  describe('static getScreenData method', () => {
    it('should extract data correctly when all properties are present and valid', () => {
      const screenContext: ScreenContext = {
        name: 'mfa-webauthn-enrollment-success',
        data: { nickname: validNickname, webauthnType: validWebauthnTypeRoaming },
      } as ScreenContext;
      const data = ScreenOverride.getScreenData(screenContext);
      expect(data).toEqual({ nickname: validNickname, webauthnType: validWebauthnTypeRoaming });
    });

    it('should return null if rawData is missing', () => {
      const screenContext: ScreenContext = { name: 'mfa-webauthn-enrollment-success' } as ScreenContext;
      const data = ScreenOverride.getScreenData(screenContext);
      expect(data).toBeNull();
    });

    it('should return null if nickname is missing', () => {
      const screenContext: ScreenContext = {
        name: 'mfa-webauthn-enrollment-success',
        data: { webauthnType: validWebauthnTypePlatform },
      } as ScreenContext;
      const data = ScreenOverride.getScreenData(screenContext);
      expect(data).toBeNull();
    });
    
    it('should return null if webauthnType is missing', () => {
      const screenContext: ScreenContext = {
        name: 'mfa-webauthn-enrollment-success',
        data: { nickname: validNickname },
      } as ScreenContext;
      const data = ScreenOverride.getScreenData(screenContext);
      expect(data).toBeNull();
    });

    it('should return null if nickname is not a string', () => {
      const screenContext: ScreenContext = {
        name: 'mfa-webauthn-enrollment-success',
        data: { nickname: true, webauthnType: validWebauthnTypePlatform },
      } as ScreenContext;
      const data = ScreenOverride.getScreenData(screenContext);
      expect(data).toBeNull();
    });

    it('should return null if webauthnType is invalid', () => {
      const screenContext: ScreenContext = {
        name: 'mfa-webauthn-enrollment-success',
        data: { nickname: validNickname, webauthnType: 'webauthn-something-else' },
      } as ScreenContext;
      const data = ScreenOverride.getScreenData(screenContext);
      expect(data).toBeNull();
    });
  });
});