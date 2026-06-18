import { ScreenOverride } from '../../../../src/screens/signup-id/screen-override';
import { getLoginLink, getGoogleOneTapConfig } from '../../../../src/shared/screen';
import { Screen } from '../../../../src/models/screen';
import type { ScreenContext } from '../../../../interfaces/models/screen';

jest.mock('../../../../src/shared/screen');

describe('ScreenOverride', () => {
  let screenContext: ScreenContext;
  let screenOverride: ScreenOverride;

  beforeEach(() => {
    screenContext = {
      name: 'signup-id',
      links: { login: 'mockLoginLink' },
    } as ScreenContext;

    (getLoginLink as jest.Mock).mockReturnValue('mockLoginLink');
    (getGoogleOneTapConfig as jest.Mock).mockReturnValue(null);

    screenOverride = new ScreenOverride(screenContext);
  });

  it('should initialize loginLink correctly', () => {
    expect(screenOverride.loginLink).toBe('mockLoginLink');
  });

  it('should call getLoginLink with screenContext', () => {
    expect(getLoginLink).toHaveBeenCalledWith(screenContext);
  });

  it('should extend Screen class', () => {
    expect(screenOverride).toBeInstanceOf(Screen);
  });

  it('should return googleOneTapConfig when getGoogleOneTapConfig returns config', () => {
    const config = { client_id: 'id', nonce: 'n', context: 'signup',
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
