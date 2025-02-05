import { ScreenOverride } from '../../../../src/screens/phone-identifier-enrollment/screen-override';
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
      name: 'phone-identifier-enrollment',
      data: {
        phone_number: '+1234567890',
        message_type: 'sms',
      },
    } as ScreenContext;

    (getEditIdentifierLink as jest.Mock).mockReturnValue('mockEditIdentifierLink');

    screenOverride = new ScreenOverride(screenContext);
  });

  it('should initialize editIdentifierLink correctly', () => {
    expect(screenOverride.editIdentifierLink).toBe('mockEditIdentifierLink');
  });

  it('should initialize data correctly', () => {
    expect(screenOverride.data).toEqual({
      phone_number: '+1234567890',
      message_type: 'sms',
      phone: '+1234567890',
      messageType: 'sms',
    });
  });

  it('should call getEditIdentifierLink with correct screenContext', () => {
    expect(getEditIdentifierLink).toHaveBeenCalledWith(screenContext);
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
