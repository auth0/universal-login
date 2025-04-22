import MfaRecoveryCodeEnrollment from '../../../../src/screens/mfa-recovery-code-enrollment';
import { FormHandler } from '../../../../src/utils/form-handler';
import { baseContextData } from '../../../data/test-data';
import { ScreenIds, FormActions } from '../../../../src/constants';

jest.mock('../../../../src/utils/form-handler');

describe('MfaRecoveryCodeEnrollment', () => {
  let instance: MfaRecoveryCodeEnrollment;
  let mockSubmitData: jest.Mock;

  beforeEach(() => {
    global.window = Object.create(window);
    baseContextData.screen.name = ScreenIds.MFA_RECOVERY_CODE_ENROLLMENT;
    window.universal_login_context = baseContextData;

    mockSubmitData = jest.fn().mockResolvedValue(undefined);
    (FormHandler as jest.Mock).mockImplementation(() => ({
      submitData: mockSubmitData,
    }));

    instance = new MfaRecoveryCodeEnrollment();
  });

  it('should be instantiable', () => {
    expect(instance).toBeInstanceOf(MfaRecoveryCodeEnrollment);
  });

  it('should have a static screenIdentifier', () => {
    expect(MfaRecoveryCodeEnrollment.screenIdentifier).toBe(ScreenIds.MFA_RECOVERY_CODE_ENROLLMENT);
  });

  describe('continue()', () => {
    it('should call FormHandler.submitData with default payload', async () => {
      await instance.continue();

      expect(mockSubmitData).toHaveBeenCalledWith({
        action: FormActions.DEFAULT,
        saved: 'on',
      });
    });

    it('should include custom options in the payload', async () => {
      const customOptions = {
        customParam: 'customValue',
      };

      await instance.continue({ customParam: 'customValue' });

      expect(mockSubmitData).toHaveBeenCalledWith({
        action: FormActions.DEFAULT,
        saved: 'on',
        customParam: 'customValue',
      });
    });

    it('should throw an error if submitData fails', async () => {
      mockSubmitData.mockRejectedValue(new Error('Submit failed'));

      await expect(instance.continue()).rejects.toThrow('Submit failed');
    });
  });
});
