import DeviceCodeActivation from '../../../../src/screens/device-code-activation';
import { baseContextData } from '../../../data/test-data';
import { FormHandler } from '../../../../src/utils/form-handler';
import { CustomOptions } from 'interfaces/common';
import { ScreenIds } from '../../../../src//constants';
import { FormActions } from '../../../../src/constants';

jest.mock('../../../../src/utils/form-handler');

describe('DeviceCodeActivation', () => {
  let deviceCodeActivation: DeviceCodeActivation;
  let mockFormHandler: { submitData: jest.Mock };

  beforeEach(() => {
    global.window = Object.create(window);
    baseContextData.screen.name = ScreenIds.DEVICE_CODE_ACTIVATION;
    window.universal_login_context = baseContextData;
    deviceCodeActivation = new DeviceCodeActivation();
    mockFormHandler = {
      submitData: jest.fn(),
    };
    (FormHandler as jest.Mock).mockImplementation(() => mockFormHandler);
  });

  describe('continue method', () => {
    it('should call FormHandler.submitData with the correct parameters', async () => {
      const code = 'test-code';
      const payload = { code };

      await deviceCodeActivation.continue(payload);

      expect(mockFormHandler.submitData).toHaveBeenCalledWith({
        code: 'test-code',
        action: FormActions.DEFAULT,
      });
    });

    it('should reject with an error if the code parameter is missing', async () => {
      await expect(deviceCodeActivation.continue({ code: '' })).rejects.toThrow(
        'The code parameter is required.'
      );
    });

    it('should handle custom options correctly', async () => {
      const code = 'test-code';
      const customOptions: CustomOptions = {
        customParam: 'customValue',
      };
      const payload = { code, customOptions };

      await deviceCodeActivation.continue(payload);

      expect(mockFormHandler.submitData).toHaveBeenCalledWith({
        code: 'test-code',
        action: FormActions.DEFAULT,
        customParam: 'customValue',
      });
    });

    it('should throw an error if FormHandler.submitData rejects', async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error('Form submission failed'));
      const payload = {
        code: 'test-code',
      };
      await expect(deviceCodeActivation.continue(payload)).rejects.toThrow('Form submission failed');
    });
  });
});
