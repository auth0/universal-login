import { ScreenOverride } from '../../../../src/screens/login/screen-override';
import { getSignupLink, getResetPasswordLink, getGoogleOneTapConfig } from '../../../../src/shared/screen';

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

    screenOverride = new ScreenOverride(screenContext);
  });

  it('should initialize signupLink correctly', () => {
    expect(screenOverride.signupLink).toBe('mockSignupLink');
  });

  it('should initialize resetPasswordLink correctly', () => {
    expect(screenOverride.resetPasswordLink).toBe('mockResetPasswordLink');
  });

  it('should initialize data as null when the context has no data', () => {
    expect(screenOverride.data).toBeNull();
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

  describe('getScreenData', () => {
    it('should rename active_identifier_type to activeIdentifierType and drop the raw key', () => {
      const context = { data: { active_identifier_type: 'phone' } } as unknown as ScreenContext;

      const data = ScreenOverride.getScreenData(context);

      expect(data).toEqual({ activeIdentifierType: 'phone' });
      expect(data).not.toHaveProperty('active_identifier_type');
    });

    it('should preserve other data keys unchanged', () => {
      const context = { data: { active_identifier_type: 'email', username: 'jane' } } as unknown as ScreenContext;

      expect(ScreenOverride.getScreenData(context)).toEqual({
        activeIdentifierType: 'email',
        username: 'jane',
      });
    });

    it('should not add activeIdentifierType when absent', () => {
      const context = { data: { username: 'jane' } } as unknown as ScreenContext;

      const data = ScreenOverride.getScreenData(context);

      expect(data).toEqual({ username: 'jane' });
      expect(data).not.toHaveProperty('activeIdentifierType');
    });

    it('should return null when data is not available', () => {
      expect(ScreenOverride.getScreenData({} as ScreenContext)).toBeNull();
    });

    it('should expose the transformed data on the instance', () => {
      const override = new ScreenOverride({ data: { active_identifier_type: 'username' } } as unknown as ScreenContext);

      expect(override.data).toEqual({ activeIdentifierType: 'username' });
    });
  });
});