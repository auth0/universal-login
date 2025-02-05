import { baseContextData } from '../../../data/test-data';
import ResetPasswordError from '../../../../src/screens/reset-password-error';

describe('ResetPasswordError', () => {
  let resetPasswordError: ResetPasswordError;
  beforeEach(() => {
    global.window = Object.create(window);
    window.universal_login_context = baseContextData;
    resetPasswordError = new ResetPasswordError();
  });
  it.skip('should parse the data correctly', () => {
    const { screen } = resetPasswordError;
    expect(screen.data).toEqual({
      username: 'randomUsername',
    });
  });
});
