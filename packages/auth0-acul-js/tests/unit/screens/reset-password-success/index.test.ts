import ResetPasswordSuccess from '../../../../src/screens/reset-password-success';
import { BaseContext } from '../../../../src/models/base-context';
import type { ScreenContext } from '../../../../interfaces/models/screen';

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

    resetPasswordSuccess = new ResetPasswordSuccess();
  });

  it('should extend BaseContext', () => {
    expect(resetPasswordSuccess).toBeInstanceOf(BaseContext);
  });
});
