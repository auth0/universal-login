import { ScreenOverride } from '../../../../src/screens/mfa-push-list/screen-override';
import { Screen } from '../../../../src/models/screen';
import type { ScreenContext } from '../../../../interfaces/models/screen';

describe('ScreenOverride', () => {
  it('should initialize data correctly', () => {
    const screenContext: ScreenContext = {
      name: 'mfa-push-list',
      data: {
        enrolled_devices: ['Device 1', 'Device 2'],
      },
    } as ScreenContext;

    const screenOverride = new ScreenOverride(screenContext);

    expect(screenOverride.data).toEqual({
      enrolled_devices: ['Device 1', 'Device 2'],
    });
  });

  it('should handle missing data gracefully', () => {
    const screenContext: ScreenContext = {
      name: 'mfa-push-list',
    } as ScreenContext;

    const screenOverride = new ScreenOverride(screenContext);

    expect(screenOverride.data).toBeNull();
  });

  it('should handle non-array enrolled_devices gracefully', () => {
    const screenContext: ScreenContext = {
      name: 'mfa-push-list',
      data: {
        enrolled_devices: 'not an array',
      },
    } as ScreenContext;

    const screenOverride = new ScreenOverride(screenContext);

    expect(screenOverride.data).toEqual({
      enrolled_devices: [],
    });
  });

  it('should create an instance of Screen', () => {
    const screenContext: ScreenContext = {
      name: 'mfa-push-list',
      data: {
        enrolled_devices: ['Device 1', 'Device 2'],
      },
    } as ScreenContext;
    const screenOverride = new ScreenOverride(screenContext);
    expect(screenOverride).toBeInstanceOf(Screen);
  });
});
