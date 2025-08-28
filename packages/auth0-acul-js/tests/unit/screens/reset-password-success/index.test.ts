import { ScreenIds } from '../../../../src/constants';
import { BaseContext } from '../../../../src/models/base-context';
import ResetPasswordSuccess from '../../../../src/screens/reset-password-success';

import type { ScreenContext } from '../../../../interfaces/models/screen';


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
