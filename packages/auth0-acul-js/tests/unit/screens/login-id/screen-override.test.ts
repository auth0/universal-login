import { ScreenOverride } from '../../../../src/screens/login-id/screen-override';
import { getSignupLink, getResetPasswordLink, getPublicKey } from '../../../../src/shared/screen';
import { Screen } from '../../../../src/models/screen';
import type { ScreenContext } from '../../../../interfaces/models/screen';

jest.mock('../../../../src/shared/screen');
jest.mock('../../../../src/models/screen');

describe('ScreenOverride', () => {
  let screenContext: ScreenContext;
  let screenOverride: ScreenOverride;

  beforeEach(() => {
    screenContext = {
      // Mock required properties if any
    } as ScreenContext;

    (getSignupLink as jest.Mock).mockReturnValue('mockSignupLink');
    (getResetPasswordLink as jest.Mock).mockReturnValue('mockResetPasswordLink');
    (getPublicKey as jest.Mock).mockReturnValue('mockPublicKey');

    screenOverride = new ScreenOverride(screenContext);
  });

  it('should initialize signupLink correctly', () => {
    expect(screenOverride.signupLink).toBe('mockSignupLink');
  });

  it('should initialize resetPasswordLink correctly', () => {
    expect(screenOverride.resetPasswordLink).toBe('mockResetPasswordLink');
  });

  it('should initialize publicKey correctly', () => {
    expect(screenOverride.publicKey).toBe('mockPublicKey');
  });

  it('should call shared functions with correct screenContext', () => {
    expect(getSignupLink).toHaveBeenCalledWith(screenContext);
    expect(getResetPasswordLink).toHaveBeenCalledWith(screenContext);
    expect(getPublicKey).toHaveBeenCalledWith(screenContext);
  });

  it('should handle missing screenContext gracefully', () => {
    (getSignupLink as jest.Mock).mockReturnValue(undefined);
    (getResetPasswordLink as jest.Mock).mockReturnValue(undefined);
    (getPublicKey as jest.Mock).mockReturnValue(undefined);

    const emptyScreenOverride = new ScreenOverride({} as ScreenContext);

    expect(emptyScreenOverride.signupLink).toBeUndefined();
    expect(emptyScreenOverride.resetPasswordLink).toBeUndefined();
    expect(emptyScreenOverride.publicKey).toBeUndefined();
  });
});
