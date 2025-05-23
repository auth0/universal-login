import { FormActions } from '../../../../src/constants';
import { BaseContext } from '../../../../src/models/base-context';
import MfaRecoveryCodeChallengeNewCode from '../../../../src/screens/mfa-recovery-code-challenge-new-code';
import { FormHandler } from '../../../../src/utils/form-handler';
import { baseContextData } from '../../../data/test-data';

import type { ContinueOptions } from '../../../../interfaces/screens/mfa-recovery-code-challenge-new-code';

// Mock the FormHandler utility
jest.mock('../../../../src/utils/form-handler');

describe('MfaRecoveryCodeChallengeNewCode', () => {
  let screenInstance: MfaRecoveryCodeChallengeNewCode;
  let mockFormHandlerInstance: { submitData: jest.Mock };
  const screenName = 'mfa-recovery-code-challenge-new-code';
  const testState = 'state-mfa-rc-new-code-123';
  const testTextCode = 'ABCD-EFGH-IJKL-MNOP';

  beforeEach(() => {
    // Reset mocks and setup base context before each test
    jest.clearAllMocks();
    global.window = Object.create(window);
    // Reset the static context cache in BaseContext
    (BaseContext as any).context = null;

    // Set up the context for this specific screen
    const screenContext = {
      name: screenName,
      data: {
        text_code: testTextCode,
      },
    };
    window.universal_login_context = {
      ...baseContextData,
      screen: screenContext,
      transaction: { ...baseContextData.transaction, state: testState },
      prompt: { name: 'mfa' }, // Example prompt
    };

    // Instantiate the class under test
    screenInstance = new MfaRecoveryCodeChallengeNewCode();

    // Mock the FormHandler instance
    mockFormHandlerInstance = {
      submitData: jest.fn().mockResolvedValue(undefined), // Default mock resolution
    };
    (FormHandler as jest.Mock).mockImplementation(() => mockFormHandlerInstance);
  });

  it('should correctly initialize with screen data', () => {
    expect(screenInstance).toBeInstanceOf(MfaRecoveryCodeChallengeNewCode);
    expect(screenInstance.screen.name).toBe(screenName);
    expect(screenInstance.screen.data?.textCode).toBe(testTextCode);
    expect(screenInstance.transaction.state).toBe(testState);
  });

  describe('continue method', () => {
    it('should call FormHandler.submitData with correct payload (no custom options)', async () => {
      await screenInstance.continue();

      // Verify FormHandler constructor options
      expect(FormHandler).toHaveBeenCalledWith({
        state: testState,
        telemetry: [screenName, 'continue']
      });

      // Verify submitData payload
      expect(mockFormHandlerInstance.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandlerInstance.submitData).toHaveBeenCalledWith({
        action: FormActions.DEFAULT,
        saved: 'on', // Explicitly check for the 'saved' parameter
      });
    });

    it('should call FormHandler.submitData with correct payload including custom options', async () => {
      const payload: ContinueOptions = { custom: 'value123' };
      await screenInstance.continue(payload);

      // Verify FormHandler constructor options
      expect(FormHandler).toHaveBeenCalledWith({
        state: testState,
        telemetry: [screenName, 'continue']
      });

      // Verify submitData payload
      expect(mockFormHandlerInstance.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandlerInstance.submitData).toHaveBeenCalledWith({
        custom: 'value123',
        action: FormActions.DEFAULT,
        saved: 'on',
      });
    });

    it('should propagate errors from FormHandler', async () => {
      const error = new Error('Form submission failed');
      mockFormHandlerInstance.submitData.mockRejectedValue(error);
      const payload: ContinueOptions = {}; // Empty payload
      await expect(screenInstance.continue(payload)).rejects.toThrow(error);
    });
  });
});