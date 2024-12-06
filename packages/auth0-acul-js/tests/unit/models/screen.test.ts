import { Screen } from '../../../src/models/screen'; 
import type { ScreenContext } from '../../../interfaces/models/screen';

describe(':: models/screen | when all fields are available', () => {
  let screenContext: ScreenContext;
  let screen: Screen;

  beforeEach(() => {
    screenContext = {
      name: 'Login Screen',
      links: { home: 'https://example.com', support: 'https://support.example.com' },
      captcha: {
        provider: 'reCAPTCHA',
        image: 'https://example.com/captcha.png',
        siteKey: 'abcdef123456',
      },
      data: { challenge: 'some-challenge' },
      texts: { heading: 'Login to your account', description: 'Enter your credentials' },
    };

    screen = new Screen(screenContext);
  });

  it('should return the correct screen name', () => {
    expect(screen.name).toBe(screenContext.name);
  });

  it('should return the correct captcha image', () => {
    expect(screen.captchaImage).toBe(screenContext.captcha?.image);
  });

  it('should return the correct captcha site key', () => {
    expect(screen.captchaSiteKey).toBe(screenContext.captcha?.siteKey);
  });

  it('should return the correct captcha provider', () => {
    expect(screen.captchaProvider).toBe(screenContext.captcha?.provider);
  });

  it('should return true for isCaptchaAvailable if captcha is available', () => {
    expect(screen.isCaptchaAvailable).toBe(true);
  });

  it('should return false for isCaptchaAvailable if captcha is not available', () => {
    screenContext.captcha = undefined;
    screen = new Screen(screenContext);
    expect(screen.isCaptchaAvailable).toBe(false);
  });

  it('should return the correct screen data', () => {
    expect(screen.getScreenData()).toEqual(screenContext.data);
  });

  it('should return the correct screen links', () => {
    expect(screen.getScreenLinks()).toEqual(screenContext.links);
  });

  it('should return the correct screen texts', () => {
    expect(screen.getScreenTexts()).toEqual(screenContext.texts);
  });

  it('should return the correct captcha configuration', () => {
    expect(screen.getCaptchaConfig()).toEqual(screenContext.captcha);
  });
});

describe(':: models/screen | when optional fields are not available', () => {
  let screenContext: ScreenContext;
  let screen: Screen;

  beforeEach(() => {
    screenContext = {
      name: 'Login Screen',
    };
    screen = new Screen(screenContext);
  });

  it('should return null for captchaImage if not available', () => {
    expect(screen.captchaImage).toBeNull();
  });

  it('should return null for captchaSiteKey if not available', () => {
    expect(screen.captchaSiteKey).toBeNull();
  });

  it('should return null for captchaProvider if not available', () => {
    expect(screen.captchaProvider).toBeNull();
  });

  it('should return false for isCaptchaAvailable if not available', () => {
    expect(screen.isCaptchaAvailable).toBe(false);
  });

  it('should return null for screenData if not available', () => {
    expect(screen.getScreenData()).toBeNull();
  });

  it('should return null for screenLinks if not available', () => {
    expect(screen.getScreenLinks()).toBeNull();
  });

  it('should return null for screenTexts if not available', () => {
    expect(screen.getScreenTexts()).toBeNull();
  });

  it('should return null for captchaConfig if not available', () => {
    expect(screen.getCaptchaConfig()).toBeNull();
  });
});
