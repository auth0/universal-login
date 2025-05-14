import { ScreenIds, FormActions } from '../../../../src/constants';
import { BaseContext } from '../../../../src/models/base-context';
import LoginEmailVerification from '../../../../src/screens/login-email-verification';
import { FormHandler } from '../../../../src/utils/form-handler';
import { baseContextData } from '../../../data/test-data';

import type { ContinueWithCodeOptions, ResendCodeOptions } from '../../../../interfaces/screens/login-email-verification';

// Mock FormHandler to spy on its methods and prevent actual form submissions
jest.mock('../../../../src/utils/form-handler');

/**
 * @group unit
 * @group screens
 */
describe('LoginEmailVerification Screen SDK', () => {
  let loginEmailVerification: LoginEmailVerification;
  let mockFormHandlerInstance: { submitData: jest.Mock };
  const testTransactionState = 'login-email-verification-state-123';
  const screenName = ScreenIds.LOGIN_EMAIL_VERIFICATION;
  const endpoint = '/u/login-email-verification';

  beforeEach(() => {
    // Clear all mocks before each test to ensure test isolation
    jest.clearAllMocks();

    // Mock the global window object and the universal_login_context
    global.window = Object.create(window); // Ensure a clean window object
    Object.defineProperty(window, 'universal_login_context', {
      value: {
        ...baseContextData, // Spread base test data
        screen: { // Override screen-specific parts
          ...baseContextData.screen,
          name: screenName, // Set the correct screen name for this test suite
        },
        transaction: { // Override transaction-specific parts
          ...baseContextData.transaction,
          state: testTransactionState, // Use a defined state for predictability
        },
      },
      writable: true, // Make it writable for subsequent tests if needed
    });

    // Reset the static context cache in BaseContext before each test
    // This is crucial if BaseContext caches the context statically.
    (BaseContext as any).context = null;

    // Instantiate the class under test
    loginEmailVerification = new LoginEmailVerification();

    // Setup the mock for FormHandler instance methods
    mockFormHandlerInstance = {
      submitData: jest.fn().mockResolvedValue(undefined), // Default mock to resolve successfully
    };
    // Configure the FormHandler mock constructor to return our mock instance
    (FormHandler as jest.Mock).mockImplementation(() => mockFormHandlerInstance);
  });

  it('should have the correct static screenIdentifier property', () => {
    expect(LoginEmailVerification.screenIdentifier).toBe(screenName);
  });

  it('should correctly initialize and extend BaseContext', () => {
    expect(loginEmailVerification).toBeInstanceOf(LoginEmailVerification);
    expect(loginEmailVerification).toBeInstanceOf(BaseContext); // Verify inheritance
    expect(loginEmailVerification.screen.name).toBe(screenName);
    expect(loginEmailVerification.transaction.state).toBe(testTransactionState);
  });

  describe('continueWithCode method', () => {
    const validPayload: ContinueWithCodeOptions = { code: '123456' };
    const validPayloadWithCustomOptions: ContinueWithCodeOptions = { code: '654321', customField: 'customValue' };

    it('should call FormHandler with correct state, telemetry, route, code, and default action', async () => {
      await loginEmailVerification.continueWithCode(validPayload);

      expect(FormHandler).toHaveBeenCalledWith({
        state: testTransactionState,
        telemetry: [screenName, 'continueWithCode'],
        route: endpoint,
      });
      expect(mockFormHandlerInstance.submitData).toHaveBeenCalledWith({
        code: '123456',
        action: FormActions.DEFAULT,
      });
    });

    it('should include custom options in the payload passed to FormHandler', async () => {
      await loginEmailVerification.continueWithCode(validPayloadWithCustomOptions);

      expect(mockFormHandlerInstance.submitData).toHaveBeenCalledWith({
        code: '654321',
        customField: 'customValue',
        action: FormActions.DEFAULT,
      });
    });

    it('should throw an error if payload is missing', async () => {
      // @ts-expect-error Testing invalid input for missing payload
      await expect(loginEmailVerification.continueWithCode(undefined)).rejects.toThrow(
        'The `code` property in the payload is required and must be a string.'
      );
    });
    
    it('should throw an error if code property is missing in payload', async () => {
      await expect(loginEmailVerification.continueWithCode({} as ContinueWithCodeOptions)).rejects.toThrow(
        'The `code` property in the payload is required and must be a string.'
      );
    });

    it('should throw an error if code is not a string', async () => {
       // @ts-expect-error Testing invalid input for code type
      await expect(loginEmailVerification.continueWithCode({ code: 12345 })).rejects.toThrow(
        'The `code` property in the payload is required and must be a string.'
      );
    });

    it('should propagate errors if FormHandler.submitData rejects', async () => {
      const submissionError = new Error('Network Error during code submission');
      mockFormHandlerInstance.submitData.mockRejectedValue(submissionError);

      await expect(loginEmailVerification.continueWithCode(validPayload)).rejects.toThrow(submissionError);
    });
  });

  describe('resendCode method', () => {
    const customOptionsPayload: ResendCodeOptions = { customField: 'resendCustomValue' };

    it('should call FormHandler with correct state, telemetry, route, and resend-code action', async () => {
      await loginEmailVerification.resendCode();

      expect(FormHandler).toHaveBeenCalledWith({
        state: testTransactionState,
        telemetry: [screenName, 'resendCode'],
        route: endpoint,
      });
      expect(mockFormHandlerInstance.submitData).toHaveBeenCalledWith({
        action: FormActions.RESEND_CODE,
      });
    });

    it('should include custom options in the payload for resendCode if provided', async () => {
      await loginEmailVerification.resendCode(customOptionsPayload);

      expect(mockFormHandlerInstance.submitData).toHaveBeenCalledWith({
        customField: 'resendCustomValue',
        action: FormActions.RESEND_CODE,
      });
    });

    it('should propagate errors if FormHandler.submitData rejects during resendCode', async () => {
      const submissionError = new Error('Network Error during resend request');
      mockFormHandlerInstance.submitData.mockRejectedValue(submissionError);

      await expect(loginEmailVerification.resendCode()).rejects.toThrow(submissionError);
    });
  });
});