import { ScreenIds } from '../../../../src/constants';
import { FormActions } from '../../../../src/constants';
import ResetPasswordMfaRecoveryCodeChallenge from '../../../../src/screens/reset-password-mfa-recovery-code-challenge';
import { FormHandler } from '../../../../src/utils/form-handler';
import { baseContextData } from '../../../data/test-data';

jest.mock('../../../../src/utils/form-handler');


describe('ResetPasswordMfaRecoveryCodeChallenge', () => {
  let instance: ResetPasswordMfaRecoveryCodeChallenge;
  let mockSubmitData: jest.Mock;

  beforeEach(() => {
    global.window = Object.create(window);
    baseContextData.screen.name = ScreenIds.RESET_PASSWORD_MFA_RECOVERY_CODE_CHALLENGE;
    window.universal_login_context = baseContextData;
    instance = new ResetPasswordMfaRecoveryCodeChallenge();
    mockSubmitData = jest.fn();
    jest.spyOn(FormHandler.prototype, 'submitData').mockImplementation(mockSubmitData);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('continue', () => {
    it('should call FormHandler.submitData with the correct parameters', async () => {
      const code = 'mockCode';
      const payload = { key: 'value' };

      await instance.continue(code, payload);

      expect(mockSubmitData).toHaveBeenCalledWith({
        ...payload,
        code,
        action: FormActions.DEFAULT,
      });
    });

    it('should call FormHandler.submitData with default payload if none is provided', async () => {
      const code = 'mockCode';

      await instance.continue(code);

      expect(mockSubmitData).toHaveBeenCalledWith({
        code,
        action: FormActions.DEFAULT,
      });
    });
  });

  describe('tryAnotherMethod', () => {
    it('should call FormHandler.submitData with the correct parameters', async () => {
      const payload = { key: 'value' };

      await instance.tryAnotherMethod(payload);

      expect(mockSubmitData).toHaveBeenCalledWith({
        ...payload,
        action: FormActions.PICK_AUTHENTICATOR,
      });
    });

    it('should call FormHandler.submitData with default payload if none is provided', async () => {
      await instance.tryAnotherMethod();

      expect(mockSubmitData).toHaveBeenCalledWith({
        action: FormActions.PICK_AUTHENTICATOR,
      });
    });
  });
});