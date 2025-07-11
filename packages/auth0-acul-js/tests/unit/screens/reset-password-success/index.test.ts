import ResetPasswordSuccess from '../../../../src/screens/reset-password-success';
import { BaseContext } from '../../../../src/models/base-context';
import type { ScreenContext } from '../../../../interfaces/models/screen';
import { ScreenIds } from '../../../../src//constants';

jest.mock('../../../../src/models/base-context');

describe('ResetPasswordSuccess', () => {
  let resetPasswordSuccess: ResetPasswordSuccess;
  let screenContext: ScreenContext;

  beforeEach(() => {
    screenContext = {
      name: ScreenIds.RESET_PASSWORD_SUCCESS,
      data: { username: 'testuser' },
    } as ScreenContext;

    (BaseContext.prototype.getContext as jest.Mock).mockImplementation((contextType: string) => {
      if (contextType === 'screen') return screenContext;
      return null;
    });

    resetPasswordSuccess = new ResetPasswordSuccess();
  });

  it('should extend BaseContext', () => {
    expect(resetPasswordSuccess).toBeInstanceOf(BaseContext);
  });
});
