import { Screen } from '../../../../src/models/screen';
import { ScreenOverride } from '../../../../src/screens/mfa-webauthn-roaming-enrollment/screen-override';

import type { ScreenContext } from '../../../../interfaces/models/screen';
describe('ScreenOverride', () => {
  it('should initialize data correctly when all required fields are present', () => {
    const screenContext: ScreenContext = {
      name: 'mfa-webauthn-roaming-enrollment',
      data: {
        webauthnType: 'roaming',
        passkey: {
          public_key: {
            challenge: 'mockChallenge',
            user: { id: 'mockUserId', name: 'mockUser', displayName: 'Mock User' },
            rp: { id: 'mockRpId', name: 'Mock RP' },
            pubKeyCredParams: [{ type: 'public-key', alg: -7 }],
            authenticatorSelection: { residentKey: 'preferred', userVerification: 'preferred' },
          },
        },
      },
    } as ScreenContext;
    const screenOverride = new ScreenOverride(screenContext);
    expect(screenOverride.data).toEqual({
      webauthnType: 'roaming',
      passkey: {
        public_key: {
          challenge: 'mockChallenge',
          user: { id: 'mockUserId', name: 'mockUser', displayName: 'Mock User' },
          rp: { id: 'mockRpId', name: 'Mock RP' },
          pubKeyCredParams: [{ type: 'public-key', alg: -7 }],
          authenticatorSelection: { residentKey: 'preferred', userVerification: 'preferred' },
        },
      },
    });
  });
  it('should return null for data when screenContext.data is undefined', () => {
    const emptyContext = {} as ScreenContext;
    const result = ScreenOverride.getScreenData(emptyContext);
    expect(result).toBeNull();
  });
  it('should create an instance of Screen', () => {
    const screenContext: ScreenContext = {
      name: 'mfa-webauthn-roaming-enrollment',
      data: {
        webauthnType: 'roaming',
        passkey: { public_key: { challenge: 'mockChallenge' } },
      },
    } as ScreenContext;
    const screenOverride = new ScreenOverride(screenContext);
    expect(screenOverride).toBeInstanceOf(Screen);
  });
});
