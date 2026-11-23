import { ScreenOverride } from '../../../../src/screens/mfa-voice-challenge/screen-override';
import { Screen } from '../../../../src/models/screen';
import { getEditIdentifierLink } from '../../../../src/shared/screen';
import type { ScreenContext } from '../../../../interfaces/models/screen';

jest.mock('../../../../src/shared/screen');
jest.mock('../../../../src/models/screen');

describe('ScreenOverride', () => {
  let screenContext: ScreenContext;
  let screenOverride: ScreenOverride;

  beforeEach(() => {
    screenContext = {
      name: 'mfa-voice-challenge',
      data: { 
        phone_number: '+15555555555', 
        show_remember_device: false,
        show_link_sms: true
      },
    } as ScreenContext;
    
    screenOverride = new ScreenOverride(screenContext);
  });

  it('should initialize data correctly', () => {
    expect(screenOverride.data).toEqual({
      phoneNumber: '+15555555555',
      showRememberDevice: false,
      showLinkSms: true
    });
  });

  it('should return null for data when screenContext.data is undefined', () => {
    const emptyContext = { name: 'mfa-voice-challenge' } as ScreenContext;
    const result = ScreenOverride.getScreenData(emptyContext);
    expect(result).toBeNull();
  });

  it('should map phone_number to phoneNumber and show_remember_device', () => {
    const result = ScreenOverride.getScreenData(screenContext);
    expect(result).toEqual({
      phoneNumber: '+15555555555',
      showRememberDevice: false,
      showLinkSms: true
    });
  });

  it('should handle show_link_sms field correctly', () => {
    // Test with explicit true value
    const contextWithShowLinkSmsTrue = {
      name: 'mfa-voice-challenge',
      data: { 
        phone_number: '+15555555555',
        show_link_sms: true
      },
    } as ScreenContext;
    let result = ScreenOverride.getScreenData(contextWithShowLinkSmsTrue);
    expect(result?.showLinkSms).toBe(true);
    
    // Test with explicit false value
    const contextWithShowLinkSmsFalse = {
      name: 'mfa-voice-challenge',
      data: { 
        phone_number: '+15555555555',
        show_link_sms: false
      },
    } as ScreenContext;
    result = ScreenOverride.getScreenData(contextWithShowLinkSmsFalse);
    expect(result?.showLinkSms).toBe(false);
    
    // Test with missing show_link_sms (should be falsy)
    const contextWithoutShowLinkSms = {
      name: 'mfa-voice-challenge',
      data: { 
        phone_number: '+15555555555' 
      },
    } as ScreenContext;
    result = ScreenOverride.getScreenData(contextWithoutShowLinkSms);
    expect(result?.showLinkSms).toBe(false);
  });

  it('should handle missing fields gracefully', () => {
    const partialContext = {
      name: 'mfa-voice-challenge',
      data: { phone_number: '+15555555555' },
    } as ScreenContext;
    
    const result = ScreenOverride.getScreenData(partialContext);
    expect(result).toEqual({
      phoneNumber: '+15555555555',
      showLinkSms: false,
      showRememberDevice: undefined,
    });
  });

  it('should extend Screen class', () => {
    expect(screenOverride).toBeInstanceOf(Screen);
  });

  describe('editIdentifierLink', () => {
    beforeEach(() => {
      // src/shared/screen is automocked above. Route the mock through the real helper so the
      // links.edit_identifier mapping is exercised.
      const actual = jest.requireActual('../../../../src/shared/screen') as {
        getEditIdentifierLink: (screen: ScreenContext) => string | null;
      };
      (getEditIdentifierLink as jest.Mock).mockImplementation(actual.getEditIdentifierLink);
    });

    afterEach(() => {
      (getEditIdentifierLink as jest.Mock).mockReset();
    });

    it('should expose the edit link provided while verifying a phone number during enrollment', () => {
      const context = {
        name: 'mfa-voice-challenge',
        data: { phone_number: '+15555555555' },
        links: { edit_identifier: '/u/mfa-voice-enrollment?state=abc' },
      } as ScreenContext;

      const result = new ScreenOverride(context);

      expect(getEditIdentifierLink).toHaveBeenCalledWith(context);
      expect(result.editIdentifierLink).toBe('/u/mfa-voice-enrollment?state=abc');
    });

    it('should be null when the screen context has no links', () => {
      const context = {
        name: 'mfa-voice-challenge',
        data: { phone_number: '+15555555555' },
      } as ScreenContext;

      expect(new ScreenOverride(context).editIdentifierLink).toBeNull();
    });

    it('should be null when the links do not include an edit link', () => {
      const context = {
        name: 'mfa-voice-challenge',
        data: { phone_number: '+15555555555' },
        links: {},
      } as ScreenContext;

      expect(new ScreenOverride(context).editIdentifierLink).toBeNull();
    });
  });
});