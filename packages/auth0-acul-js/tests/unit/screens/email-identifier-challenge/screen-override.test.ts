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
      data: {
        email: 'test@example.com',
        message_type: 'otp',
        show_switch_to_password_button: true,
      },
    } as ScreenContext;

    screenOverride = new ScreenOverride(screenContext);
  });

  it('should extend Screen class', () => {
    expect(screenOverride).toBeInstanceOf(Screen);
  });

  it('should initialize data correctly', () => {
    expect(screenOverride.data).toEqual(
      expect.objectContaining({
        email: 'test@example.com',
        messageType: 'otp',
        showSwitchToPasswordButton: true,
      })
    );
  });

  it('should call getScreenData with correct screenContext', () => {
    const getScreenDataSpy = jest.spyOn(ScreenOverride, 'getScreenData');

    screenOverride = new ScreenOverride(screenContext);

    expect(getScreenDataSpy).toHaveBeenCalledWith(screenContext);
  });

  describe('getScreenData static method', () => {
    it('should return null if screenContext.data is missing', () => {
      const emptyContext = { name: 'email-identifier-challenge' } as ScreenContext;
      expect(ScreenOverride.getScreenData(emptyContext)).toBeNull();
    });

    it('should return null if screenContext.data is null', () => {
      const nullContext = { name: 'email-identifier-challenge', data: null } as unknown as ScreenContext;
      expect(ScreenOverride.getScreenData(nullContext)).toBeNull();
    });

    it('should map message_type to messageType', () => {
      const result = ScreenOverride.getScreenData(screenContext);
      expect(result?.messageType).toBe('otp');
    });

    it('should map show_switch_to_password_button to showSwitchToPasswordButton', () => {
      const result = ScreenOverride.getScreenData(screenContext);
      expect(result?.showSwitchToPasswordButton).toBe(true);
    });

    it('should exclude raw snake_case keys from output', () => {
      const result = ScreenOverride.getScreenData(screenContext) as Record<string, unknown>;
      expect(result?.message_type).toBeUndefined();
      expect(result?.show_switch_to_password_button).toBeUndefined();
    });

    it('should handle data without show_switch_to_password_button', () => {
      const context = {
        name: 'email-identifier-challenge',
        data: { email: 'user@example.com', message_type: 'otp' },
      } as ScreenContext;

      const result = ScreenOverride.getScreenData(context);
      expect(result?.showSwitchToPasswordButton).toBeUndefined();
    });
  });
});
