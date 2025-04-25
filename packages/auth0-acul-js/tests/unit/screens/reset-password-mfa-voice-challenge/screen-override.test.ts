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
});
