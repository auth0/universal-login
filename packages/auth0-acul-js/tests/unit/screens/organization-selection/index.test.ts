import { FormActions, ScreenIds } from '../../../../src/constants';
import OrganizationSelection from '../../../../src/screens/organization-selection';
import { FormHandler } from '../../../../src/utils/form-handler';
import { baseContextData } from '../../../data/test-data';

import type { CustomOptions } from 'interfaces/common';

jest.mock('../../../../src/utils/form-handler');

describe('OrganizationSelection', () => {
  let organizationSelection: OrganizationSelection;
  let mockFormHandler: { submitData: jest.Mock };

  beforeEach(() => {
    global.window = Object.create(window);
    window.universal_login_context = {
      ...baseContextData,
      screen: {
        ...baseContextData.screen,
        name: 'organization-selection',
      }
    };
    organizationSelection = new OrganizationSelection();
    mockFormHandler = {
      submitData: jest.fn(),
    };
    (FormHandler as jest.Mock).mockImplementation(() => mockFormHandler);
  });

  it('should have the correct screenIdentifier', () => {
    expect(OrganizationSelection.screenIdentifier).toBe(ScreenIds.ORGANIZATION_SELECTION);
  });

  describe('continueWithOrganizationName method', () => {
    it('should handle continueWithOrganizationName with valid payload correctly', async () => {
      const payload = {
        organizationName: 'testOrganizationName',
      };
      await organizationSelection.continueWithOrganizationName(payload);
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith({
        ...payload,
        action: FormActions.DEFAULT,
      });
    });

    it('should throw error when promise is rejected', async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error('Mocked reject'));
      const payload = {
        organizationName: 'testOrganizationName',
      };
      await expect(organizationSelection.continueWithOrganizationName(payload)).rejects.toThrow('Mocked reject');
    });
  });

  describe('skipOrganizationSelection method', () => {
    it('should handle skipOrganizationSelection with valid payload correctly', async () => {
      const payload: CustomOptions = {
        someOption: 'value',
      };
      await organizationSelection.skipOrganizationSelection(payload);
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith({
        ...payload,
        organizationSkipped: true,
        action: FormActions.DEFAULT,
      });
    });

    it('should handle skipOrganizationSelection without payload correctly', async () => {
      await organizationSelection.skipOrganizationSelection();
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith({
        organizationSkipped: true,
        action: FormActions.DEFAULT,
      });
    });

    it('should throw error when promise is rejected', async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error('Mocked reject'));
      const payload: CustomOptions = {
        someOption: 'value',
      };
      await expect(organizationSelection.skipOrganizationSelection(payload)).rejects.toThrow('Mocked reject');
    });
  });
});
