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
    screenContext = {} as ScreenContext;

    (getSignupLink as jest.Mock).mockReturnValue('mockSignupLink');
    (getResetPasswordLink as jest.Mock).mockReturnValue('mockResetPasswordLink');
    (getEditIdentifierLink as jest.Mock).mockReturnValue('mockEditIdentifierLink');
    (Screen.getScreenData as jest.Mock).mockReturnValue({ mockData: 'mockData' });

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
    expect(screenOverride.data).toEqual({ mockData: 'mockData' });
  });

  it('should call shared functions with correct screenContext', () => {
    expect(getSignupLink).toHaveBeenCalledWith(screenContext);
    expect(getResetPasswordLink).toHaveBeenCalledWith(screenContext);
    expect(getEditIdentifierLink).toHaveBeenCalledWith(screenContext);
    expect(Screen.getScreenData).toHaveBeenCalledWith(screenContext);
  });

  it('should handle missing screenContext properties gracefully', () => {
    (getSignupLink as jest.Mock).mockReturnValue(undefined);
    (getResetPasswordLink as jest.Mock).mockReturnValue(undefined);
    (getEditIdentifierLink as jest.Mock).mockReturnValue(undefined);
    (Screen.getScreenData as jest.Mock).mockReturnValue(undefined);

    const emptyScreenOverride = new ScreenOverride({} as ScreenContext);

    expect(emptyScreenOverride.signupLink).toBeUndefined();
    expect(emptyScreenOverride.resetPasswordLink).toBeUndefined();
    expect(emptyScreenOverride.editIdentifierLink).toBeUndefined();
    expect(emptyScreenOverride.data).toBeUndefined();
  });
});
