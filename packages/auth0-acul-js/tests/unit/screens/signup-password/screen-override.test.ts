import { ScreenOverride } from '../../../../src/screens/signup-password/screen-override';
import { getLoginLink, getEditIdentifierLink } from '../../../../src/shared/screen';
import { Screen } from '../../../../src/models/screen';
import type { ScreenContextOnSignupPassword } from '../../../../interfaces/screens/signup-password';

jest.mock('../../../../src/shared/screen');
jest.mock('../../../../src/models/screen');

describe('ScreenOverride', () => {
  let screenContext: ScreenContextOnSignupPassword;
  let screenOverride: ScreenOverride;

  beforeEach(() => {
    screenContext = {
      name: 'signup-password',
      links: { login: 'mockLoginLink', edit_identifier: 'mockEditLink' },
      data: { mockKey: 'mockValue' },
    } as ScreenContextOnSignupPassword;

    (getLoginLink as jest.Mock).mockReturnValue('mockLoginLink');
    (getEditIdentifierLink as jest.Mock).mockReturnValue('mockEditLink');
    (Screen.getScreenData as jest.Mock).mockReturnValue({ mockKey: 'mockValue' });

    screenOverride = new ScreenOverride(screenContext);
  });

  it('should initialize loginLink correctly', () => {
    expect(screenOverride.loginLink).toBe('mockLoginLink');
  });

  it('should initialize editLink correctly', () => {
    expect(screenOverride.editLink).toBe('mockEditLink');
  });

  it('should initialize data correctly', () => {
    expect(screenOverride.data).toEqual({ mockKey: 'mockValue' });
  });

  it('should call getLoginLink with screenContext', () => {
    expect(getLoginLink).toHaveBeenCalledWith(screenContext);
  });

  it('should call getEditIdentifierLink with screenContext', () => {
    expect(getEditIdentifierLink).toHaveBeenCalledWith(screenContext);
  });

  it('should call Screen.getScreenData with screenContext', () => {
    expect(Screen.getScreenData).toHaveBeenCalledWith(screenContext);
  });

  it('should extend Screen class', () => {
    expect(screenOverride).toBeInstanceOf(Screen);
  });
});
