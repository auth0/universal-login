import { ScreenIds, FormActions } from '../../../../src/constants';
import RedeemTicket from '../../../../src/screens/redeem-ticket';
import { baseContextData } from '../../../data/test-data';
import { FormHandler } from '../../../../src/utils/form-handler';
import type { RedeemTicketMembers } from '../../../../interfaces/screens/redeem-ticket';
import type { CustomOptions } from '../../../../interfaces/common';

// Auto-mock FormHandler
jest.mock('../../../../src/utils/form-handler');

describe('RedeemTicket', () => {
  let mockSubmitData: jest.Mock;
  let redeemTicket: RedeemTicketMembers;

  beforeEach(() => {
    // Mock global screen context
    global.window = Object.create(window);
    baseContextData.screen.name = ScreenIds.REDEEM_TICKET;
    window.universal_login_context = baseContextData;

    // Reset mocks
    mockSubmitData = jest.fn();
    (FormHandler as jest.Mock).mockImplementation(() => ({
      submitData: mockSubmitData,
    }));

    // Instantiate screen
    redeemTicket = new RedeemTicket();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('continue()', () => {
    it('should call FormHandler.submitData with payload and default action', async () => {
      const payload: CustomOptions = { someOption: 'value' };

      await redeemTicket.continue(payload);

      expect(FormHandler).toHaveBeenCalledWith({
        state: baseContextData.transaction.state,
        telemetry: [ScreenIds.REDEEM_TICKET, 'continue'],
      });

      expect(mockSubmitData).toHaveBeenCalledWith({
        ...payload,
        action: FormActions.DEFAULT,
      });
    });

    it('should call FormHandler.submitData with only action if no payload', async () => {
      await redeemTicket.continue();

      expect(FormHandler).toHaveBeenCalledWith({
        state: baseContextData.transaction.state,
        telemetry: [ScreenIds.REDEEM_TICKET, 'continue'],
      });

      expect(mockSubmitData).toHaveBeenCalledWith({
        action: FormActions.DEFAULT,
      });
    });

    it('should throw an error if FormHandler.submitData rejects', async () => {
      const payload: CustomOptions = { someOption: 'value' };
      const error = new Error('Submit failed');

      mockSubmitData.mockRejectedValueOnce(error);

      await expect(redeemTicket.continue(payload)).rejects.toThrow('Submit failed');
    });
  });
});
