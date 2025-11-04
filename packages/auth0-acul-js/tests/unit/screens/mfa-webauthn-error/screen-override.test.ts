import { Screen } from '../../../../src/models/screen';
import { ScreenOverride } from '../../../../src/screens/mfa-webauthn-error/screen-override';

import type { ScreenContext } from '../../../../interfaces/models/screen';

describe('MfaWebAuthnError ScreenOverride', () => {
  it('should correctly parse valid screenContext data', () => {
    const screenContext: ScreenContext = {
      name: 'mfa-webauthn-error',
      data: {
        errorType: 'NotAllowedError',
        webauthnType: 'webauthn-platform',
      },
    } as ScreenContext; // Cast for test

    const screenOverride = new ScreenOverride(screenContext);

    expect(screenOverride.data).toBeDefined();
    expect(screenOverride.data?.errorType).toBe('NotAllowedError');
    expect(screenOverride.data?.webAuthnType).toBe('webauthn-platform');
  });

  it('should parse webauthn-roaming type correctly', () => {
    const screenContext: ScreenContext = {
      name: 'mfa-webauthn-error',
      data: {
        errorType: 'TimeoutError',
        webauthnType: 'webauthn-roaming',
      },
    } as ScreenContext;

    const screenOverride = new ScreenOverride(screenContext);
    expect(screenOverride.data?.webAuthnType).toBe('webauthn-roaming');
  });

  it('should return null for data if screenContext.data is undefined', () => {
    const screenContext: ScreenContext = {
      name: 'mfa-webauthn-error',
      data: undefined,
    } as ScreenContext;

    const screenOverride = new ScreenOverride(screenContext);
    expect(screenOverride.data).toBeNull();
  });

  it('should return null if errorType is missing', () => {
    const screenContext: ScreenContext = {
      name: 'mfa-webauthn-error',
      data: {
        webauthnType: 'webauthn-platform',
      },
    } as ScreenContext;
    const screenOverride = new ScreenOverride(screenContext);
    expect(screenOverride.data).toBeNull();
  });

  it('should return null if webAuthnType is missing', () => {
    const screenContext: ScreenContext = {
      name: 'mfa-webauthn-error',
      data: {
        errorType: 'SomeError',
      },
    } as ScreenContext;
    const screenOverride = new ScreenOverride(screenContext);
    expect(screenOverride.data).toBeNull();
  });

  it('should return null if webAuthnType is invalid', () => {
    const screenContext: ScreenContext = {
      name: 'mfa-webauthn-error',
      data: {
        errorType: 'SomeError',
        webauthnType: 'invalid-type', // Not 'webauthn-roaming' or 'webauthn-platform'
      },
    } as ScreenContext;
    const screenOverride = new ScreenOverride(screenContext);
    expect(screenOverride.data).toBeNull();
  });

  it('should inherit from Screen model', () => {
    const screenContext: ScreenContext = {
      name: 'mfa-webauthn-error',
      data: { errorType: 'Error', webauthnType: 'webauthn-platform' },
    } as ScreenContext;
    const screenOverride = new ScreenOverride(screenContext);
    expect(screenOverride).toBeInstanceOf(Screen);
  });

  describe('static getScreenData', () => {
    it('should extract data correctly', () => {
      const screenContext: ScreenContext = {
        name: 'mfa-webauthn-error',
        data: { errorType: 'Error', webauthnType: 'webauthn-roaming' },
      } as ScreenContext;
      const result = ScreenOverride.getScreenData(screenContext);
      expect(result).toEqual({ errorType: 'Error', webAuthnType: 'webauthn-roaming' });
    });

    it('should return null if data is missing', () => {
      const screenContext: ScreenContext = { name: 'mfa-webauthn-error' } as ScreenContext;
      const result = ScreenOverride.getScreenData(screenContext);
      expect(result).toBeNull();
    });
  });
});