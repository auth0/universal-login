import { ScreenOverride } from '../../../../src/screens/login/screen-override';
import { getSignupLink, getResetPasswordLink, getGoogleOneTapConfig } from '../../../../src/shared/screen';
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
    (getGoogleOneTapConfig as jest.Mock).mockReturnValue(null);
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

  it('should return googleOneTapConfig when getGoogleOneTapConfig returns config', () => {
    const config = { client_id: 'test-client-id', nonce: 'test-nonce', context: 'signin',
      itp_support: true, auto_select: false, cancel_on_tap_outside: false };
    (getGoogleOneTapConfig as jest.Mock).mockReturnValue(config);
    const override = new ScreenOverride(screenContext);
    expect(override.googleOneTapConfig).toEqual(config);
    expect(getGoogleOneTapConfig).toHaveBeenCalledWith(screenContext);
  });

  it('should return null for googleOneTapConfig when getGoogleOneTapConfig returns null', () => {
    (getGoogleOneTapConfig as jest.Mock).mockReturnValue(null);
    const override = new ScreenOverride(screenContext);
    expect(override.googleOneTapConfig).toBeNull();
  });
});