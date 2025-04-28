import { ScreenOverride } from '../../../../src/screens/mfa-sms-challenge/screen-override';
import { Screen } from '../../../../src/models/screen';
import type { ScreenContext } from '../../../../interfaces/models/screen';

describe('ScreenOverride', () => {
  it('should initialize data correctly', () => {
    const screenContext: ScreenContext = {
      name: 'mfa-sms-challenge',
      data: {
        phone_number: '+15551234567',
        show_remember_device: true,
      },
    } as ScreenContext;

    const screenOverride = new ScreenOverride(screenContext);

    expect(screenOverride.data).toEqual({
      phoneNumber: '+15551234567',
      showRememberDevice: true,
      showLinkVoice: undefined
    });
  });

  it('should handle missing data gracefully', () => {
    const screenContext: ScreenContext = {
      name: 'mfa-sms-challenge',
    } as ScreenContext;

    const screenOverride = new ScreenOverride(screenContext);

    expect(screenOverride.data).toBeNull();
  });

  it('should handle show_remember_device as undefined', () => {
    const screenContext: ScreenContext = {
      name: 'mfa-sms-challenge',
      data: {
        phone_number: '+15551234567',
        show_remember_device: undefined,
      },
    } as ScreenContext;

    const screenOverride = new ScreenOverride(screenContext);

    expect(screenOverride.data).toEqual({
      phoneNumber: '+15551234567',
      showRememberDevice: undefined,
      showLinkVoice: undefined
    });
  });

  it('should handle show_remember_device as false', () => {
    const screenContext: ScreenContext = {
      name: 'mfa-sms-challenge',
      data: {
        phone_number: '+15551234567',
        show_remember_device: false,
      },
    } as ScreenContext;

    const screenOverride = new ScreenOverride(screenContext);

    expect(screenOverride.data).toEqual({
      phoneNumber: '+15551234567',
      showRememberDevice: false,
      showLinkVoice: undefined
    });
  });

  it('should handle show_link_voice correctly when true', () => {
    const screenContext: ScreenContext = {
      name: 'mfa-sms-challenge',
      data: {
        phone_number: '+15551234567',
        show_link_voice: true
      },
    } as ScreenContext;

    const screenOverride = new ScreenOverride(screenContext);

    expect(screenOverride.data).toEqual({
      phoneNumber: '+15551234567',
      showLinkVoice: true,
      showRememberDevice: undefined
    });
  });

  it('should handle show_link_voice correctly when false', () => {
    const screenContext: ScreenContext = {
      name: 'mfa-sms-challenge',
      data: {
        phone_number: '+15551234567',
        show_link_voice: false
      },
    } as ScreenContext;

    const screenOverride = new ScreenOverride(screenContext);

    expect(screenOverride.data).toEqual({
      phoneNumber: '+15551234567',
      showLinkVoice: false,
      showRememberDevice: undefined
    });
  });

  it('should handle show_link_voice correctly when missing', () => {
    const screenContext: ScreenContext = {
      name: 'mfa-sms-challenge',
      data: {
        phone_number: '+15551234567'
      },
    } as ScreenContext;

    const screenOverride = new ScreenOverride(screenContext);

    expect(screenOverride.data).toEqual({
      phoneNumber: '+15551234567',
      showLinkVoice: undefined,
      showRememberDevice: undefined
    });
  });

  it('should extend Screen class', () => {
    const screenContext: ScreenContext = {
      name: 'mfa-sms-challenge',
      data: {
        phone_number: '+15551234567',
        show_remember_device: true,
      },
    } as ScreenContext;
    const screenOverride = new ScreenOverride(screenContext);
    expect(screenOverride).toBeInstanceOf(Screen);
  });
});
