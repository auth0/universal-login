import { ScreenOverride } from '../../../../src/screens/reset-password-mfa-sms-challenge/screen-override';
import { Screen } from '../../../../src/models/screen';
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