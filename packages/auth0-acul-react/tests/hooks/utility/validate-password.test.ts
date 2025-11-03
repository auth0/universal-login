import { renderHook } from '@testing-library/react';
import { usePasswordValidation } from '../../../src/hooks/utility/validate-password';
import { getScreen } from '../../../src/state/instance-store';
import { errorManager } from '../../../src/hooks/common/errors';
import type { PasswordValidationResult } from '@auth0/auth0-acul-js';

// Mock the instance store and error manager
jest.mock('../../../src/state/instance-store', () => ({
  getScreen: jest.fn(),
}));

jest.mock('../../../src/hooks/common/errors', () => ({
  errorManager: {
    replaceValidationErrors: jest.fn(),
  },
}));

const mockGetScreen = getScreen as jest.MockedFunction<typeof getScreen>;
const mockErrorManager = errorManager as jest.Mocked<typeof errorManager>;

describe('usePasswordValidation', () => {
  // Note: jest.clearAllMocks() is now handled globally in jest.setup.js

  it('should return validation result when password is valid', () => {
    const mockValidationResult: PasswordValidationResult = {
      isValid: true,
      results: [
        { code: 'minLength', label: 'At least 8 characters', status: 'valid', isValid: true },
        { code: 'containsNumber', label: 'Contains a number', status: 'valid', isValid: true },
      ],
    };

    const mockInstance = {
      validatePassword: jest.fn().mockReturnValue(mockValidationResult),
    };

    mockGetScreen.mockReturnValue(mockInstance);

    const { result } = renderHook(() => usePasswordValidation('validPassword123'));

    expect(result.current).toEqual(mockValidationResult);
    expect(result.current.isValid).toBe(true);
    expect(mockInstance.validatePassword).toHaveBeenCalledWith('validPassword123');
    expect(mockErrorManager.replaceValidationErrors).not.toHaveBeenCalled();
  });

  it('should return validation result when password is invalid', () => {
    const mockValidationResult: PasswordValidationResult = {
      isValid: false,
      results: [
        { code: 'minLength', label: 'At least 8 characters', status: 'error', isValid: false },
        { code: 'containsNumber', label: 'Contains a number', status: 'valid', isValid: true },
      ],
    };

    const mockInstance = {
      validatePassword: jest.fn().mockReturnValue(mockValidationResult),
    };

    mockGetScreen.mockReturnValue(mockInstance);

    const { result } = renderHook(() => usePasswordValidation('weak'));

    expect(result.current).toEqual(mockValidationResult);
    expect(result.current.isValid).toBe(false);
    expect(mockInstance.validatePassword).toHaveBeenCalledWith('weak');
    expect(mockErrorManager.replaceValidationErrors).not.toHaveBeenCalled();
  });

  it('should include errors in error manager when includeInErrors is true and password is invalid', () => {
    const mockValidationResult: PasswordValidationResult = {
      isValid: false,
      results: [
        { code: 'minLength', label: 'At least 8 characters', status: 'error', isValid: false },
      ],
    };

    const mockInstance = {
      validatePassword: jest.fn().mockReturnValue(mockValidationResult),
    };

    mockGetScreen.mockReturnValue(mockInstance);

    const { result } = renderHook(() => 
      usePasswordValidation('weak', { includeInErrors: true })
    );

    expect(result.current).toEqual(mockValidationResult);
    expect(mockErrorManager.replaceValidationErrors).toHaveBeenCalledWith(
      [
        {
          code: 'password-policy-error',
          field: 'password',
          message: 'The password does not meet the required criteria.',
          rules: mockValidationResult.results,
        },
      ],
      { byField: 'password' }
    );
  });

  it('should clear errors in error manager when includeInErrors is true and password is valid', () => {
    const mockValidationResult: PasswordValidationResult = {
      isValid: true,
      results: [
        { code: 'minLength', label: 'At least 8 characters', status: 'valid', isValid: true },
      ],
    };

    const mockInstance = {
      validatePassword: jest.fn().mockReturnValue(mockValidationResult),
    };

    mockGetScreen.mockReturnValue(mockInstance);

    const { result } = renderHook(() => 
      usePasswordValidation('validPassword123', { includeInErrors: true })
    );

    expect(result.current).toEqual(mockValidationResult);
    expect(mockErrorManager.replaceValidationErrors).toHaveBeenCalledWith(
      [],
      { byField: 'password' }
    );
  });

  it('should handle password change and re-validate', () => {
    const mockValidationResult1: PasswordValidationResult = {
      isValid: false,
      results: [{ code: 'minLength', label: 'At least 8 characters', status: 'error', isValid: false }],
    };

    const mockValidationResult2: PasswordValidationResult = {
      isValid: true,
      results: [{ code: 'minLength', label: 'At least 8 characters', status: 'valid', isValid: true }],
    };

    const mockInstance = {
      validatePassword: jest.fn()
        .mockReturnValueOnce(mockValidationResult1)
        .mockReturnValueOnce(mockValidationResult2),
    };

    mockGetScreen.mockReturnValue(mockInstance);

    const { result, rerender } = renderHook(
      ({ password }) => usePasswordValidation(password),
      { initialProps: { password: 'weak' } }
    );

    expect(result.current.isValid).toBe(false);
    expect(mockInstance.validatePassword).toHaveBeenCalledWith('weak');

    rerender({ password: 'strongPassword123' });

    expect(result.current.isValid).toBe(true);
    expect(mockInstance.validatePassword).toHaveBeenCalledWith('strongPassword123');
    expect(mockInstance.validatePassword).toHaveBeenCalledTimes(2);
  });

  it('should memoize result when password and options do not change', () => {
    const mockValidationResult: PasswordValidationResult = {
      isValid: true,
      results: [],
    };

    const mockInstance = {
      validatePassword: jest.fn().mockReturnValue(mockValidationResult),
    };

    mockGetScreen.mockReturnValue(mockInstance);

    const { result, rerender } = renderHook(() => 
      usePasswordValidation('samePassword')
    );

    const firstResult = result.current;
    rerender();
    const secondResult = result.current;

    expect(firstResult).toBe(secondResult); // Same reference due to memoization
    expect(mockInstance.validatePassword).toHaveBeenCalledTimes(1);
  });
});