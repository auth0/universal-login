import { ScreenOverride } from '../../../../src/screens/mfa-voice-challenge/screen-override';
import { getEditIdentifierLink } from '../../../../src/shared/screen';
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
      links: { edit_identifier: '/edit-identifier' },
      data: { 
        phone_number: '+15555555555', 
        remember_device: false 
      },
    } as ScreenContext;

    (getEditIdentifierLink as jest.Mock).mockReturnValue('/edit-identifier');
    
    screenOverride = new ScreenOverride(screenContext);
  });

  it('should initialize editIdentifierLink correctly', () => {
    expect(screenOverride.editIdentifierLink).toBe('/edit-identifier');
  });

  it('should initialize data correctly', () => {
    expect(screenOverride.data).toEqual({
      phoneNumber: '+15555555555',
      rememberDevice: false,
    });
  });

  it('should call getEditIdentifierLink with screenContext', () => {
    expect(getEditIdentifierLink).toHaveBeenCalledWith(screenContext);
  });

  it('should return null for data when screenContext.data is undefined', () => {
    const emptyContext = { name: 'mfa-voice-challenge' } as ScreenContext;
    const result = ScreenOverride.getScreenData(emptyContext);
    expect(result).toBeNull();
  });

  it('should map phone_number to phoneNumber and remember_device to rememberDevice', () => {
    const result = ScreenOverride.getScreenData(screenContext);
    expect(result).toEqual({
      phoneNumber: '+15555555555',
      rememberDevice: false,
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
      rememberDevice: undefined,
    });
  });

  it('should extend Screen class', () => {
    expect(screenOverride).toBeInstanceOf(Screen);
  });
});