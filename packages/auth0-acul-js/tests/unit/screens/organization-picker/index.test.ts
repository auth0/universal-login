import { baseContextData } from '../../../data/test-data';
import { FormHandler } from '../../../../src/utils/form-handler';
import { CustomOptions } from 'interfaces/common';
import OrganizationPicker from '../../../../src/screens/organization-picker';

jest.mock('../../../../src/utils/form-handler');

describe('OrganizationPicker', () => {
  let organizationPicker: OrganizationPicker;
  let mockFormHandler: { submitData: jest.Mock };

  beforeEach(() => {
    global.window = Object.create(window);
    window.universal_login_context = baseContextData;
    organizationPicker = new OrganizationPicker();
    mockFormHandler = {
      submitData: jest.fn(),
    };
    (FormHandler as jest.Mock).mockImplementation(() => mockFormHandler);
  });

  describe('selectOrganization method', () => {
    it('should handle selectOrganization with valid payload correctly', async () => {
      const payload = {
        organization: 'org_1234567890123456',
        state: baseContextData.transaction.state
      };
      await organizationPicker.selectOrganization(payload);
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(payload);
    });

    it('should throw error when promise is rejected', async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error('Mocked reject'));
      const payload = {
        organization: 'org_1234567890123456',
        state: baseContextData.transaction.state
      };
      await expect(organizationPicker.selectOrganization(payload)).rejects.toThrow('Mocked reject');
    });
  });

  describe('skipOrganizationSelection method', () => {
    it('should handle skipOrganizationSelection with valid payload correctly', async () => {
      const payload: CustomOptions = {
        someOption: 'value',
      };
      await organizationPicker.skipOrganizationSelection(payload);
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith({
        ...payload,
        organizationSkipped: true,
        state: baseContextData.transaction.state
      });
    });

    it('should handle skipOrganizationSelection without payload correctly', async () => {
      await organizationPicker.skipOrganizationSelection();
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith({
        organizationSkipped: true,
        state: baseContextData.transaction.state
      });
    });

    it('should throw error when promise is rejected', async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error('Mocked reject'));
      const payload: CustomOptions = {
        someOption: 'value',
      };
      await expect(organizationPicker.skipOrganizationSelection(payload)).rejects.toThrow('Mocked reject');
    });
  });
});