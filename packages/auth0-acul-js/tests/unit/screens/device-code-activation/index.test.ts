import DeviceCodeConfirmation from '../../../../src/screens/device-code-confirmation';
import { baseContextData } from '../../../data/test-data';
import { FormHandler } from '../../../../src/utils/form-handler';
import { ScreenIds, FormActions } from '../../../../src/constants';

jest.mock('../../../../src/utils/form-handler');

describe('DeviceCodeConfirmation', () => {
  let deviceCodeConfirmation: DeviceCodeConfirmation;
  let mockFormHandler: { submitData: jest.Mock };

  beforeEach(() => {
    global.window = Object.create(window);
    baseContextData.screen.name = ScreenIds.DEVICE_CODE_CONFIRMATION;
    window.universal_login_context = baseContextData;

    mockFormHandler = {
      submitData: jest.fn(),
    };
    (FormHandler as jest.Mock).mockImplementation(() => mockFormHandler);

    deviceCodeConfirmation = new DeviceCodeConfirmation();
  });

  it('should have a static screenIdentifier property', () => {
    expect(DeviceCodeConfirmation.screenIdentifier).toBeDefined();
    expect(DeviceCodeConfirmation.screenIdentifier).toBe(ScreenIds.DEVICE_CODE_CONFIRMATION);
  });

  it('should create an instance of DeviceCodeConfirmation', () => {
    expect(deviceCodeConfirmation).toBeInstanceOf(DeviceCodeConfirmation);
  });

  describe('confirm', () => {
    it('should call FormHandler.submitData with action "confirm"', async () => {
      await deviceCodeConfirmation.confirm();
      expect(mockFormHandler.submitData).toHaveBeenCalledWith({
        action: 'confirm',
      });
    });

    it('should throw if FormHandler.submitData rejects', async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error('Submit failed'));
      await expect(deviceCodeConfirmation.confirm()).rejects.toThrow('Submit failed');
    });
  });

  describe('cancel', () => {
    it('should call FormHandler.submitData with action "cancel"', async () => {
      await deviceCodeConfirmation.cancel();
      expect(mockFormHandler.submitData).toHaveBeenCalledWith({
        action: 'cancel',
      });
    });

    it('should throw if FormHandler.submitData rejects', async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error('Cancel failed'));
      await expect(deviceCodeConfirmation.cancel()).rejects.toThrow('Cancel failed');
    });
  });
});
