import React from 'react';
import { renderHook } from '@testing-library/react';
import { useResend, UseResendOptions } from '../../../src/hooks/utility/resend-manager';
import { getScreen } from '../../../src/state/instance-store';

// Mock the auth0-acul-js module
jest.mock('@auth0/auth0-acul-js', () => ({}), { virtual: true });

// Mock dependencies
jest.mock('../../../src/state/instance-store');

const mockGetScreen = getScreen as jest.MockedFunction<typeof getScreen>;

// Mock resend control
const mockStartResend = jest.fn();
const mockResendControl = {
  startResend: mockStartResend,
};

// Mock screen with resendManager
const mockScreen = {
  resendManager: jest.fn().mockReturnValue(mockResendControl),
} as any;

describe('useResend', () => {
  let mockOnStatusChange: jest.MockedFunction<(secs: number, isDisabled: boolean) => void>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockGetScreen.mockReturnValue(mockScreen);
    
    // Reset mock functions
    mockStartResend.mockClear();
    mockScreen.resendManager.mockClear();
    
    // Capture the onStatusChange callback
    mockScreen.resendManager.mockImplementation((options: any) => {
      mockOnStatusChange = options.onStatusChange;
      return mockResendControl;
    });
  });

  describe('initialization', () => {
    it('should initialize with correct default state', () => {
      const { result } = renderHook(() => useResend());

      expect(result.current.remaining).toBe(0);
      expect(result.current.disabled).toBe(false);
      expect(typeof result.current.startResend).toBe('function');
    });

    it('should create resend manager with default options', () => {
      renderHook(() => useResend());

      expect(mockScreen.resendManager).toHaveBeenCalledWith(
        expect.objectContaining({
          timeoutSeconds: 10,
          onStatusChange: expect.any(Function),
        })
      );
    });

    it('should create resend manager with custom timeoutSeconds', () => {
      const options: UseResendOptions = { timeoutSeconds: 30 };
      
      renderHook(() => useResend(options));

      expect(mockScreen.resendManager).toHaveBeenCalledWith(
        expect.objectContaining({
          timeoutSeconds: 30,
          onStatusChange: expect.any(Function),
        })
      );
    });

    it('should create resend manager with onTimeout callback', () => {
      const onTimeout = jest.fn();
      const options: UseResendOptions = { onTimeout };
      
      renderHook(() => useResend(options));

      expect(mockScreen.resendManager).toHaveBeenCalledWith(
        expect.objectContaining({
          timeoutSeconds: 10,
          onStatusChange: expect.any(Function),
          onTimeout,
        })
      );
    });

    it('should get screen instance on initialization', () => {
      renderHook(() => useResend());

      expect(mockGetScreen).toHaveBeenCalledTimes(1);
    });
  });



  describe('startResend functionality', () => {
    it('should call startResend on the control when triggered', () => {
      const { result } = renderHook(() => useResend());

      result.current.startResend();

      expect(mockStartResend).toHaveBeenCalledTimes(1);
    });

    it('should handle multiple startResend calls', () => {
      const { result } = renderHook(() => useResend());

      result.current.startResend();
      result.current.startResend();
      result.current.startResend();

      expect(mockStartResend).toHaveBeenCalledTimes(3);
    });

    it('should maintain stable reference for startResend function', () => {
      const { result, rerender } = renderHook(() => useResend());

      const firstStartResend = result.current.startResend;
      rerender();

      expect(result.current.startResend).toBe(firstStartResend);
    });

    it('should handle startResend when control is null', () => {
      mockScreen.resendManager.mockReturnValue(null);
      
      const { result } = renderHook(() => useResend());

      // Should not throw
      result.current.startResend();

      expect(mockStartResend).not.toHaveBeenCalled();
    });
  });

  describe('options changes', () => {
    it('should recreate resend manager when timeoutSeconds changes', () => {
      const { rerender } = renderHook(
        ({ timeoutSeconds }) => useResend({ timeoutSeconds }),
        { initialProps: { timeoutSeconds: 10 } }
      );

      expect(mockScreen.resendManager).toHaveBeenCalledTimes(1);
      expect(mockScreen.resendManager).toHaveBeenCalledWith(
        expect.objectContaining({ timeoutSeconds: 10 })
      );

      rerender({ timeoutSeconds: 30 });

      expect(mockScreen.resendManager).toHaveBeenCalledTimes(2);
      expect(mockScreen.resendManager).toHaveBeenLastCalledWith(
        expect.objectContaining({ timeoutSeconds: 30 })
      );
    });

    it('should recreate resend manager when onTimeout changes', () => {
      const firstOnTimeout = jest.fn();
      const secondOnTimeout = jest.fn();

      const { rerender } = renderHook(
        ({ onTimeout }) => useResend({ onTimeout }),
        { initialProps: { onTimeout: firstOnTimeout } }
      );

      expect(mockScreen.resendManager).toHaveBeenCalledTimes(1);
      expect(mockScreen.resendManager).toHaveBeenCalledWith(
        expect.objectContaining({ onTimeout: firstOnTimeout })
      );

      rerender({ onTimeout: secondOnTimeout });

      expect(mockScreen.resendManager).toHaveBeenCalledTimes(2);
      expect(mockScreen.resendManager).toHaveBeenLastCalledWith(
        expect.objectContaining({ onTimeout: secondOnTimeout })
      );
    });
  });

  describe('error handling', () => {
    it('should handle null resend control gracefully', () => {
      mockScreen.resendManager.mockReturnValue(null);
      
      const { result } = renderHook(() => useResend());

      expect(result.current.remaining).toBe(0);
      expect(result.current.disabled).toBe(false);
      expect(typeof result.current.startResend).toBe('function');
    });
  });
});