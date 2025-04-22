import ResetPasswordMfaPhoneChallenge from '../../../../src/screens/reset-password-mfa-phone-challenge';
import { baseContextData } from '../../../data/test-data';
import { FormHandler } from '../../../../src/utils/form-handler';
import type { ContinueOptions, TryAnotherMethodOptions } from '../../../../interfaces/screens/reset-password-mfa-phone-challenge';
import { FormActions } from '../../../../src/constants';
import { BaseContext } from '../../../../src/models/base-context'; // Import BaseContext

// Mock the FormHandler utility
jest.mock('../../../../src/utils/form-handler');

describe('ResetPasswordMfaPhoneChallenge', () => {
  let screenInstance: ResetPasswordMfaPhoneChallenge;
  let mockFormHandlerInstance: { submitData: jest.Mock }; // Corrected variable name
  const testPhoneNumber = '+1******7890';
  const testState = 'reset-state-xyz-789'; // Define a consistent test state
  const screenName = 'reset-password-mfa-phone-challenge';

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
        phone_number: testPhoneNumber,
      },
    };
    window.universal_login_context = {
      ...baseContextData,
      screen: screenContext,
      // Ensure transaction state is present for FormHandler options
      transaction: { ...baseContextData.transaction, state: testState },
      prompt: { name: 'reset-password' } // Reflecting the reset password flow
    };

    // Instantiate the class under test
    screenInstance = new ResetPasswordMfaPhoneChallenge();

    // Mock the FormHandler instance
    mockFormHandlerInstance = { // Corrected variable name
      submitData: jest.fn().mockResolvedValue(undefined), // Default mock resolution
    };
    (FormHandler as jest.Mock).mockImplementation(() => mockFormHandlerInstance); // Corrected mock usage
  });

  it('should correctly initialize with screen data', () => {
    expect(screenInstance).toBeInstanceOf(ResetPasswordMfaPhoneChallenge);
    expect(screenInstance.screen.name).toBe(screenName);
    expect(screenInstance.screen.data?.phoneNumber).toBe(testPhoneNumber);
    expect(screenInstance.transaction.state).toBe(testState);
    expect(screenInstance.prompt.name).toBe('reset-password'); // Verify correct prompt context
  });

  describe('continue method', () => {
    it('should call FormHandler.submitData with correct payload for SMS', async () => {
      const payload: ContinueOptions = { type: 'sms' };
      await screenInstance.continue(payload);

      expect(mockFormHandlerInstance.submitData).toHaveBeenCalledTimes(1); // Corrected variable name
      expect(mockFormHandlerInstance.submitData).toHaveBeenCalledWith({ // Corrected variable name
        type: 'sms',
        action: FormActions.DEFAULT,
      });

      // Verify FormHandler constructor options
      expect(FormHandler).toHaveBeenCalledWith({
        state: testState,
        telemetry: [screenName, 'continue'],
        route: '/u/mfa-phone-challenge' // Check the route
      });
    });

    it('should call FormHandler.submitData with correct payload for Voice', async () => {
      const payload: ContinueOptions = { type: 'voice' };
      await screenInstance.continue(payload);

      expect(mockFormHandlerInstance.submitData).toHaveBeenCalledTimes(1); // Corrected variable name
      expect(mockFormHandlerInstance.submitData).toHaveBeenCalledWith({ // Corrected variable name
        type: 'voice',
        action: FormActions.DEFAULT,
      });

      // Verify FormHandler constructor options
      expect(FormHandler).toHaveBeenCalledWith({
        state: testState,
        telemetry: [screenName, 'continue'],
        route: '/u/mfa-phone-challenge'
      });
    });

    it('should include custom options in the payload', async () => {
      const payload: ContinueOptions = { type: 'sms', custom: 'value' };
      await screenInstance.continue(payload);

      expect(mockFormHandlerInstance.submitData).toHaveBeenCalledWith({ // Corrected variable name
        type: 'sms',
        action: FormActions.DEFAULT,
        custom: 'value',
      });
    });

    it('should propagate errors from FormHandler', async () => {
      const error = new Error('Form submission failed');
      mockFormHandlerInstance.submitData.mockRejectedValue(error); // Corrected variable name
      const payload: ContinueOptions = { type: 'sms' };

      await expect(screenInstance.continue(payload)).rejects.toThrow(error);
    });
  });

  describe('tryAnotherMethod method', () => {
    it('should call FormHandler.submitData with correct action and type (sms)', async () => {
        const payload: TryAnotherMethodOptions = { type: 'sms' };
        await screenInstance.tryAnotherMethod(payload);

        expect(mockFormHandlerInstance.submitData).toHaveBeenCalledTimes(1); // Corrected variable name
        expect(mockFormHandlerInstance.submitData).toHaveBeenCalledWith({ // Corrected variable name
            type: 'sms',
            action: FormActions.PICK_AUTHENTICATOR,
        });

        // Verify FormHandler constructor options
        expect(FormHandler).toHaveBeenCalledWith({
            state: testState,
            telemetry: [screenName, 'tryAnotherMethod'],
            route: '/u/mfa-phone-challenge'
        });
    });

    it('should call FormHandler.submitData with correct action and type (voice)', async () => {
      const payload: TryAnotherMethodOptions = { type: 'voice' };
      await screenInstance.tryAnotherMethod(payload);

      expect(mockFormHandlerInstance.submitData).toHaveBeenCalledTimes(1); // Corrected variable name
      expect(mockFormHandlerInstance.submitData).toHaveBeenCalledWith({ // Corrected variable name
          type: 'voice',
          action: FormActions.PICK_AUTHENTICATOR,
      });

      // Verify FormHandler constructor options
      expect(FormHandler).toHaveBeenCalledWith({
          state: testState,
          telemetry: [screenName, 'tryAnotherMethod'],
          route: '/u/mfa-phone-challenge'
      });
  });

    it('should include custom options in the payload', async () => {
      const payload: TryAnotherMethodOptions = { type: 'sms', custom: 'value' };
      await screenInstance.tryAnotherMethod(payload);

      expect(mockFormHandlerInstance.submitData).toHaveBeenCalledWith({ // Corrected variable name
        type: 'sms',
        action: FormActions.PICK_AUTHENTICATOR,
        custom: 'value',
      });
    });

    it('should propagate errors from FormHandler', async () => {
      const error = new Error('Form submission failed');
      mockFormHandlerInstance.submitData.mockRejectedValue(error); // Corrected variable name
      const payload: TryAnotherMethodOptions = { type: 'voice' };


      await expect(screenInstance.tryAnotherMethod(payload)).rejects.toThrow(error);
    });
  });
});