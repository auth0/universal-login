import MfaEmailList from '../../../../src/screens/mfa-email-list';
import { baseContextData } from '../../../data/test-data';
import { FormHandler } from '../../../../src/utils/form-handler';
import { CustomOptions } from '../../../../interfaces/common';
import { SelectMfaEmailOptions } from '../../../../interfaces/screens/mfa-email-list';
import { ScreenIds } from '../../../../src//constants';
import { FormActions } from '../../../../src/constants';

jest.mock('../../../../src/utils/form-handler');

describe('MfaEmailList', () => {
  let mfaEmailList: MfaEmailList;
  let mockFormHandler: { submitData: jest.Mock };

  beforeEach(() => {
    global.window = Object.create(window);
    baseContextData.screen.name = ScreenIds.MFA_EMAIL_LIST;
    window.universal_login_context = {
      ...baseContextData,
      user: {
        ...baseContextData.user,
        enrolled_emails:  ['gyan*********@gmai*****', 'gyan**********@okta****']
      }
    };
    mfaEmailList = new MfaEmailList();
    mockFormHandler = {
      submitData: jest.fn(),
    };
    (FormHandler as jest.Mock).mockImplementation(() => mockFormHandler);
  });

  describe('selectMfaEmail method', () => {
    it('should handle selectMfaEmail with valid payload correctly', async () => {
      const payload: SelectMfaEmailOptions = {
        index: 0,
      };
      await mfaEmailList.selectMfaEmail(payload);
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining(payload)
      );
    });

    it('should throw error when promise is rejected', async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error('Mocked reject'));
      const payload: SelectMfaEmailOptions = {
        index: 0,
      };
      await expect(mfaEmailList.selectMfaEmail(payload)).rejects.toThrow(
        'Mocked reject'
      );
    });
  });

  describe('goBack method', () => {
    it('should handle goBack with valid payload correctly', async () => {
      const payload: CustomOptions = {
        someOption: 'value',
      };
      await mfaEmailList.goBack(payload);
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          ...payload,
          action: FormActions.BACK,
        })
      );
    });

    it('should handle goBack without payload correctly', async () => {
      await mfaEmailList.goBack();
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          action: FormActions.BACK,
        })
      );
    });

    it('should throw error when promise is rejected', async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error('Mocked reject'));
      const payload: CustomOptions = {
        someOption: 'value',
      };
      await expect(mfaEmailList.goBack(payload)).rejects.toThrow('Mocked reject');
    });
  });
});
