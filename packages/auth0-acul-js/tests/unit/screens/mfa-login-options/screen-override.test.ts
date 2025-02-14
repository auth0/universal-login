import { ScreenOverride } from '../../../../src/screens/mfa-login-options/screen-override';
import { Screen } from '../../../../src/models/screen';
import type { ScreenContext } from '../../../../interfaces/models/screen';

describe('ScreenOverride', () => {
  let screenContext: ScreenContext;
  let screenOverride: ScreenOverride;

  beforeEach(() => {
    screenContext = {
      name: 'mfa-login-options',
      data: {
        enrolled_factors: ['sms', 'push-notification', 'otp'],
      },
    } as ScreenContext;
    screenOverride = new ScreenOverride(screenContext);
  });

  it('should initialize data correctly', () => {
    expect(screenOverride.data).toEqual({
      enrolled_factors: ['sms', 'push-notification', 'otp'],
    });
  });

  it('should return null for data when screenContext.data is undefined', () => {
    const emptyContext = {} as ScreenContext;
    const result = ScreenOverride.getScreenData(emptyContext);
    expect(result).toBeNull();
  });

  it('should return empty array for enrolled_factors when data.enrolled_factors is not an array', () => {
    const invalidContext = {
      name: 'mfa-login-options',
      data: {
        enrolled_factors: 'not an array',
      },
    } as ScreenContext;
    const result = ScreenOverride.getScreenData(invalidContext);
    expect(result).toEqual({
      enrolled_factors: [],
    });
  });

  it('should create an instance of Screen', () => {
    expect(screenOverride).toBeInstanceOf(Screen);
  });
});