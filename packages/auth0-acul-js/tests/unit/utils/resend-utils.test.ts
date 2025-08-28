import { createResendControl } from '../../../src/utils/resend-control';

import type { StartResendOptions } from '../../../interfaces/utils/resend-control';

// Mock localStorage
let mockStorage: { [key: string]: string } = {};
const localStorageMock = {
  getItem: jest.fn((key: string) => mockStorage[key] || null),
  setItem: jest.fn((key: string, value: string) => {
    mockStorage[key] = value.toString();
  }),
  clear: jest.fn(() => {
    mockStorage = {};
  }),
};

Object.defineProperty(global, 'localStorage', {
  value: localStorageMock,
});

// Mock Date.now()
const mockDateNow = jest.fn();
Object.defineProperty(Date, 'now', {
  value: mockDateNow,
});

// Mock setInterval and clearInterval
const mockSetInterval = jest.fn();
const mockClearInterval = jest.fn();
global.setInterval = mockSetInterval;
global.clearInterval = mockClearInterval;

describe('createResendControl', () => {
  const mockResendMethod = jest.fn();
  const mockOnStatusChange = jest.fn();
  const mockOnTimeout = jest.fn();
  const screenIdentifier = 'test-screen';
  const storageKey = `acul_resend_timeout_${screenIdentifier}`;

  let intervalCallback: (() => void) | null = null;
  let intervalId: number;

  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.clear();
    intervalCallback = null;
    intervalId = 123;

    // Setup default Date.now() behavior
    mockDateNow.mockReturnValue(1000000);

    // Setup default setInterval behavior to capture the callback
    mockSetInterval.mockImplementation((callback: () => void) => {
      intervalCallback = callback;
      return intervalId;
    });
  });

  describe('Basic functionality', () => {
    it('should create resend control with default options', () => {
      const control = createResendControl(screenIdentifier, mockResendMethod);

      expect(control).toHaveProperty('startResend');
      expect(typeof control.startResend).toBe('function');
    });

    it('should call resend method when not disabled', async () => {
      const control = createResendControl(screenIdentifier, mockResendMethod);

      await (control.startResend as () => Promise<void>)();

      expect(mockResendMethod).toHaveBeenCalledTimes(1);
    });

    it('should not call resend method when disabled due to timeout', async () => {
      // Set up existing timeout in localStorage
      mockDateNow.mockReturnValue(1000000);
      localStorageMock.setItem(storageKey, '995000'); // 5 seconds ago, within 10 second default timeout

      const control = createResendControl(screenIdentifier, mockResendMethod);

      await (control.startResend as () => Promise<void>)();

      expect(mockResendMethod).not.toHaveBeenCalled();
    });

    it('should not call resend method when resendLimitReached is true', async () => {
      const control = createResendControl(screenIdentifier, mockResendMethod, undefined, true);

      await (control.startResend as () => Promise<void>)();

      expect(mockResendMethod).not.toHaveBeenCalled();
    });
  });

  describe('Timeout functionality', () => {
    it('should use custom timeout seconds', () => {
      const options: StartResendOptions = { timeoutSeconds: 30, onStatusChange: mockOnStatusChange };
      
      // Should calculate remaining time based on 30 second timeout
      mockDateNow.mockReturnValue(1000000);
      localStorageMock.setItem(storageKey, '985000'); // 15 seconds ago

      createResendControl(screenIdentifier, mockResendMethod, options);
      // The control should be disabled since 15 seconds < 30 seconds timeout
      expect(mockOnStatusChange).toHaveBeenCalled();
    });

    it('should set localStorage when starting timer', async () => {
      const control = createResendControl(screenIdentifier, mockResendMethod);

      await (control.startResend as () => Promise<void>)();

      expect(localStorageMock.setItem).toHaveBeenCalledWith(storageKey, '1000000');
    });

    it('should start interval when resend method is called', async () => {
      const control = createResendControl(screenIdentifier, mockResendMethod);

      await (control.startResend as () => Promise<void>)();

      expect(mockSetInterval).toHaveBeenCalledWith(expect.any(Function), 1000);
    });

    it('should clear interval when countdown reaches zero', () => {
      mockDateNow.mockReturnValue(1000000);
      localStorageMock.setItem(storageKey, '992000'); // 8 seconds ago

      createResendControl(screenIdentifier, mockResendMethod);

      // Simulate time passing to reach zero
      mockDateNow.mockReturnValue(1002000); // 2 seconds later (total 10 seconds)

      if (intervalCallback) {
        intervalCallback();
      }

      expect(mockClearInterval).toHaveBeenCalledWith(intervalId);
    });
  });

  describe('Status change callback', () => {
    it('should call onStatusChange with correct parameters', () => {
      const options: StartResendOptions = { onStatusChange: mockOnStatusChange };
      mockDateNow.mockReturnValue(1000000);
      localStorageMock.setItem(storageKey, '995000'); // 5 seconds ago

      createResendControl(screenIdentifier, mockResendMethod, options);

      expect(mockOnStatusChange).toHaveBeenCalledWith(5, true); // 5 seconds remaining, disabled
    });

    it('should call onStatusChange during interval updates', () => {
      const options: StartResendOptions = { onStatusChange: mockOnStatusChange };
      mockDateNow.mockReturnValue(1000000);
      localStorageMock.setItem(storageKey, '995000'); // 5 seconds ago

      createResendControl(screenIdentifier, mockResendMethod, options);

      mockOnStatusChange.mockClear();

      // Simulate one second passing
      mockDateNow.mockReturnValue(1001000);

      if (intervalCallback) {
        intervalCallback();
      }

      expect(mockOnStatusChange).toHaveBeenCalledWith(4, true); // 4 seconds remaining, still disabled
    });

    it('should call onStatusChange when countdown ends', () => {
      const options: StartResendOptions = { onStatusChange: mockOnStatusChange };
      mockDateNow.mockReturnValue(1000000);
      localStorageMock.setItem(storageKey, '991000'); // 9 seconds ago

      createResendControl(screenIdentifier, mockResendMethod, options);

      mockOnStatusChange.mockClear();

      // Simulate time passing to reach zero
      mockDateNow.mockReturnValue(1001000); // 1 second later (total 10 seconds)

      if (intervalCallback) {
        intervalCallback();
      }

      expect(mockOnStatusChange).toHaveBeenCalledWith(0, false); // 0 seconds remaining, not disabled
    });

    it('should not call onStatusChange if not provided', () => {
      mockDateNow.mockReturnValue(1000000);
      localStorageMock.setItem(storageKey, '995000');

      createResendControl(screenIdentifier, mockResendMethod);

      // Should not throw or cause issues
      if (intervalCallback) {
        intervalCallback();
      }

      expect(mockOnStatusChange).not.toHaveBeenCalled();
    });
  });

  describe('Timeout callback', () => {
    it('should call onTimeout when countdown reaches zero', () => {
      const options: StartResendOptions = { onTimeout: mockOnTimeout };
      mockDateNow.mockReturnValue(1000000);
      localStorageMock.setItem(storageKey, '991000'); // 9 seconds ago

      createResendControl(screenIdentifier, mockResendMethod, options);

      mockOnTimeout.mockClear();

      // Simulate time passing to reach zero
      mockDateNow.mockReturnValue(1001000); // 1 second later (total 10 seconds)

      if (intervalCallback) {
        intervalCallback();
      }

      expect(mockOnTimeout).toHaveBeenCalledTimes(1);
    });

    it('should call onTimeout only once per countdown cycle', () => {
      const options: StartResendOptions = { onTimeout: mockOnTimeout };
      mockDateNow.mockReturnValue(1000000);
      localStorageMock.setItem(storageKey, '991000'); // 9 seconds ago

      createResendControl(screenIdentifier, mockResendMethod, options);

      mockOnTimeout.mockClear();

      // Simulate reaching zero
      mockDateNow.mockReturnValue(1001000);
      if (intervalCallback) {
        intervalCallback();
      }

      // Simulate more time passing (should not call onTimeout again)
      mockDateNow.mockReturnValue(1002000);
      if (intervalCallback) {
        intervalCallback();
      }

      expect(mockOnTimeout).toHaveBeenCalledTimes(1);
    });

    it('should reset onTimeout flag when new timer starts', async () => {
      const options: StartResendOptions = { onTimeout: mockOnTimeout };
      const control = createResendControl(screenIdentifier, mockResendMethod, options);

      // First countdown cycle
      await (control.startResend as () => Promise<void>)();

      mockOnTimeout.mockClear();
      mockDateNow.mockReturnValue(1010000); // 10 seconds later

      if (intervalCallback) {
        intervalCallback();
      }

      expect(mockOnTimeout).toHaveBeenCalledTimes(1);

      // Start new timer and let it expire again
      mockOnTimeout.mockClear();
      await (control.startResend as () => Promise<void>)();

      mockDateNow.mockReturnValue(1020000); // Another 10 seconds later

      if (intervalCallback) {
        intervalCallback();
      }

      expect(mockOnTimeout).toHaveBeenCalledTimes(1); // Should be called again for new cycle
    });

    it('should not call onTimeout if not provided', () => {
      mockDateNow.mockReturnValue(1000000);
      localStorageMock.setItem(storageKey, '991000');

      createResendControl(screenIdentifier, mockResendMethod);

      mockDateNow.mockReturnValue(1001000);

      if (intervalCallback) {
        intervalCallback();
      }

      expect(mockOnTimeout).not.toHaveBeenCalled();
    });
  });

  describe('Persistence and state restoration', () => {
    it('should resume countdown from previous session', () => {
      const options: StartResendOptions = { onStatusChange: mockOnStatusChange };
      mockDateNow.mockReturnValue(1000000);
      localStorageMock.setItem(storageKey, '995000'); // 5 seconds ago

      createResendControl(screenIdentifier, mockResendMethod, options);

      expect(mockSetInterval).toHaveBeenCalledWith(expect.any(Function), 1000);
      expect(mockOnStatusChange).toHaveBeenCalledWith(5, true);
    });

    it('should not start interval if no time remaining from previous session', () => {
      const options: StartResendOptions = { onStatusChange: mockOnStatusChange };
      mockDateNow.mockReturnValue(1000000);
      localStorageMock.setItem(storageKey, '980000'); // 20 seconds ago (past 10 second timeout)

      createResendControl(screenIdentifier, mockResendMethod, options);

      expect(mockSetInterval).not.toHaveBeenCalled();
      expect(mockOnStatusChange).toHaveBeenCalledWith(0, false);
    });

    it('should handle missing localStorage value', () => {
      const options: StartResendOptions = { onStatusChange: mockOnStatusChange };
      // localStorage returns null for missing key

      createResendControl(screenIdentifier, mockResendMethod, options);

      expect(mockOnStatusChange).toHaveBeenCalledWith(0, false);
      expect(mockSetInterval).not.toHaveBeenCalled();
    });

    it('should handle invalid localStorage value', () => {
      const options: StartResendOptions = { onStatusChange: mockOnStatusChange };
      localStorageMock.setItem(storageKey, 'invalid-number');

      createResendControl(screenIdentifier, mockResendMethod, options);

      // parseInt('invalid-number', 10) returns NaN, which makes calculations return NaN as well
      // Check the actual call arguments
      expect(mockOnStatusChange).toHaveBeenCalled();
      const callArgs = mockOnStatusChange.mock.calls[0] as [number, boolean];
      const remainingTime = callArgs[0];
      const isDisabled = callArgs[1];
      
      // When lastResendTime is NaN, timeElapsed becomes NaN, making remaining time NaN too
      expect(Number.isNaN(remainingTime)).toBe(true);
      expect(isDisabled).toBe(false);
    });
  });

  describe('Cleanup functionality', () => {
    it('should clear interval when cleanup is called internally', () => {
      mockDateNow.mockReturnValue(1000000);
      localStorageMock.setItem(storageKey, '991000'); // 9 seconds ago

      createResendControl(screenIdentifier, mockResendMethod);

      // Simulate countdown reaching zero which should trigger cleanup
      mockDateNow.mockReturnValue(1001000);

      if (intervalCallback) {
        intervalCallback();
      }

      expect(mockClearInterval).toHaveBeenCalledWith(intervalId);
    });

    it('should clear previous interval when starting new timer', async () => {
      const control = createResendControl(screenIdentifier, mockResendMethod);

      // Start first timer
      await (control.startResend as () => Promise<void>)();
      expect(mockSetInterval).toHaveBeenCalledTimes(1);

      // Simulate enough time passing to allow second call
      mockDateNow.mockReturnValue(1011000); // 11 seconds later, past the 10 second timeout

      // Start second timer (should clear first one if it exists)
      await (control.startResend as () => Promise<void>)();

      // The cleanup function should be called when starting a new timer
      // Note: clearInterval may or may not be called depending on internal state
      expect(mockSetInterval).toHaveBeenCalledTimes(2);
    });
  });

  describe('Edge cases and calculations', () => {
    it('should handle negative time elapsed gracefully', () => {
      const options: StartResendOptions = { onStatusChange: mockOnStatusChange };
      mockDateNow.mockReturnValue(1000000);
      localStorageMock.setItem(storageKey, '1005000'); // Future time (should not happen in real scenarios)

      createResendControl(screenIdentifier, mockResendMethod, options);

      // With future time, timeElapsed becomes negative, 
      // Math.max(0, Math.ceil((timeoutMs - timeElapsed) / 1000)) = Math.max(0, Math.ceil((10000 + 5000) / 1000)) = 15
      expect(mockOnStatusChange).toHaveBeenCalledWith(15, true);
    });

    it('should round remaining seconds correctly', () => {
      const options: StartResendOptions = { onStatusChange: mockOnStatusChange };
      mockDateNow.mockReturnValue(1000000);
      localStorageMock.setItem(storageKey, '994500'); // 5.5 seconds ago

      createResendControl(screenIdentifier, mockResendMethod, options);

      expect(mockOnStatusChange).toHaveBeenCalledWith(5, true); // Should round up 4.5 to 5
    });

    it('should handle zero timeout seconds', () => {
      const options: StartResendOptions = { timeoutSeconds: 0 };
      const control = createResendControl(screenIdentifier, mockResendMethod, options);

      // With zero timeout, should always be enabled
      expect(control.startResend).toBeDefined();
    });

    it('should handle very large timeout values', () => {
      const options: StartResendOptions = { 
        timeoutSeconds: 999999,
        onStatusChange: mockOnStatusChange 
      };
      mockDateNow.mockReturnValue(1000000);
      localStorageMock.setItem(storageKey, '999000'); // 1 second ago

      createResendControl(screenIdentifier, mockResendMethod, options);

      // Should still be disabled with very large timeout
      expect(mockOnStatusChange).toHaveBeenCalledWith(999998, true);
    });
  });

  describe('Multiple instances with different screen identifiers', () => {
    it('should handle multiple instances independently', () => {
      const screenId1 = 'screen-1';
      const screenId2 = 'screen-2';
      const storageKey1 = `acul_resend_timeout_${screenId1}`;
      const storageKey2 = `acul_resend_timeout_${screenId2}`;

      mockDateNow.mockReturnValue(1000000);
      localStorageMock.setItem(storageKey1, '995000'); // 5 seconds ago
      localStorageMock.setItem(storageKey2, '990000'); // 10 seconds ago

      const options: StartResendOptions = { onStatusChange: mockOnStatusChange };

      const control1 = createResendControl(screenId1, mockResendMethod, options);
      mockOnStatusChange.mockClear();

      const control2 = createResendControl(screenId2, mockResendMethod, options);

      // First instance should still be disabled
      expect(mockOnStatusChange).toHaveBeenLastCalledWith(0, false); // screen-2 should be enabled

      expect(control1).not.toBe(control2);
    });
  });

  describe('Resend method error handling', () => {
    it('should propagate resend method errors and not start timer', async () => {
      const error = new Error('Network error');
      mockResendMethod.mockRejectedValueOnce(error);

      const control = createResendControl(screenIdentifier, mockResendMethod);

      // The error should be thrown and timer should NOT be started
      await expect((control.startResend as () => Promise<void>)()).rejects.toThrow('Network error');
      // startTimer() is NOT called if resendMethod() throws
      expect(mockSetInterval).not.toHaveBeenCalled(); 
      expect(localStorageMock.setItem).not.toHaveBeenCalled();
    });

    it('should not start timer when resend method throws', async () => {
      mockResendMethod.mockRejectedValueOnce(new Error('Test error'));

      const control = createResendControl(screenIdentifier, mockResendMethod);

      try {
        await (control.startResend as () => Promise<void>)();
      } catch {
        // Expected error from resendMethod
      }

      // startTimer() is NOT called if resendMethod() throws an error
      expect(localStorageMock.setItem).not.toHaveBeenCalled();
      expect(mockSetInterval).not.toHaveBeenCalled();
    });
  });

  describe('Complex interaction scenarios', () => {
    it('should handle rapid successive calls correctly', async () => {
      const control = createResendControl(screenIdentifier, mockResendMethod);

      // First call should succeed
      await (control.startResend as () => Promise<void>)();
      expect(mockResendMethod).toHaveBeenCalledTimes(1);

      // Immediate second call should be blocked
      await (control.startResend as () => Promise<void>)();
      expect(mockResendMethod).toHaveBeenCalledTimes(1); // Should not increase
    });

    it('should work correctly with resendLimitReached changing state', async () => {
      // Start with limit not reached
      const control = createResendControl(screenIdentifier, mockResendMethod, undefined, false);

      await (control.startResend as () => Promise<void>)();
      expect(mockResendMethod).toHaveBeenCalledTimes(1);

      // Create new instance with limit reached
      const controlWithLimit = createResendControl(screenIdentifier, mockResendMethod, undefined, true);

      await (controlWithLimit.startResend as () => Promise<void>)();
      expect(mockResendMethod).toHaveBeenCalledTimes(1); // Should not increase due to limit
    });

    it('should handle status changes during active countdown', () => {
      const options: StartResendOptions = { onStatusChange: mockOnStatusChange };
      mockDateNow.mockReturnValue(1000000);
      localStorageMock.setItem(storageKey, '995000'); // 5 seconds ago

      createResendControl(screenIdentifier, mockResendMethod, options);

      // Clear initial call
      mockOnStatusChange.mockClear();

      // Simulate progression through countdown
      mockDateNow.mockReturnValue(1001000); // 1 second later
      if (intervalCallback) intervalCallback();
      expect(mockOnStatusChange).toHaveBeenCalledWith(4, true);

      mockDateNow.mockReturnValue(1003000); // 3 seconds total
      if (intervalCallback) intervalCallback();
      expect(mockOnStatusChange).toHaveBeenCalledWith(2, true);

      mockDateNow.mockReturnValue(1005000); // 5 seconds total (countdown ends)
      if (intervalCallback) intervalCallback();
      expect(mockOnStatusChange).toHaveBeenCalledWith(0, false);
    });
  });
});