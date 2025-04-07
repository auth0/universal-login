import { baseContextData } from '../../../data/test-data';
import { FormHandler } from '../../../../src/utils/form-handler';
import AcceptInvitation from '../../../../src/screens/accept-invitation';
import { CustomOptions } from 'interfaces/common';
import { ScreenIds } from '../../../../src/utils/enums';
import { FormActions } from '../../../../src/constants';

jest.mock('../../../../src/utils/form-handler');

describe('AcceptInvitation', () => {
  let acceptInvitation: AcceptInvitation;
  let mockFormHandler: { submitData: jest.Mock };

  beforeEach(() => {
    global.window = Object.create(window);
    baseContextData.screen.name = ScreenIds.ACCEPT_INVITATION;
    window.universal_login_context = baseContextData;

    acceptInvitation = new AcceptInvitation();
    mockFormHandler = {
      submitData: jest.fn(),
    };
    (FormHandler as jest.Mock).mockImplementation(() => mockFormHandler);
  });

  describe('acceptInvitation method', () => {
    it('should handle acceptInvitation with valid payload correctly', async () => {
      const payload: CustomOptions = {
        someOption: 'value',
      };

      await acceptInvitation.acceptInvitation(payload);

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          ...payload,
          action: FormActions.DEFAULT,
        })
      );
    });

    it('should handle acceptInvitation without payload correctly', async () => {
      await acceptInvitation.acceptInvitation();

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          action: FormActions.DEFAULT,
        })
      );
    });

    it('should throw error when promise is rejected', async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error('Mocked reject'));
      const payload: CustomOptions = {
        someOption: 'value',
      };

      await expect(acceptInvitation.acceptInvitation(payload)).rejects.toThrow('Mocked reject');
    });
  });
});