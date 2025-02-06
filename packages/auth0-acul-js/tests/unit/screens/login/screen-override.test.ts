import { ScreenOverride } from '../../../../src/screens/login/screen-override';
import { getSignupLink, getResetPasswordLink } from '../../../../src/shared/screen';
import { Screen } from '../../../../src/models/screen';
import type { ScreenContext } from '../../../../interfaces/models/screen';

jest.mock('../../../../src/shared/screen');
jest.mock('../../../../src/models/screen');

describe('ScreenOverride', () => {
  let screenContext: ScreenContext;
  let screenOverride: ScreenOverride;

  beforeEach(() => {
    screenContext = {
      // mock the screenContext properties as needed
    } as ScreenContext;

    (getSignupLink as jest.Mock).mockReturnValue('mockSignupLink');
    (getResetPasswordLink as jest.Mock).mockReturnValue('mockResetPasswordLink');
    (Screen.getScreenData as jest.Mock).mockReturnValue({ mockData: 'mockData' });

    screenOverride = new ScreenOverride(screenContext);
  });

  it('should initialize signupLink correctly', () => {
    expect(screenOverride.signupLink).toBe('mockSignupLink');
  });

  it('should initialize resetPasswordLink correctly', () => {
    expect(screenOverride.resetPasswordLink).toBe('mockResetPasswordLink');
  });

  it('should initialize data correctly', () => {
    expect(screenOverride.data).toEqual({ mockData: 'mockData' });
  });
});