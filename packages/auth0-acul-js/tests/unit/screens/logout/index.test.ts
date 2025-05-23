import { ScreenIds } from '../../../../src/constants';
import Logout from '../../../../src/screens/logout';
import { FormHandler } from '../../../../src/utils/form-handler';
import { baseContextData } from '../../../data/test-data';

import type { ConfirmLogoutOptions } from 'interfaces/screens/logout';

jest.mock('../../../../src/utils/form-handler');

describe('Logout', () => {
  let logout: Logout;
  let mockFormHandler: { submitData: jest.Mock };

  beforeEach(() => {
    // Set up the global context exactly as BaseContext expects it
    global.window = Object.create(window);
    baseContextData.screen.name = ScreenIds.LOGOUT;
    window.universal_login_context = baseContextData;

    // Instantiate the screen
    logout = new Logout();

    // Reset mocks
    jest.clearAllMocks();
    mockFormHandler = { submitData: jest.fn() };
    (FormHandler as jest.Mock).mockImplementation(() => mockFormHandler);
  });

  describe('confirmLogout method', () => {
    it('should submit logout with accept action correctly', async () => {
      const payload: ConfirmLogoutOptions = { action: 'accept' };
      await logout.confirmLogout(payload);

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith({
        action: 'accept',
      });
    });

    it('should submit logout with deny action correctly', async () => {
      const payload: ConfirmLogoutOptions = { action: 'deny' };
      await logout.confirmLogout(payload);

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith({
        action: 'deny',
      });
    });

    it('should throw if FormHandler.submitData rejects', async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error('Mocked error'));
      const payload: ConfirmLogoutOptions = { action: 'accept' };

      await expect(logout.confirmLogout(payload)).rejects.toThrow('Mocked error');
    });
  });
});
