import { ScreenOverride } from '../../../../src/screens/email-identifier-challenge/screen-override';
import { Screen } from '../../../../src/models/screen';
import type { ScreenContext } from '../../../../interfaces/models/screen';

jest.mock('../../../../src/models/screen');

describe('ScreenOverride', () => {
  let screenContext: ScreenContext;
  let screenOverride: ScreenOverride;

  beforeEach(() => {
    screenContext = {
      name: 'email-identifier-challenge',
      data: { email: 'test@example.com', message_type: 'otp' },
    } as ScreenContext;

    (Screen.getScreenData as jest.Mock).mockReturnValue({
      email: 'test@example.com',
      messageType: 'otp',
    });

    screenOverride = new ScreenOverride(screenContext);
  });

  it('should initialize data correctly', () => {
    expect(screenOverride.data).toEqual({
      email: 'test@example.com',
      messageType: 'otp',
    });
  });

  it('should call Screen.getScreenData with screenContext', () => {
    expect(Screen.getScreenData).toHaveBeenCalledTimes(1);
    expect(Screen.getScreenData).toHaveBeenCalledWith(screenContext);
  });

  it('should return null if screenContext.data is missing', () => {
    const emptyContext = { name: 'email-identifier-challenge' } as ScreenContext;
    const result = ScreenOverride.getScreenData(emptyContext);
    expect(result).toBeNull();
  });

  it.only('should return transformed data with email and messageType', () => {
    const result = ScreenOverride.getScreenData(screenContext);
    expect(result).toEqual({
      email: 'test@example.com',
      messageType: 'otp',
    });
  });

  it('should extend Screen class', () => {
    expect(screenOverride).toBeInstanceOf(Screen);
  });
});
