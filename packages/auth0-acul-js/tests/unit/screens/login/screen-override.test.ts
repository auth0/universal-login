import { ScreenOverride } from '../../../../src/screens/login/screen-override';
import { getSignupLink, getResetPasswordLink, getGoogleOneTapConfig } from '../../../../src/shared/screen';

import type { ScreenContext } from '../../../../interfaces/models/screen';

jest.mock('../../../../src/shared/screen');

describe('ScreenOverride', () => {
  let screenContext: ScreenContext;
  let screenOverride: ScreenOverride;

  beforeEach(() => {
    screenContext = {
      data: { mockData: 'mockData' },
    } as unknown as ScreenContext;

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

  describe('activeIdentifierType', () => {
    const buildData = (data: Record<string, unknown>): ScreenOverride['data'] =>
      new ScreenOverride({ data } as unknown as ScreenContext).data;

    it.each(['email', 'phone', 'username'])('should expose %s as camelCase activeIdentifierType', (value) => {
      expect(buildData({ active_identifier_type: value })?.activeIdentifierType).toBe(value);
    });

    it('should drop the raw snake_case key', () => {
      expect(buildData({ active_identifier_type: 'phone' })).not.toHaveProperty('active_identifier_type');
    });

    it('should omit activeIdentifierType when the server does not resolve one', () => {
      expect(buildData({ username: 'someone' })).not.toHaveProperty('activeIdentifierType');
    });

    it('should preserve sibling screen data keys', () => {
      expect(buildData({ username: 'someone', active_identifier_type: 'email' })?.username).toBe('someone');
    });

    it('should return null when the screen has no data', () => {
      expect(new ScreenOverride({} as ScreenContext).data).toBeNull();
    });
  });
});