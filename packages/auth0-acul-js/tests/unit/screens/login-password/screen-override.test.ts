import { ScreenOverride } from '../../../../src/screens/login-password/screen-override';
import { getSignupLink, getResetPasswordLink, getEditIdentifierLink } from '../../../../src/shared/screen';
import { Screen } from '../../../../src/models/screen';
import type { ScreenContext } from '../../../../interfaces/models/screen';

jest.mock('../../../../src/shared/screen');
jest.mock('../../../../src/models/screen');

describe('ScreenOverride', () => {
  let screenContext: ScreenContext;
  let screenOverride: ScreenOverride;

  beforeEach(() => {
    screenContext = {
      name: 'login-password',
      data: {
        username: 'testuser@example.com',
        show_switch_to_otp_button: true,
      },
    } as ScreenContext;

    (getSignupLink as jest.Mock).mockReturnValue('mockSignupLink');
    (getResetPasswordLink as jest.Mock).mockReturnValue('mockResetPasswordLink');
    (getEditIdentifierLink as jest.Mock).mockReturnValue('mockEditIdentifierLink');

    screenOverride = new ScreenOverride(screenContext);
  });

  it('should initialize signupLink correctly', () => {
    expect(screenOverride.signupLink).toBe('mockSignupLink');
  });

  it('should initialize resetPasswordLink correctly', () => {
    expect(screenOverride.resetPasswordLink).toBe('mockResetPasswordLink');
  });

  it('should initialize editIdentifierLink correctly', () => {
    expect(screenOverride.editIdentifierLink).toBe('mockEditIdentifierLink');
  });

  it('should initialize data correctly', () => {
    expect(screenOverride.data).toEqual(
      expect.objectContaining({
        username: 'testuser@example.com',
        showSwitchToOtpButton: true,
      })
    );
  });

  it('should call shared functions with correct screenContext', () => {
    expect(getSignupLink).toHaveBeenCalledWith(screenContext);
    expect(getResetPasswordLink).toHaveBeenCalledWith(screenContext);
    expect(getEditIdentifierLink).toHaveBeenCalledWith(screenContext);
  });

  it('should call getScreenData with correct screenContext', () => {
    const getScreenDataSpy = jest.spyOn(ScreenOverride, 'getScreenData');

    screenOverride = new ScreenOverride(screenContext);

    expect(getScreenDataSpy).toHaveBeenCalledWith(screenContext);
  });

  it('should create an instance of Screen', () => {
    expect(screenOverride).toBeInstanceOf(Screen);
  });

  it('should handle missing screenContext properties gracefully', () => {
    (getSignupLink as jest.Mock).mockReturnValue(undefined);
    (getResetPasswordLink as jest.Mock).mockReturnValue(undefined);
    (getEditIdentifierLink as jest.Mock).mockReturnValue(undefined);

    const emptyScreenOverride = new ScreenOverride({ data: null } as unknown as ScreenContext);

    expect(emptyScreenOverride.signupLink).toBeUndefined();
    expect(emptyScreenOverride.resetPasswordLink).toBeUndefined();
    expect(emptyScreenOverride.editIdentifierLink).toBeUndefined();
    expect(emptyScreenOverride.data).toBeNull();
  });

  describe('getScreenData static method', () => {
    it('should map show_switch_to_otp_button to showSwitchToOtpButton', () => {
      const result = ScreenOverride.getScreenData(screenContext);

      expect(result).toEqual(
        expect.objectContaining({
          username: 'testuser@example.com',
          showSwitchToOtpButton: true,
        })
      );
    });

    it('should return null when screenContext.data is null', () => {
      const nullContext = { name: 'login-password', data: null } as unknown as ScreenContext;
      expect(ScreenOverride.getScreenData(nullContext)).toBeNull();
    });

    it('should return null when screenContext.data is undefined', () => {
      const undefinedContext = { name: 'login-password' } as ScreenContext;
      expect(ScreenOverride.getScreenData(undefinedContext)).toBeNull();
    });

    it('should handle data without show_switch_to_otp_button', () => {
      const context = {
        name: 'login-password',
        data: { username: 'user@example.com' },
      } as ScreenContext;

      const result = ScreenOverride.getScreenData(context);

      expect(result).toEqual(
        expect.objectContaining({ username: 'user@example.com' })
      );
      expect(result?.showSwitchToOtpButton).toBeUndefined();
    });
  });
});
