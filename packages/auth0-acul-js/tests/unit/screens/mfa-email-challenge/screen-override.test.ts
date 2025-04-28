import { ScreenOverride } from '../../../../src/screens/mfa-email-challenge/screen-override';
import { Screen } from '../../../../src/models/screen';
import type { ScreenContext } from '../../../../interfaces/models/screen';

describe('ScreenOverride', () => {
  it('should initialize data correctly', () => {
    const screenContext: ScreenContext = {
      name: 'mfa-email-challenge',
      data: {
        email: 'test@example.com',
        show_remember_device: true,
      },
    } as ScreenContext;
    const screenOverride = new ScreenOverride(screenContext);
    expect(screenOverride.data).toEqual({
      email: 'test@example.com',
      showRememberDevice: true,
    });
  });

  it('should handle missing data gracefully', () => {
    const screenContext: ScreenContext = {
      name: 'mfa-email-challenge',
    } as ScreenContext;
    const screenOverride = new ScreenOverride(screenContext);
    expect(screenOverride.data).toBeNull();
  });

  it('should handle show_remember_device as undefined', () => {
    const screenContext: ScreenContext = {
      name: 'mfa-email-challenge',
      data: {
        email: 'test@example.com',
        show_remember_device: undefined,
      },
    } as ScreenContext;
    const screenOverride = new ScreenOverride(screenContext);
    expect(screenOverride.data).toEqual({
      email: 'test@example.com',
      showRememberDevice: undefined,
    });
  });

  it('should handle show_remember_device as false', () => {
    const screenContext: ScreenContext = {
      name: 'mfa-email-challenge',
      data: {
        email: 'test@example.com',
        show_remember_device: false,
      },
    } as ScreenContext;
    const screenOverride = new ScreenOverride(screenContext);
    expect(screenOverride.data).toEqual({
      email: 'test@example.com',
      showRememberDevice: false,
    });
  });

  it('should extend Screen class', () => {
    const screenContext: ScreenContext = {
      name: 'mfa-email-challenge',
      data: {
        email: 'test@example.com',
        show_remember_device: true,
      },
    } as ScreenContext;
    const screenOverride = new ScreenOverride(screenContext);
    expect(screenOverride).toBeInstanceOf(Screen);
  });
});