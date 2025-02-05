import { ScreenOverride } from '../../../../src/screens/login-passwordless-sms-otp/screen-override';
import { getSignupLink, getResetPasswordLink, getBackLink } from '../../../../src/shared/screen';
import { Screen } from '../../../../src/models/screen';
import type { ScreenContext } from '../../../../interfaces/models/screen';

jest.mock('../../../../src/shared/screen');
jest.mock('../../../../src/models/screen');

describe('ScreenOverride', () => {
  let screenContext: ScreenContext;
  let screenOverride: ScreenOverride;

  beforeEach(() => {
    screenContext = {} as ScreenContext;

    (getSignupLink as jest.Mock).mockReturnValue('mockSignupLink');
    (getResetPasswordLink as jest.Mock).mockReturnValue('mockResetPasswordLink');
    (getBackLink as jest.Mock).mockReturnValue('mockBackLink');
    (Screen.getScreenData as jest.Mock).mockReturnValue({ mockData: 'mockData' });

    screenOverride = new ScreenOverride(screenContext);
  });

  it('should initialize signupLink correctly', () => {
    expect(screenOverride.signupLink).toBe('mockSignupLink');
  });

  it('should initialize resetPasswordLink correctly', () => {
    expect(screenOverride.resetPasswordLink).toBe('mockResetPasswordLink');
  });

  it('should initialize backLink correctly', () => {
    expect(screenOverride.backLink).toBe('mockBackLink');
  });

  it('should initialize data correctly', () => {
    expect(screenOverride.data).toEqual({ mockData: 'mockData' });
  });

  it('should call getSignupLink with correct screenContext', () => {
    expect(getSignupLink).toHaveBeenCalledWith(screenContext);
  });

  it('should call getResetPasswordLink with correct screenContext', () => {
    expect(getResetPasswordLink).toHaveBeenCalledWith(screenContext);
  });

  it('should call getBackLink with correct screenContext', () => {
    expect(getBackLink).toHaveBeenCalledWith(screenContext);
  });

  it('should call Screen.getScreenData with correct screenContext', () => {
    expect(Screen.getScreenData).toHaveBeenCalledWith(screenContext);
  });

  it('should handle missing screenContext properties gracefully', () => {
    (getSignupLink as jest.Mock).mockReturnValue(undefined);
    (getResetPasswordLink as jest.Mock).mockReturnValue(undefined);
    (getBackLink as jest.Mock).mockReturnValue(undefined);
    (Screen.getScreenData as jest.Mock).mockReturnValue(undefined);

    const emptyScreenOverride = new ScreenOverride({} as ScreenContext);

    expect(emptyScreenOverride.signupLink).toBeUndefined();
    expect(emptyScreenOverride.resetPasswordLink).toBeUndefined();
    expect(emptyScreenOverride.backLink).toBeUndefined();
    expect(emptyScreenOverride.data).toBeUndefined();
  });
});
