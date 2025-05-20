import { Screen } from '../../../../src/models/screen'; // Import Screen for instanceof check
import { ScreenOverride } from '../../../../src/screens/mfa-webauthn-platform-enrollment/screen-override';

import type { ScreenContext, PasskeyCreate } from '../../../../interfaces/models/screen';

describe('MfaWebAuthnPlatformEnrollment ScreenOverride', () => {
  const mockPublicKeyOptions: PasskeyCreate['public_key'] = {
    user: { id: 'user123', name: 'testuser', displayName: 'Test User' },
    rp: { id: 'localhost', name: 'Local Test RP' },
    challenge: 'mockChallengeString',
    pubKeyCredParams: [{ type: 'public-key', alg: -7 }],
    authenticatorSelection: { residentKey: 'preferred', userVerification: 'required' },
  };

  it('should correctly set publicKey property from screenContext.data.passkey.public_key', () => {
    const screenContext: ScreenContext = {
      name: 'mfa-webauthn-platform-enrollment',
      data: {
        passkey: { // Server provides data nested under 'passkey'
          public_key: mockPublicKeyOptions,
        },
      },
    } as ScreenContext; // Cast for test purposes

    const screenOverride = new ScreenOverride(screenContext);

    expect(screenOverride.publicKey).toEqual(mockPublicKeyOptions);
  });

  it('should set publicKey to null if screenContext.data is undefined', () => {
    const screenContext: ScreenContext = {
      name: 'mfa-webauthn-platform-enrollment',
      data: undefined,
    } as ScreenContext;

    const screenOverride = new ScreenOverride(screenContext);
    expect(screenOverride.publicKey).toBeNull();
  });

  it('should set publicKey to null if screenContext.data.passkey is undefined', () => {
    const screenContext: ScreenContext = {
      name: 'mfa-webauthn-platform-enrollment',
      data: {}, // passkey property is missing within data
    } as ScreenContext;

    const screenOverride = new ScreenOverride(screenContext);
    expect(screenOverride.publicKey).toBeNull();
  });

  it('should set publicKey to null if screenContext.data.passkey.public_key is undefined', () => {
    const screenContext: ScreenContext = {
      name: 'mfa-webauthn-platform-enrollment',
      data: {
        passkey: {} as PasskeyCreate, // public_key is missing within passkey
      },
    } as ScreenContext;
    const screenOverride = new ScreenOverride(screenContext);
    expect(screenOverride.publicKey).toBeNull();
  });

  it('should inherit from Screen model', () => {
    const screenContext: ScreenContext = {
      name: 'mfa-webauthn-platform-enrollment',
      data: { passkey: { public_key: mockPublicKeyOptions } },
    } as ScreenContext;
    const screenOverride = new ScreenOverride(screenContext);
    expect(screenOverride).toBeInstanceOf(Screen);
  });

  describe('static getPublicKey', () => {
    it('should extract public_key correctly from screenContext.data.passkey.public_key', () => {
      const screenContext: ScreenContext = {
        name: 'mfa-webauthn-platform-enrollment',
        data: { passkey: { public_key: mockPublicKeyOptions } },
      } as ScreenContext;
      const result = ScreenOverride.getPublicKey(screenContext);
      expect(result).toEqual(mockPublicKeyOptions);
    });

    it('should return null if data is missing', () => {
      const screenContext: ScreenContext = { name: 'mfa-webauthn-platform-enrollment' } as ScreenContext;
      expect(ScreenOverride.getPublicKey(screenContext)).toBeNull();
    });

    it('should return null if data.passkey is missing', () => {
      const screenContext: ScreenContext = {
        name: 'mfa-webauthn-platform-enrollment',
        data: { other_prop: 'value' },
      } as ScreenContext;
      expect(ScreenOverride.getPublicKey(screenContext)).toBeNull();
    });

    it('should return null if data.passkey.public_key is missing', () => {
      const screenContext: ScreenContext = {
        name: 'mfa-webauthn-platform-enrollment',
        data: { passkey: {} as PasskeyCreate }, // public_key is not present on the PasskeyCreate object
      } as ScreenContext;
      expect(ScreenOverride.getPublicKey(screenContext)).toBeNull();
    });
  });
});