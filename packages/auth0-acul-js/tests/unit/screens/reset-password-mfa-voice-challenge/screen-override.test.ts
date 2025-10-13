import { ScreenOverride } from '../../../../src/screens/reset-password-mfa-voice-challenge/screen-override';

import type { ScreenContext } from '../../../../interfaces/models/screen';

describe('ScreenOverride', () => {
  let screenContext: ScreenContext;
  let screenOverride: ScreenOverride;

  beforeEach(() => {
    screenContext = {
      name: 'reset-password',
      data: {
        phone_number: '9999999999',
        show_link_sms: true
      },
    } as ScreenContext;

    screenOverride = new ScreenOverride(screenContext);
  });

  it('should initialize data correctly', () => {
    expect(screenOverride.data).toEqual({
      phoneNumber: '9999999999',
      showLinkSms: true
    });
  });

  it('should return null for data if screenContext.data is missing', () => {
    screenContext.data = undefined;
    const override = new ScreenOverride(screenContext);
    expect(override.data).toBeNull();
  });

  it('should return null for data if screenContext.data is null', () => {
    const nullDataContext = {
      name: 'reset-password-mfa-voice-challenge',
      data: null
    } as unknown as ScreenContext;
    const override = new ScreenOverride(nullDataContext);
    expect(override.data).toBeNull();
  });

  it('should handle null data in getScreenData', () => {
    const nullDataContext = {
      name: 'reset-password-mfa-voice-challenge',
      data: null
    } as unknown as ScreenContext;
    const result = ScreenOverride.getScreenData(nullDataContext);
    expect(result).toBeNull();
  });

  it('should handle undefined data in getScreenData', () => {
    const undefinedDataContext = {
      name: 'reset-password-mfa-voice-challenge',
      data: undefined
    } as ScreenContext;
    const result = ScreenOverride.getScreenData(undefinedDataContext);
    expect(result).toBeNull();
  });

  it('should handle show_link_sms field correctly', () => {
    // Test with explicit true value
    const contextWithShowLinkSmsTrue = {
      name: 'reset-password-mfa-voice-challenge',
      data: {
        phone_number: '9999999999',
        show_link_sms: true
      },
    } as ScreenContext;
    let result = ScreenOverride.getScreenData(contextWithShowLinkSmsTrue);
    expect(result?.showLinkSms).toBe(true);

    // Test with explicit false value
    const contextWithShowLinkSmsFalse = {
      name: 'reset-password-mfa-voice-challenge',
      data: {
        phone_number: '9999999999',
        show_link_sms: false
      },
    } as ScreenContext;
    result = ScreenOverride.getScreenData(contextWithShowLinkSmsFalse);
    expect(result?.showLinkSms).toBe(false);

    // Test with missing show_link_sms (should be falsy)
    const contextWithoutShowLinkSms = {
      name: 'reset-password-mfa-voice-challenge',
      data: {
        phone_number: '9999999999'
      },
    } as ScreenContext;
    result = ScreenOverride.getScreenData(contextWithoutShowLinkSms);
    expect(result?.showLinkSms).toBe(undefined);

    const contextWithTruthyValue = {
      name: 'reset-password-mfa-voice-challenge',
      data: {
        phone_number: '9999999999',
        show_link_sms: true
      },
    } as ScreenContext;
    result = ScreenOverride.getScreenData(contextWithTruthyValue);
    expect(result?.showLinkSms).toBe(true);
  });

  it('should handle phone_number field type checking', () => {
    // Test with string phone_number (should keep the value)
    const contextWithStringPhone = {
      name: 'reset-password-mfa-voice-challenge',
      data: {
        phone_number: '1234567890'
      },
    } as ScreenContext;
    let result = ScreenOverride.getScreenData(contextWithStringPhone);
    expect(result?.phoneNumber).toBe('1234567890');

    // Test with non-string phone_number (should default to empty string)
    const contextWithNonStringPhone = {
      name: 'reset-password-mfa-voice-challenge',
      data: {
        phone_number: 1234567890 // number instead of string
      },
    } as unknown as ScreenContext;
    result = ScreenOverride.getScreenData(contextWithNonStringPhone);
    expect(result?.phoneNumber).toBe('');

    // Test with null phone_number
    const contextWithNullPhone = {
      name: 'reset-password-mfa-voice-challenge',
      data: {
        phone_number: null
      },
    } as unknown as ScreenContext;
    result = ScreenOverride.getScreenData(contextWithNullPhone);
    expect(result?.phoneNumber).toBe('');

    // Test with undefined phone_number
    const contextWithUndefinedPhone = {
      name: 'reset-password-mfa-voice-challenge',
      data: {
      },
    } as ScreenContext;
    result = ScreenOverride.getScreenData(contextWithUndefinedPhone);
    expect(result?.phoneNumber).toBe('');
  });
});
