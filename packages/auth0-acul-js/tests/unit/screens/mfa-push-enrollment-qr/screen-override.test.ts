import { Screen } from '../../../../src/models/screen';
import { ScreenOverride } from '../../../../src/screens/mfa-push-enrollment-qr/screen-override';

import type { ScreenContext } from '../../../../interfaces/models/screen';

describe('ScreenOverride', () => {
  let screenContext: ScreenContext;
  let screenOverride: ScreenOverride;

  beforeEach(() => {
    screenContext = {
      name: 'mfa-push-enrollment-qr',
      data: {
        qr_code: 'base64-encoded-qr-code',
        qr_uri: 'qr-uri',
        show_code_copy: true
      },
    } as ScreenContext;

    screenOverride = new ScreenOverride(screenContext);
  });

  it('should initialize data correctly', () => {
    expect(screenOverride.data).toEqual({
      qrCode: 'base64-encoded-qr-code',
      qrUri: 'qr-uri',
      showCodeCopy: true
    });
  });

  it('should return null for data when screenContext.data is undefined', () => {
    const emptyContext = {} as ScreenContext;
    const result = ScreenOverride.getScreenData(emptyContext);
    expect(result).toBeNull();
  });

  it('should return a copy of screenContext.data when available', () => {
    const result = ScreenOverride.getScreenData(screenContext);
    expect(result).toEqual({
      qrCode: 'base64-encoded-qr-code',
      qrUri: 'qr-uri',
      showCodeCopy: true
    });
  });

  it('should create an instance of Screen', () => {
    expect(screenOverride).toBeInstanceOf(Screen);
  });
});
