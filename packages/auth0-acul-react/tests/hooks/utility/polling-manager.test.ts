import { renderHook, act } from '@testing-library/react';
import { useMfaPolling } from '../../../src/hooks/utility/polling-manager';
import { getScreen } from '../../../src/state/instance-store';
import { errorManager } from '../../../src/hooks/common/errors';

// Mock the auth0-acul-js module
jest.mock('@auth0/auth0-acul-js', () => ({}), { virtual: true });

// Mock dependencies
jest.mock('../../../src/state/instance-store');
jest.mock('../../../src/hooks/common/errors');

const mockGetScreen = getScreen as jest.MockedFunction<typeof getScreen>;
const mockErrorManager = errorManager as jest.Mocked<typeof errorManager>;

// Mock polling control
const mockPollingControl = {
  startPolling: jest.fn(),
  stopPolling: jest.fn(),
  isRunning: jest.fn().mockReturnValue(false),
};

// Mock screen with pollingManager
const mockScreen = {
  pollingManager: jest.fn().mockReturnValue(mockPollingControl),
};

describe('useMfaPolling', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetScreen.mockReturnValue(mockScreen as any);

    // Reset polling control state
    mockPollingControl.isRunning.mockReturnValue(false);
    mockPollingControl.startPolling.mockClear();
    mockPollingControl.stopPolling.mockClear();
    mockScreen.pollingManager.mockClear();
  });

  describe('initialization', () => {
    it('should initialize with correct default state', () => {
      const { result } = renderHook(() => useMfaPolling());

      expect(result.current.isRunning).toBe(false);
      expect(typeof result.current.startPolling).toBe('function');
      expect(typeof result.current.stopPolling).toBe('function');
    });

    it('should create polling manager with provided options', () => {
      const options = {
        intervalMs: 5000,
        onCompleted: jest.fn(),
        onError: jest.fn(),
      };

      renderHook(() => useMfaPolling(options));

      expect(mockScreen.pollingManager).toHaveBeenCalledWith(
        expect.objectContaining({
          intervalMs: 5000,
          onCompleted: expect.any(Function),
          onError: expect.any(Function),
        })
      );
    });

    it('should create polling manager with default options when none provided', () => {
      renderHook(() => useMfaPolling());

      expect(mockScreen.pollingManager).toHaveBeenCalledWith(
        expect.objectContaining({
          onCompleted: expect.any(Function),
          onError: expect.any(Function),
        })
      );
    });
  });

  describe('polling control', () => {
    it('should start polling when startPolling is called', () => {
      const { result } = renderHook(() => useMfaPolling());

      act(() => {
        result.current.startPolling();
      });

      expect(mockPollingControl.startPolling).toHaveBeenCalledTimes(1);
    });

    it('should stop polling when stopPolling is called', () => {
      const { result } = renderHook(() => useMfaPolling());

      act(() => {
        result.current.stopPolling();
      });

      expect(mockPollingControl.stopPolling).toHaveBeenCalledTimes(1);
    });

    it('should reflect running state from polling control', () => {
      mockPollingControl.isRunning.mockReturnValue(true);

      const { result } = renderHook(() => useMfaPolling());

      expect(result.current.isRunning).toBe(true);
    });

    it('should handle multiple start calls safely', () => {
      const { result } = renderHook(() => useMfaPolling());

      act(() => {
        result.current.startPolling();
        result.current.startPolling();
        result.current.startPolling();
      });

      expect(mockPollingControl.startPolling).toHaveBeenCalledTimes(3);
    });
  });

  describe('callback handling', () => {
    it('should handle onCompleted callback and update state', () => {
      const onCompleted = jest.fn();
      const options = { onCompleted };

      renderHook(() => useMfaPolling(options));

      // Get the wrapped callback that was passed to pollingManager
      const wrappedOptions = mockScreen.pollingManager.mock.calls[0][0];

      // Simulate completion
      act(() => {
        wrappedOptions.onCompleted();
      });

      expect(onCompleted).toHaveBeenCalledTimes(1);
    });

    it('should handle onError callback and push to error manager', () => {
      const onError = jest.fn();
      const options = { onError };

      renderHook(() => useMfaPolling(options));

      // Get the wrapped callback that was passed to pollingManager
      const wrappedOptions = mockScreen.pollingManager.mock.calls[0][0];

      const error = { status: 500, responseText: 'Server Error' };

      // Simulate error
      act(() => {
        wrappedOptions.onError(error);
      });

      expect(onError).toHaveBeenCalledWith(error);
      expect(mockErrorManager.pushServerErrors).toHaveBeenCalledWith([error]);
    });

    it('should handle onError without provided callback', () => {
      renderHook(() => useMfaPolling());

      // Get the wrapped callback that was passed to pollingManager
      const wrappedOptions = mockScreen.pollingManager.mock.calls[0][0];

      const error = { status: 429, responseText: 'Rate Limited' };

      // Should not throw when no onError callback provided
      expect(() => {
        act(() => {
          wrappedOptions.onError(error);
        });
      }).not.toThrow();

      expect(mockErrorManager.pushServerErrors).toHaveBeenCalledWith([error]);
    });
  });

  describe('cleanup', () => {
    it('should stop polling on unmount', () => {
      const { unmount } = renderHook(() => useMfaPolling());

      unmount();

      expect(mockPollingControl.stopPolling).toHaveBeenCalledTimes(1);
    });

    it('should handle requestAnimationFrame callback after unmount', () => {
      // Mock requestAnimationFrame to capture the callback
      let rafCallback: (() => void) | null = null;
      const mockRaf = jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
        rafCallback = cb as () => void;
        return 1;
      });

      // Set polling to running state
      mockPollingControl.isRunning.mockReturnValue(true);

      const { unmount } = renderHook(() => useMfaPolling());

      // Unmount should set mounted = false
      unmount();

      // Now trigger the RAF callback that was scheduled before unmount
      if (rafCallback) {
        act(() => {
          rafCallback!();
        });
      }

      // Should not throw and should have handled the unmounted state gracefully
      expect(mockPollingControl.isRunning).toHaveBeenCalled();

      mockRaf.mockRestore();
    });
  });
});