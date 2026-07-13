import Confirmation from '../../../../src/screens/confirmation';
import { baseContextData } from '../../../data/test-data';
import { FormHandler } from '../../../../src/utils/form-handler';
import { ScreenIds } from '../../../../src/constants';

jest.mock('../../../../src/utils/form-handler');

describe('Confirmation', () => {
  let confirmation: Confirmation;
  let mockFormHandler: { submitData: jest.Mock };

  beforeEach(() => {
    global.window = Object.create(window);
    baseContextData.screen.name = ScreenIds.CONFIRMATION;
    window.universal_login_context = baseContextData;

    mockFormHandler = {
      submitData: jest.fn(),
    };
    (FormHandler as jest.Mock).mockImplementation(() => mockFormHandler);

    confirmation = new Confirmation();
  });

  it('should have a static screenIdentifier property', () => {
    expect(Confirmation.screenIdentifier).toBeDefined();
    expect(Confirmation.screenIdentifier).toBe(ScreenIds.CONFIRMATION);
  });

  it('should create an instance of Confirmation', () => {
    expect(confirmation).toBeInstanceOf(Confirmation);
  });

  describe('proceedToSignup', () => {
    it('should call FormHandler.submitData with action "proceed-to-signup"', async () => {
      await confirmation.proceedToSignup();
      expect(mockFormHandler.submitData).toHaveBeenCalledWith({
        action: 'proceed-to-signup',
      });
    });

    it('should throw if FormHandler.submitData rejects', async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error('Submit failed'));
      await expect(confirmation.proceedToSignup()).rejects.toThrow('Submit failed');
    });
  });

  describe('goBack', () => {
    it('should call FormHandler.submitData with action "back-action"', async () => {
      await confirmation.goBack();
      expect(mockFormHandler.submitData).toHaveBeenCalledWith({
        action: 'back-action',
      });
    });

    it('should throw if FormHandler.submitData rejects', async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error('Go back failed'));
      await expect(confirmation.goBack()).rejects.toThrow('Go back failed');
    });
  });
});
