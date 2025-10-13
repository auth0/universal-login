import { Screen } from '../../../../src/models/screen';
import { ScreenOverride } from '../../../../src/screens/reset-password-mfa-email-challenge/screen-override';

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

  it('should handle non-string email data gracefully', () => {
    const screenContext: ScreenContext = {
      name: 'reset-password-mfa-email-challenge',
      data: {
        email: 123, // non-string value
      },
    } as unknown as ScreenContext;

    const screenOverride = new ScreenOverride(screenContext);

    expect(screenOverride.data).toEqual({
      email: '',
    });
  });

  it('should handle undefined email gracefully', () => {
    const screenContext: ScreenContext = {
      name: 'reset-password-mfa-email-challenge',
      data: {
        email: undefined,
      },
    } as ScreenContext;

    const screenOverride = new ScreenOverride(screenContext);

    expect(screenOverride.data).toEqual({
      email: '',
    });
  });

  it('should handle null email gracefully', () => {
    const screenContext: ScreenContext = {
      name: 'reset-password-mfa-email-challenge',
      data: {
        email: null,
      },
    } as unknown as ScreenContext;

    const screenOverride = new ScreenOverride(screenContext);

    expect(screenOverride.data).toEqual({
      email: '',
    });
  });

  describe('getScreenData static method', () => {
    it('should return null when no data is provided', () => {
      const screenContext: ScreenContext = {
        name: 'reset-password-mfa-email-challenge',
      } as ScreenContext;

      const result = ScreenOverride.getScreenData(screenContext);

      expect(result).toBeNull();
    });

    it('should extract email when provided as string', () => {
      const screenContext: ScreenContext = {
        name: 'reset-password-mfa-email-challenge',
        data: {
          email: 'test@example.com',
        },
      } as ScreenContext;

      const result = ScreenOverride.getScreenData(screenContext);

      expect(result).toEqual({
        email: 'test@example.com',
      });
    });

    it('should return empty string when email is not a string', () => {
      const screenContext: ScreenContext = {
        name: 'reset-password-mfa-email-challenge',
        data: {
          email: 42,
        },
      } as unknown as ScreenContext;

      const result = ScreenOverride.getScreenData(screenContext);

      expect(result).toEqual({
        email: '',
      });
    });

    it('should return empty string when email is null', () => {
      const screenContext: ScreenContext = {
        name: 'reset-password-mfa-email-challenge',
        data: {
          email: null,
        },
      } as unknown as ScreenContext;

      const result = ScreenOverride.getScreenData(screenContext);

      expect(result).toEqual({
        email: '',
      });
    });

    it('should return empty string when email is undefined', () => {
      const screenContext: ScreenContext = {
        name: 'reset-password-mfa-email-challenge',
        data: {
          email: undefined,
        },
      } as ScreenContext;

      const result = ScreenOverride.getScreenData(screenContext);

      expect(result).toEqual({
        email: '',
      });
    });

    it('should handle empty data object', () => {
      const screenContext: ScreenContext = {
        name: 'reset-password-mfa-email-challenge',
        data: {},
      } as ScreenContext;

      const result = ScreenOverride.getScreenData(screenContext);

      expect(result).toEqual({
        email: '',
      });
    });
  });

  it('should have correct screen name', () => {
    const screenContext: ScreenContext = {
      name: 'reset-password-mfa-email-challenge',
      data: {
        email: 'test@example.com',
      },
    } as ScreenContext;

    const screenOverride = new ScreenOverride(screenContext);

    expect(screenOverride.name).toBe('reset-password-mfa-email-challenge');
  });

  it('should inherit Screen properties', () => {
    const screenContext: ScreenContext = {
      name: 'reset-password-mfa-email-challenge',
      data: {
        email: 'test@example.com',
      },
      captcha: {
        image: 'captcha-url',
        siteKey: 'site-key',
        provider: 'recaptcha',
      },
      texts: {
        title: 'Test Title',
      },
      links: {
        login: '/login',
      },
    } as ScreenContext;

    const screenOverride = new ScreenOverride(screenContext);

    // The Screen constructor sets these properties from the screenContext.captcha
    expect(screenOverride.captchaImage).toBe('captcha-url');
    expect(screenOverride.captchaSiteKey).toBe('site-key');
    expect(screenOverride.captchaProvider).toBe('recaptcha');
    expect(screenOverride.isCaptchaAvailable).toBe(true);
    expect(screenOverride.texts).toEqual({ title: 'Test Title' });
    expect(screenOverride.links).toEqual({ login: '/login' });
  });
});
