import ResetPasswordSuccess from '../../../../src/screens/reset-password-success';
import { ScreenOverride } from '../../../../src/screens/reset-password-success/screen-override';
import { BaseContext } from '../../../../src/models/base-context';
import type { ScreenContext } from '../../../../interfaces/models/screen';

jest.mock('../../../../src/screens/reset-password-success/screen-override');
jest.mock('../../../../src/models/base-context');

describe('ResetPasswordSuccess', () => {
  let resetPasswordSuccess: ResetPasswordSuccess;
  let screenContext: ScreenContext;

  beforeEach(() => {
    screenContext = {
      name: 'reset-password-success',
      data: { username: 'testuser' },
    } as ScreenContext;

    (BaseContext.prototype.getContext as jest.Mock).mockImplementation((contextType: string) => {
      if (contextType === 'screen') return screenContext;
      return null;
    });

    (ScreenOverride as unknown as jest.Mock).mockImplementation(() => ({
      data: screenContext.data,
    }));

    resetPasswordSuccess = new ResetPasswordSuccess();
  });

  it.skip('should initialize screen correctly', () => {
    expect(resetPasswordSuccess.screen).toBeInstanceOf(ScreenOverride);
  });

  it('should call BaseContext.getContext with "screen"', () => {
    expect(BaseContext.prototype.getContext).toHaveBeenCalledWith('screen');
  });

  it('should initialize screen with correct context', () => {
    expect(ScreenOverride).toHaveBeenCalledWith(screenContext);
  });

  it('should extend BaseContext', () => {
    expect(resetPasswordSuccess).toBeInstanceOf(BaseContext);
  });
});
