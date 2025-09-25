import { ScreenIds } from '../../../../src/constants';
import { BaseContext } from '../../../../src/models/base-context';
import ResetPasswordError from '../../../../src/screens/reset-password-error';
import { ScreenOverride } from '../../../../src/screens/reset-password-error/screen-override';

import type { ScreenContext } from '../../../../interfaces/models/screen';


jest.mock('../../../../src/screens/reset-password-error/screen-override');
jest.mock('../../../../src/models/base-context');

describe('ResetPasswordError', () => {
  let resetPasswordError: ResetPasswordError;
  let screenContext: ScreenContext;

  beforeEach(() => {
    screenContext = {
      name: ScreenIds.RESET_PASSWORD_ERROR,
      data: { username: 'testuser' },
    } as ScreenContext;

    (BaseContext.prototype.getContext as jest.Mock).mockReturnValue(screenContext);
    (ScreenOverride as unknown as jest.Mock).mockImplementation((context) => ({
      data: context.data,
    }));

    resetPasswordError = new ResetPasswordError();
  });

  it('should instantiate ScreenOverride with the correct screenContext', () => {
    expect(ScreenOverride).toHaveBeenCalledTimes(1);
    expect(ScreenOverride).toHaveBeenCalledWith(screenContext);
  });

  it('should correctly initialize screen data', () => {
    expect(resetPasswordError.screen.data).toEqual({
      username: 'testuser',
    });
  });

  it('should extend BaseContext', () => {
    expect(resetPasswordError).toBeInstanceOf(BaseContext);
  });
});
