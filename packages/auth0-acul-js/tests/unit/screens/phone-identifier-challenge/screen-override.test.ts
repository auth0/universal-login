import { ScreenOverride } from '../../../../src/screens/phone-identifier-challenge/screen-override';
import { Screen } from '../../../../src/models/screen';
import type { ScreenContext } from '../../../../interfaces/models/screen';

jest.mock('../../../../src/models/screen');

describe('ScreenOverride', () => {
  let screenContext: ScreenContext;
  let screenOverride: ScreenOverride;

  beforeEach(() => {
    screenContext = {
      name: 'phone-identifier-challenge',
      data: {
        phone_number: '+1234567890',
        message_type: 'sms',
      },
    } as ScreenContext;

    screenOverride = new ScreenOverride(screenContext);
  });

  it('should initialize data correctly', () => {
    expect(screenOverride.data).toEqual({
      phone_number: '+1234567890',
      message_type: 'sms',
      phone: '+1234567890',
      messageType: 'sms',
    });
  });

  it('should call getScreenData with correct screenContext', () => {
    const getScreenDataSpy = jest.spyOn(ScreenOverride, 'getScreenData');

    screenOverride = new ScreenOverride(screenContext);

    expect(getScreenDataSpy).toHaveBeenCalledWith(screenContext);
  });

  it('should return null for data when screenContext.data is undefined', () => {
    const emptyContext = {} as ScreenContext;
    const result = ScreenOverride.getScreenData(emptyContext);

    expect(result).toBeNull();
  });

  it('should map phone_number to phone and message_type to messageType', () => {
    const result = ScreenOverride.getScreenData(screenContext);

    expect(result).toEqual({
      phone_number: '+1234567890',
      message_type: 'sms',
      phone: '+1234567890',
      messageType: 'sms',
    });
  });

  it('should create an instance of Screen', () => {
    expect(screenOverride).toBeInstanceOf(Screen);
  });
});
