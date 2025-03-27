import { ScreenOverride } from '../../../../src/screens/reset-password-mfa-email-challenge/screen-override';
import { Screen } from '../../../../src/models/screen';
import type { ScreenContext } from '../../../../interfaces/models/screen';

describe('ScreenOverride', () => {
  it('should initialize data correctly', () => {
    const screenContext: ScreenContext = {
      name: 'reset-password-mfa-email-challenge',
      data: {
        email: 'test@example.com',
      },
    } as ScreenContext;

    const screenOverride = new ScreenOverride(screenContext);

    expect(screenOverride.data).toEqual({
      email: 'test@example.com',
    });
  });

  it('should handle missing data gracefully', () => {
    const screenContext: ScreenContext = {
      name: 'reset-password-mfa-email-challenge'
    } as ScreenContext;

    const screenOverride = new ScreenOverride(screenContext);

    expect(screenOverride.data).toBeNull();
  });

  it('should create an instance of Screen', () => {
    const screenContext: ScreenContext = {
      name: 'reset-password-mfa-email-challenge',
      data: {
        email: 'test@example.com',
      },
    } as ScreenContext;

    const screenOverride = new ScreenOverride(screenContext);

    expect(screenOverride).toBeInstanceOf(Screen);
  });
});
