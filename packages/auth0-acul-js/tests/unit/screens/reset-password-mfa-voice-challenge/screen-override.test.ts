import { ScreenOverride } from '../../../../src/screens/reset-password-mfa-voice-challenge/screen-override';
import type { ScreenContext } from '../../../../interfaces/models/screen';

describe('ScreenOverride', () => {
  let screenContext: ScreenContext;
  let screenOverride: ScreenOverride;

  beforeEach(() => {
    screenContext = {
      name: 'reset-password',
      data: {
        phone_number: '9999999999',
      },
    } as ScreenContext;

    screenOverride = new ScreenOverride(screenContext);
  });

  it('should initialize data correctly', () => {
    expect(screenOverride.data).toEqual({
      phoneNumber: '9999999999',
    });
  });

  it('should return null for data if screenContext.data is missing', () => {
    screenContext.data = undefined;
    const override = new ScreenOverride(screenContext);
    expect(override.data).toBeNull();
  });
});
