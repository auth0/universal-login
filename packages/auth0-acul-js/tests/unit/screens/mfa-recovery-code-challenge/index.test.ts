import { FormActions } from '../../../../src/constants';
import { ScreenIds } from '../../../../src/constants';
import MfaRecoveryCodeChallenge from '../../../../src/screens/mfa-recovery-code-challenge';
import { FormHandler } from '../../../../src/utils/form-handler';
import { baseContextData } from '../../../data/test-data';

describe('MfaRecoveryCodeChallenge', () => {
  let mfaRecoveryCodeChallenge: MfaRecoveryCodeChallenge;
  let mockSubmitData: jest.SpyInstance;

  beforeEach(() => {
    global.window = Object.create(window);
    baseContextData.screen.name = ScreenIds.MFA_RECOVERY_CODE_CHALLENGE;
    window.universal_login_context = baseContextData;
    mfaRecoveryCodeChallenge = new MfaRecoveryCodeChallenge();
    mfaRecoveryCodeChallenge.transaction = { state: 'test-state' } as any;

    mockSubmitData = jest.spyOn(FormHandler.prototype, 'submitData').mockResolvedValue(undefined);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('continue', () => {
    it('should call FormHandler.submitData with the correct parameters', async () => {
      const code = 'test-code';
      const payload = { key: 'value' };

      await mfaRecoveryCodeChallenge.continue({ code, ...payload });

      expect(mockSubmitData).toHaveBeenCalledWith({
        ...payload,
        code,
        action: FormActions.DEFAULT,
      });
    });

    it('should call FormHandler.submitData with default payload if none is provided', async () => {
      const code = 'test-code';

      await mfaRecoveryCodeChallenge.continue({ code });

      expect(mockSubmitData).toHaveBeenCalledWith({
        code,
        action: FormActions.DEFAULT,
      });
    });
  });

  describe('tryAnotherMethod', () => {
    it('should call FormHandler.submitData with the correct parameters', async () => {
      const payload = { key: 'value' };

      await mfaRecoveryCodeChallenge.tryAnotherMethod(payload);

      expect(mockSubmitData).toHaveBeenCalledWith({
        ...payload,
        action: FormActions.PICK_AUTHENTICATOR,
      });
    });

    it('should call FormHandler.submitData with default payload if none is provided', async () => {
      await mfaRecoveryCodeChallenge.tryAnotherMethod();

      expect(mockSubmitData).toHaveBeenCalledWith({
        action: FormActions.PICK_AUTHENTICATOR,
      });
    });
  });
});