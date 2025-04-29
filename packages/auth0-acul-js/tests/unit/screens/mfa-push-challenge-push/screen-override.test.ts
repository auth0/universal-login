import { ScreenOverride } from '../../../../src/screens/mfa-push-challenge-push/screen-override';
import { Screen } from '../../../../src/models/screen';
import type { ScreenContext } from '../../../../interfaces/models/screen';

describe('ScreenOverride', () => {
  let screenContext: ScreenContext;
  let screenOverride: ScreenOverride;

  beforeEach(() => {
    screenContext = {
      name: 'mfa-push-challenge-push',
      data: {
        device_name: 'Test Device',
        show_remember_device: true
      }
    } as ScreenContext;
    screenOverride = new ScreenOverride(screenContext);
  });

  it('should initialize data correctly', () => {
    expect(screenOverride.data).toEqual({
      deviceName: 'Test Device',
      showRememberDevice: true
    });
  });

  it('should return null for data when screenContext.data is undefined', () => {
    const emptyContext = {} as ScreenContext;
    const result = ScreenOverride.getScreenData(emptyContext);
    expect(result).toBeNull();
  });

  it('should transform screen data correctly', () => {
    const result = ScreenOverride.getScreenData(screenContext);
    expect(result).toEqual({
      deviceName: 'Test Device',
      showRememberDevice: true
    });
  });

  it('should create an instance of Screen', () => {
    expect(screenOverride).toBeInstanceOf(Screen);
  });
});
