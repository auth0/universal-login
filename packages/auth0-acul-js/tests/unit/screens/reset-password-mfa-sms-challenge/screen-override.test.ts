import { Screen } from '../../../../src/models/screen';
import { ScreenOverride } from '../../../../src/screens/reset-password-mfa-sms-challenge/screen-override';

import type { ScreenContext } from '../../../../interfaces/models/screen';

describe('ScreenOverride', () => {
  it('should initialize data correctly', () => {
    const screenContext: ScreenContext = {
      name: 'reset-password-mfa-sms-challenge',
      data: {
        phone_number: '+15551234567'
      },
    } as ScreenContext;

    const screenOverride = new ScreenOverride(screenContext);

    expect(screenOverride.data).toEqual({
      phoneNumber: '+15551234567'
    });
  });

  it('should handle missing data gracefully', () => {
    const screenContext: ScreenContext = {
      name: 'reset-password-mfa-sms-challenge',
    } as ScreenContext;

    const screenOverride = new ScreenOverride(screenContext);

    expect(screenOverride.data).toBeNull();
  });

  it('should handle null data in getScreenData', () => {
    const screenContext: ScreenContext = {
      name: 'reset-password-mfa-sms-challenge',
      data: null
    } as unknown as ScreenContext;

    const result = ScreenOverride.getScreenData(screenContext);

    expect(result).toBeNull();
  });

  it('should handle undefined data in getScreenData', () => {
    const screenContext: ScreenContext = {
      name: 'reset-password-mfa-sms-challenge',
      data: undefined
    } as ScreenContext;

    const result = ScreenOverride.getScreenData(screenContext);

    expect(result).toBeNull();
  });

  it('should extend Screen class', () => {
    const screenContext: ScreenContext = {
      name: 'reset-password-mfa-sms-challenge',
      data: {
        phone_number: '+15551234567'
      },
    } as ScreenContext;

    const screenOverride = new ScreenOverride(screenContext);
    expect(screenOverride).toBeInstanceOf(Screen);
  });

  it('should initialize data correctly with show_link_voice true', () => {
    const screenContext: ScreenContext = {
      name: 'reset-password-mfa-sms-challenge',
      data: {
        phone_number: '+15551234567',
        show_link_voice: true
      },
    } as ScreenContext;

    const screenOverride = new ScreenOverride(screenContext);

    expect(screenOverride.data).toEqual({
      phoneNumber: '+15551234567',
      showLinkVoice: true
    });
  });

  it('should initialize data correctly with show_link_voice false', () => {
    const screenContext: ScreenContext = {
      name: 'reset-password-mfa-sms-challenge',
      data: {
        phone_number: '+15551234567',
        show_link_voice: false
      },
    } as ScreenContext;

    const screenOverride = new ScreenOverride(screenContext);

    expect(screenOverride.data).toEqual({
      phoneNumber: '+15551234567',
      showLinkVoice: false
    });
  });

  it('should handle missing show_link_voice correctly', () => {
    const screenContext: ScreenContext = {
      name: 'reset-password-mfa-sms-challenge',
      data: {
        phone_number: '+15551234567'
      },
    } as ScreenContext;

    const screenOverride = new ScreenOverride(screenContext);

    expect(screenOverride.data).toEqual({
      phoneNumber: '+15551234567',
      showLinkVoice: undefined
    });
  });
});