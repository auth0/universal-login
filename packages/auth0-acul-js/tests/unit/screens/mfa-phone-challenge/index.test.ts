/**
 * @file Unit tests for the MfaPhoneChallenge screen class.
 */

import MfaPhoneChallenge from '../../../../src/screens/mfa-phone-challenge';
import { baseContextData } from '../../../data/test-data';
import { FormHandler } from '../../../../src/utils/form-handler';
import type { ContinueOptions, PickPhoneOptions, PickAuthenticatorOptions } from '../../../../interfaces/screens/mfa-phone-challenge';
import { ScreenIds, FormActions } from '../../../../src/constants';
import { BaseContext } from '../../../../src/models/base-context'; // Import BaseContext

// Mock the FormHandler utility
jest.mock('../../../../src/utils/form-handler');

describe('MfaPhoneChallenge', () => {
  let mfaPhoneChallenge: MfaPhoneChallenge;
  let mockFormHandlerInstance: { submitData: jest.Mock };
  const testPhoneNumber = '+1234567890';
  const testState = 'state-abc-123'; // Define a consistent test state

  beforeEach(() => {
    // Reset mocks and setup base context before each test
    jest.clearAllMocks();
    global.window = Object.create(window);

    // *** IMPORTANT: Reset the static context cache in BaseContext before each test ***
    (BaseContext as any).context = null; // Accessing private static member for test setup

    // Set up the context for this specific screen
    const screenContext = {
      name: ScreenIds.MFA_PHONE_CHALLENGE, // Use ScreenIds constant
      data: {
        phone_number: testPhoneNumber,
      },
    };
    window.universal_login_context = {
      ...baseContextData,
      screen: screenContext,
      // Ensure transaction state is present for FormHandler options
      transaction: { ...baseContextData.transaction, state: testState },
    };

    // Instantiate the class under test
    mfaPhoneChallenge = new MfaPhoneChallenge();

    // Mock the FormHandler instance
    mockFormHandlerInstance = {
      submitData: jest.fn().mockResolvedValue(undefined), // Default mock resolution
    };
    (FormHandler as jest.Mock).mockImplementation(() => mockFormHandlerInstance);
  });

  it('should correctly initialize with screen data', () => {
    expect(mfaPhoneChallenge).toBeInstanceOf(MfaPhoneChallenge);
    expect(mfaPhoneChallenge.screen.name).toBe(ScreenIds.MFA_PHONE_CHALLENGE);
    expect(mfaPhoneChallenge.screen.data?.phoneNumber).toBe(testPhoneNumber);
    expect(mfaPhoneChallenge.transaction.state).toBe(testState);
  });

  describe('continue method', () => {
    it('should call FormHandler.submitData with correct payload for SMS', async () => {
      const payload: ContinueOptions = { type: 'sms' };
      await mfaPhoneChallenge.continue(payload);

      expect(mockFormHandlerInstance.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandlerInstance.submitData).toHaveBeenCalledWith({
        type: 'sms',
        action: FormActions.DEFAULT,
      });
      // Verify FormHandler constructor options
      expect(FormHandler).toHaveBeenCalledWith({
        state: testState,
        telemetry: [ScreenIds.MFA_PHONE_CHALLENGE, 'continue'],
      });
    });

    it('should call FormHandler.submitData with correct payload for Voice', async () => {
      const payload: ContinueOptions = { type: 'voice' };
      await mfaPhoneChallenge.continue(payload);

      expect(mockFormHandlerInstance.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandlerInstance.submitData).toHaveBeenCalledWith({
        type: 'voice',
        action: FormActions.DEFAULT,
      });
       // Verify FormHandler constructor options
      expect(FormHandler).toHaveBeenCalledWith({
        state: testState,
        telemetry: [ScreenIds.MFA_PHONE_CHALLENGE, 'continue'],
      });
    });

    it('should include custom options in the payload', async () => {
      const payload: ContinueOptions = { type: 'sms', custom: 'value' };
      await mfaPhoneChallenge.continue(payload);

      expect(mockFormHandlerInstance.submitData).toHaveBeenCalledWith({
        type: 'sms',
        action: FormActions.DEFAULT,
        custom: 'value',
      });
    });

    it('should propagate errors from FormHandler', async () => {
      const error = new Error('Form submission failed');
      mockFormHandlerInstance.submitData.mockRejectedValue(error);
      const payload: ContinueOptions = { type: 'sms' };

      await expect(mfaPhoneChallenge.continue(payload)).rejects.toThrow(error);
    });
  });

  describe('pickPhone method', () => {
    it('should call FormHandler.submitData with correct action', async () => {
      await mfaPhoneChallenge.pickPhone();

      expect(mockFormHandlerInstance.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandlerInstance.submitData).toHaveBeenCalledWith({
        action: 'pick-phone',
      });
      // Verify FormHandler constructor options
      expect(FormHandler).toHaveBeenCalledWith({
        state: testState,
        telemetry: [ScreenIds.MFA_PHONE_CHALLENGE, 'pickPhone'],
      });
    });

    it('should include custom options in the payload', async () => {
      const payload: PickPhoneOptions = { custom: 'value' };
      await mfaPhoneChallenge.pickPhone(payload);

      expect(mockFormHandlerInstance.submitData).toHaveBeenCalledWith({
        action: 'pick-phone',
        custom: 'value',
      });
    });

    it('should propagate errors from FormHandler', async () => {
      const error = new Error('Form submission failed');
      mockFormHandlerInstance.submitData.mockRejectedValue(error);

      await expect(mfaPhoneChallenge.pickPhone()).rejects.toThrow(error);
    });
  });

  describe('tryAnotherMethod method', () => {
    it('should call FormHandler.submitData with correct action', async () => {
      await mfaPhoneChallenge.tryAnotherMethod();

      expect(mockFormHandlerInstance.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandlerInstance.submitData).toHaveBeenCalledWith({
        action: FormActions.PICK_AUTHENTICATOR,
      });
      // Verify FormHandler constructor options
      expect(FormHandler).toHaveBeenCalledWith({
        state: testState,
        telemetry: [ScreenIds.MFA_PHONE_CHALLENGE, 'tryAnotherMethod'],
      });
    });

    it('should include custom options in the payload', async () => {
      const payload: PickAuthenticatorOptions = { custom: 'value' };
      await mfaPhoneChallenge.tryAnotherMethod(payload);

      expect(mockFormHandlerInstance.submitData).toHaveBeenCalledWith({
        action: FormActions.PICK_AUTHENTICATOR,
        custom: 'value',
      });
    });

    it('should propagate errors from FormHandler', async () => {
      const error = new Error('Form submission failed');
      mockFormHandlerInstance.submitData.mockRejectedValue(error);

      await expect(mfaPhoneChallenge.tryAnotherMethod()).rejects.toThrow(error);
    });
  });
});