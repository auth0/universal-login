import { baseContextData } from '../../../data/test-data';
import ResetPasswordSuccess from '../../../../src/screens/reset-password-success';
describe('ResetPasswordSuccess', () => {
  let resetPasswordSuccess: ResetPasswordSuccess;
  beforeEach(() => {
    global.window = Object.create(window);
    window.universal_login_context = baseContextData;
    resetPasswordSuccess = new ResetPasswordSuccess();
  });
  it.skip('should parse the data correctly', () => {
    const { screen } = resetPasswordSuccess;
    expect(screen.data).toEqual({
      username: 'randomUsername',
    });
  });
});
