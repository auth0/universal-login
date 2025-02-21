import { baseContextData } from '../../../data/test-data';
import { FormHandler } from '../../../../src/utils/form-handler';
import MfaPushList from '../../../../src/screens/mfa-push-list';
import { CustomOptions } from 'interfaces/common';
import { SelectMfaPushDeviceOptions } from 'interfaces/screens/mfa-push-list';

jest.mock('../../../../src/utils/form-handler');

describe('MfaPushList', () => {
  let mfaPushList: MfaPushList;
  let mockFormHandler: { submitData: jest.Mock };

  beforeEach(() => {
    global.window = Object.create(window);
    window.universal_login_context = baseContextData;
    mfaPushList = new MfaPushList();
    mockFormHandler = {
      submitData: jest.fn(),
    };
    (FormHandler as jest.Mock).mockImplementation(() => mockFormHandler);
  });

  describe('selectMfaPushDevice method', () => {
    it('should handle selectMfaPushDevice with valid payload correctly', async () => {
      const payload: SelectMfaPushDeviceOptions = {
        deviceIndex: 0,
      };
      const { deviceIndex, ...restPayload} = payload;
      await mfaPushList.selectMfaPushDevice(payload);
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          ...restPayload,
          action: `selection-action::${ deviceIndex }`,
        })
      );
    });

    it('should throw error when promise is rejected', async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error('Mocked reject'));
      const payload: SelectMfaPushDeviceOptions = {
        deviceIndex: 0,
      };
      await expect(mfaPushList.selectMfaPushDevice(payload)).rejects.toThrow(
        'Mocked reject'
      );
    });
  });

  describe('goBack method', () => {
    it('should handle goBack with valid payload correctly', async () => {
      const payload: CustomOptions = {
        someOption: 'value',
      };
      await mfaPushList.goBack(payload);
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          ...payload,
          action: 'back-action',
        })
      );
    });

    it('should handle goBack without payload correctly', async () => {
      await mfaPushList.goBack();
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'back-action',
        })
      );
    });

    it('should throw error when promise is rejected', async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error('Mocked reject'));
      const payload: CustomOptions = {
        someOption: 'value',
      };
      await expect(mfaPushList.goBack(payload)).rejects.toThrow('Mocked reject');
    });
  });
});
