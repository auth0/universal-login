import { Screen } from '../../../../src/models/screen';
import { ScreenOverride } from '../../../../src/screens/mfa-otp-enrollment-code/screen-override';

import type { ScreenContext } from '../../../../interfaces/models/screen';

describe('ScreenOverride', () => {
  it('should initialize data correctly', () => {
    const screenContext: ScreenContext = {
      name: 'mfa-otp-enrollment-code',
      data: {
        text_code: '12345',
      },
    } as ScreenContext;

    const screenOverride = new ScreenOverride(screenContext);
    expect(screenOverride.data).toEqual({
      textCode: '12345',
    });
  });

  it('should return null for data when screenContext.data is undefined', () => {
    const emptyContext = {} as ScreenContext;
    const result = ScreenOverride.getScreenData(emptyContext);
    expect(result).toBeNull();
  });

  it('should return a copy of screenContext.data when available', () => {
    const screenContext: ScreenContext = {
      name: 'mfa-otp-enrollment-code',
      data: {
        text_code: '12345',
      },
    } as ScreenContext;

    const result = ScreenOverride.getScreenData(screenContext);
    expect(result).toEqual({
      textCode: '12345',
    });
  });

  it('should create an instance of Screen', () => {
    const screenContext: ScreenContext = {
      name: 'mfa-otp-enrollment-code',
      data: {
        text_code: '12345',
      },
    } as ScreenContext;

    const screenOverride = new ScreenOverride(screenContext);
    expect(screenOverride).toBeInstanceOf(Screen);
  });
});