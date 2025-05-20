import { Screen } from '../../../../src/models/screen';
import { ScreenOverride } from '../../../../src/screens/mfa-webauthn-change-key-nickname/screen-override';

import type { ScreenContext } from '../../../../interfaces/models/screen';

describe('MfaWebAuthnChangeKeyNickname ScreenOverride', () => {
  const currentNickname = "My Old YubiKey";

  it('should correctly initialize with valid screen context data containing nickname', () => {
    const screenContext: ScreenContext = {
      name: 'mfa-webauthn-change-key-nickname',
      data: {
        nickname: currentNickname,
        other_data: 'irrelevant', // Extra data should be ignored
      },
    } as ScreenContext; // Cast for test purposes, assuming ScreenContext might have more fields

    const screenOverride = new ScreenOverride(screenContext);

    expect(screenOverride).toBeInstanceOf(Screen); // Check inheritance
    expect(screenOverride.data).toBeDefined();
    expect(screenOverride.data).toEqual({
      nickname: currentNickname, // Ensure correct mapping and value
    });
  });

  it('should return null for data if screenContext.data is undefined', () => {
    const screenContext: ScreenContext = {
      name: 'mfa-webauthn-change-key-nickname',
      data: undefined, // Data object is missing
    } as ScreenContext;
    const screenOverride = new ScreenOverride(screenContext);
    expect(screenOverride.data).toBeNull();
  });

  it('should return null for data if screenContext.data is null', () => {
    const screenContext: ScreenContext = {
      name: 'mfa-webauthn-change-key-nickname',
      data: null as any, // Explicitly null, cast to any to satisfy ScreenData if it's not | null
    } as ScreenContext;
    const screenOverride = new ScreenOverride(screenContext);
    expect(screenOverride.data).toBeNull();
  });

  it('should return null if nickname property is missing in data', () => {
    const screenContext: ScreenContext = {
      name: 'mfa-webauthn-change-key-nickname',
      data: {
        some_other_key: 'some value', // nickname is missing
      },
    } as ScreenContext;
    const screenOverride = new ScreenOverride(screenContext);
    expect(screenOverride.data).toBeNull();
  });

  it('should return null if nickname is not a string', () => {
    const screenContext: ScreenContext = {
      name: 'mfa-webauthn-change-key-nickname',
      data: {
        nickname: 12345 as any, // Cast to any to bypass TS check for this specific test case
      },
    } as ScreenContext;
    const screenOverride = new ScreenOverride(screenContext);
    // The getScreenData logic specifically checks `typeof rawData.nickname === 'string'`
    expect(screenOverride.data).toBeNull();
  });

  // Static method test
  describe('getScreenData static method', () => {
    it('should extract nickname correctly when present and valid', () => {
      const staticTestNickname = 'Static Test Key Name';
      const screenContext: ScreenContext = {
        name: 'mfa-webauthn-change-key-nickname',
        data: { nickname: staticTestNickname },
      } as ScreenContext;
      const data = ScreenOverride.getScreenData(screenContext);
      expect(data).toEqual({ nickname: staticTestNickname });
    });

    it('should return null if data object is missing from screenContext', () => {
      const screenContext: ScreenContext = { name: 'mfa-webauthn-change-key-nickname' } as ScreenContext; // No data property
      const data = ScreenOverride.getScreenData(screenContext);
      expect(data).toBeNull();
    });

    it('should return null if nickname property is missing in data', () => {
      const screenContext: ScreenContext = {
        name: 'mfa-webauthn-change-key-nickname',
        data: { another_prop: 'value' }, // nickname missing
      } as ScreenContext;
      const data = ScreenOverride.getScreenData(screenContext);
      expect(data).toBeNull();
    });

    it('should return null if nickname is not a string type', () => {
      const screenContext: ScreenContext = {
        name: 'mfa-webauthn-change-key-nickname',
        data: { nickname: true as any }, // Not a string, cast to any for test
      } as ScreenContext;
      const data = ScreenOverride.getScreenData(screenContext);
      expect(data).toBeNull();
    });
  });
});