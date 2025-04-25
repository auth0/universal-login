import { ScreenOverride } from '../../../../src/screens/mfa-voice-challenge/screen-override';
import { Screen } from '../../../../src/models/screen';
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
        show_remember_device: false 
      },
    } as ScreenContext;
    
    screenOverride = new ScreenOverride(screenContext);
  });

  it('should initialize data correctly', () => {
    expect(screenOverride.data).toEqual({
      phoneNumber: '+15555555555',
      showRememberDevice: false,
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
    });
  });

  it('should handle missing fields gracefully', () => {
    const partialContext = {
      name: 'mfa-voice-challenge',
      data: { phone_number: '+15555555555' },
    } as ScreenContext;
    
    const result = ScreenOverride.getScreenData(partialContext);
    expect(result).toEqual({
      phoneNumber: '+15555555555',
      showRememberDevice: undefined,
    });
  });

  it('should extend Screen class', () => {
    expect(screenOverride).toBeInstanceOf(Screen);
  });
});