import { ScreenOverride } from '../../../../src/screens/mfa-otp-challenge/screen-override';
import { Screen } from '../../../../src/models/screen';
import type { ScreenContext } from '../../../../interfaces/models/screen';

describe('ScreenOverride', () => {
  let screenContext: ScreenContext;
  let screenOverride: ScreenOverride;

  beforeEach(() => {
    screenContext = {
      name: 'mfa-otp-challenge',
      data: {
        show_remember_device: true,
      },
    } as ScreenContext;

    screenOverride = new ScreenOverride(screenContext);
  });

  it('should initialize data correctly', () => {
    expect(screenOverride.data).toEqual({
      showRememberDevice: true,
    });
  });

  it('should handle missing data gracefully', () => {
    const screenContext: ScreenContext = {
      name: 'mfa-otp-challenge',
    } as ScreenContext;

    const screenOverride = new ScreenOverride(screenContext);
    expect(screenOverride.data).toEqual(null);
  });

  it('should create an instance of Screen', () => {
    expect(screenOverride).toBeInstanceOf(Screen);
  });
});