import { Screen } from '../../../../src/models/screen';
import { ScreenOverride } from '../../../../src/screens/mfa-otp-enrollment-qr/screen-override';

import type { ScreenContext } from '../../../../interfaces/models/screen';

describe('ScreenOverride', () => {
  it('should initialize data correctly', () => {
    const screenContext: ScreenContext = {
      name: 'mfa-otp-enrollment-qr',
      data: {
        qr_code: 'base64-encoded-qr-code',
      },
    } as ScreenContext;

    const screenOverride = new ScreenOverride(screenContext);
    expect(screenOverride.data).toEqual({
      qrCode: 'base64-encoded-qr-code',
    });
  });

  it('should return null for data when screenContext.data is undefined', () => {
    const emptyContext = {} as ScreenContext;
    const result = ScreenOverride.getScreenData(emptyContext);
    expect(result).toBeNull();
  });

  it('should return a copy of screenContext.data when available', () => {
    const screenContext: ScreenContext = {
      name: 'mfa-otp-enrollment-qr',
      data: {
        qr_code: 'base64-encoded-qr-code',
      },
    } as ScreenContext;

    const result = ScreenOverride.getScreenData(screenContext);
    expect(result).toEqual({
      qrCode: 'base64-encoded-qr-code',
    });
  });

  it('should create an instance of Screen', () => {
    const screenContext: ScreenContext = {
      name: 'mfa-otp-enrollment-qr',
      data: {
        qr_code: 'base64-encoded-qr-code',
      },
    } as ScreenContext;

    const screenOverride = new ScreenOverride(screenContext);
    expect(screenOverride).toBeInstanceOf(Screen);
  });
});