import { BaseContext } from '../../../../src/models/base-context';
import type { ScreenContext } from '../../../../interfaces/models/screen';
import BruteForceProtectionUnblock from '../../../../src/screens/brute-force-protection-unblock';
import { FormHandler } from '../../../../src/utils/form-handler';

jest.mock('../../../../src/utils/form-handler', () => ({
  FormHandler: jest.fn(),
}));

describe('BruteForceProtectionUnblock', () => {
  let bruteForceProtectionUnblock: BruteForceProtectionUnblock;
  let mockFormHandler: { submitData: jest.Mock };
  let screenContext: ScreenContext;

  beforeEach(() => {
    // Set up mock global window context
    global.window = Object.create(window);
    window.universal_login_context = {
      client: {},
      prompt: {},
      screen: {},
      transaction: { state: 'testState' },
      user: {},
    } as any;

    screenContext = {
      transaction: {
        state: 'testState',
      },
    } as unknown as ScreenContext;

    // Initialize instance of the actual class
    bruteForceProtectionUnblock = new BruteForceProtectionUnblock();

    // Setup mock FormHandler
    mockFormHandler = {
      submitData: jest.fn(),
    };
    (FormHandler as jest.Mock).mockImplementation(() => mockFormHandler);

    jest
      .spyOn(bruteForceProtectionUnblock as any, 'getContext')
      .mockReturnValue(screenContext);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('unblockAccount method', () => {
    it('should call submitData with the correct parameters', async () => {
      await bruteForceProtectionUnblock.unblockAccount({ customParam: 'customValue' });

      expect(mockFormHandler.submitData).toHaveBeenCalledWith({
        customParam: 'customValue',
        action: 'default',
      });
    });

    it('should handle errors during form submission', async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error('Submission failed'));

      await expect(bruteForceProtectionUnblock.unblockAccount()).rejects.toThrow('Submission failed');
    });
  });
});
