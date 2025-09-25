import React from 'react';
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

    it.skip('should handle cleanup when polling control is null', () => {
      mockScreen.pollingManager.mockReturnValue(null as any);

      const { unmount } = renderHook(() => useMfaPolling());

      // Should not throw
      expect(() => unmount()).not.toThrow();
    });
  });

  describe('state synchronization', () => {
    it.skip('should sync isRunning state with polling control', () => {
      // Start with not running
      mockPollingControl.isRunning.mockReturnValue(false);
      
      const { result } = renderHook(() => useMfaPolling());

      expect(result.current.isRunning).toBe(false);

      // Change to running
      mockPollingControl.isRunning.mockReturnValue(true);

      expect(result.current.isRunning).toBe(true);
    });

    it.skip('should maintain stable references for callback functions', () => {
      const { result, rerender } = renderHook(() => useMfaPolling());

      const firstStartPolling = result.current.startPolling;
      const firstStopPolling = result.current.stopPolling;

      rerender();

      expect(result.current.startPolling).toBe(firstStartPolling);
      expect(result.current.stopPolling).toBe(firstStopPolling);
    });
  });

  describe('error scenarios', () => {
    it.skip('should handle screen initialization errors', () => {
      mockGetScreen.mockImplementation(() => {
        throw new Error('Screen not available');
      });

      expect(() => {
        renderHook(() => useMfaPolling());
      }).toThrow('Screen not available');
    });

    it.skip('should handle polling control creation errors', () => {
      mockScreen.pollingManager.mockImplementation(() => {
        throw new Error('Polling manager unavailable');
      });

      expect(() => {
        renderHook(() => useMfaPolling());
      }).toThrow('Polling manager unavailable');
    });
  });

  describe('integration scenarios', () => {
    it.skip('should work with realistic polling workflow', () => {
      const onCompleted = jest.fn();
      const onError = jest.fn();
      
      const { result } = renderHook(() => 
        useMfaPolling({ intervalMs: 1000, onCompleted, onError })
      );

      // Initial state
      expect(result.current.isRunning).toBe(false);

      // Start polling
      result.current.startPolling();
      expect(mockPollingControl.startPolling).toHaveBeenCalledTimes(1);

      // Simulate completion
      const wrappedOptions = mockScreen.pollingManager.mock.calls[0][0];
      wrappedOptions.onCompleted();

      expect(onCompleted).toHaveBeenCalledTimes(1);

      // Stop polling
      result.current.stopPolling();
      expect(mockPollingControl.stopPolling).toHaveBeenCalledTimes(1);
    });
  });
});