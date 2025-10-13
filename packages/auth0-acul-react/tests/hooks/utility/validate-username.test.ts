import { renderHook } from '@testing-library/react';
import { useUsernameValidation } from '../../../src/hooks/utility/validate-username';
import { getScreen } from '../../../src/state/instance-store';
import { errorManager } from '../../../src/hooks/common/errors';

// Mock the auth0-acul-js module
jest.mock('@auth0/auth0-acul-js', () => ({}), { virtual: true });

// Mock dependencies
jest.mock('../../../src/state/instance-store');
jest.mock('../../../src/hooks/common/errors');

const mockGetScreen = getScreen as jest.MockedFunction<typeof getScreen>;
const mockErrorManager = errorManager as jest.Mocked<typeof errorManager>;

// Mock validation function
const mockValidateUsername = jest.fn();

// Mock screen with validateUsername
const mockScreen = {
  validateUsername: mockValidateUsername,
} as any;

describe('useUsernameValidation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetScreen.mockReturnValue(mockScreen);
    
    // Default successful validation
    mockValidateUsername.mockReturnValue({
      isValid: true,
      errors: [],
    });
  });

  describe('initialization', () => {
    it('should initialize with correct default state', () => {
      const { result } = renderHook(() => useUsernameValidation('testuser'));

      expect(result.current.isValid).toBe(true);
      expect(result.current.errors).toEqual([]);
    });

    it('should get screen instance on initialization', () => {
      renderHook(() => useUsernameValidation('testuser'));

      expect(mockGetScreen).toHaveBeenCalledTimes(1);
    });

    it('should call validateUsername with provided username', () => {
      renderHook(() => useUsernameValidation('testuser'));

      expect(mockValidateUsername).toHaveBeenCalledWith('testuser');
    });

    it('should handle empty username', () => {
      renderHook(() => useUsernameValidation(''));

      expect(mockValidateUsername).toHaveBeenCalledWith('');
    });

    it('should handle different username types', () => {
      const testCases = ['user123', 'test_user', 'User-Name', 'u', ''];
      
      testCases.forEach(username => {
        renderHook(() => useUsernameValidation(username));
        expect(mockValidateUsername).toHaveBeenCalledWith(username);
      });
    });
  });

  describe('validation results', () => {
    it('should return valid result for valid username', () => {
      mockValidateUsername.mockReturnValue({
        isValid: true,
        errors: [],
      });

      const { result } = renderHook(() => useUsernameValidation('validuser'));

      expect(result.current.isValid).toBe(true);
      expect(result.current.errors).toEqual([]);
    });

    it('should return invalid result with errors for invalid username', () => {
      const validationErrors = [
        { code: 'username_too_short', message: 'Username is too short' },
        { code: 'invalid_characters', message: 'Username contains invalid characters' },
      ];

      mockValidateUsername.mockReturnValue({
        isValid: false,
        errors: validationErrors,
      });

      const { result } = renderHook(() => useUsernameValidation('x'));

      expect(result.current.isValid).toBe(false);
      expect(result.current.errors).toEqual(validationErrors);
    });

    it('should handle various error types', () => {
      const testCases = [
        {
          errors: [{ code: 'required', message: 'Username is required' }],
          username: '',
          expectedValid: false,
        },
        {
          errors: [{ code: 'min_length', message: 'Username must be at least 3 characters' }],
          username: 'ab',
          expectedValid: false,
        },
        {
          errors: [],
          username: 'validusername',
          expectedValid: true,
        },
      ];

      testCases.forEach(({ errors, username, expectedValid }) => {
        mockValidateUsername.mockReturnValue({
          isValid: expectedValid,
          errors,
        });

        const { result } = renderHook(() => useUsernameValidation(username));

        expect(result.current.isValid).toBe(expectedValid);
        expect(result.current.errors).toEqual(errors);
      });
    });
  });

  describe('username changes', () => {
    it('should revalidate when username changes', () => {
      const { rerender } = renderHook(
        ({ username }) => useUsernameValidation(username),
        { initialProps: { username: 'user1' } }
      );

      expect(mockValidateUsername).toHaveBeenCalledWith('user1');
      expect(mockValidateUsername).toHaveBeenCalledTimes(1);

      rerender({ username: 'user2' });

      expect(mockValidateUsername).toHaveBeenCalledWith('user2');
      expect(mockValidateUsername).toHaveBeenCalledTimes(2);
    });

    it('should not revalidate when username stays the same', () => {
      const { rerender } = renderHook(
        ({ username }) => useUsernameValidation(username),
        { initialProps: { username: 'user1' } }
      );

      expect(mockValidateUsername).toHaveBeenCalledTimes(1);

      rerender({ username: 'user1' });

      expect(mockValidateUsername).toHaveBeenCalledTimes(1);
    });

    it('should handle rapid username changes', () => {
      const { rerender } = renderHook(
        ({ username }) => useUsernameValidation(username),
        { initialProps: { username: 'a' } }
      );

      const usernames = ['ab', 'abc', 'abcd', 'abcde'];
      
      usernames.forEach((username, index) => {
        rerender({ username });
        expect(mockValidateUsername).toHaveBeenCalledWith(username);
        expect(mockValidateUsername).toHaveBeenCalledTimes(index + 2); // +1 for initial call
      });
    });
  });

  describe('error manager integration', () => {
    it('should not integrate with error manager by default', () => {
      mockValidateUsername.mockReturnValue({
        isValid: false,
        errors: [{ code: 'invalid', message: 'Invalid username' }],
      });

      renderHook(() => useUsernameValidation('invalid'));

      expect(mockErrorManager.replaceClientErrors).not.toHaveBeenCalled();
    });

    it('should integrate with error manager when includeInErrors is true', () => {
      const validationErrors = [{ code: 'invalid', message: 'Invalid username' }];
      
      mockValidateUsername.mockReturnValue({
        isValid: false,
        errors: validationErrors,
      });

      renderHook(() => useUsernameValidation('invalid', { includeInErrors: true }));

      expect(mockErrorManager.replaceClientErrors).toHaveBeenCalledWith(
        validationErrors,
        { byField: 'username' }
      );
    });

    it('should clear errors when validation passes with includeInErrors', () => {
      mockValidateUsername.mockReturnValue({
        isValid: true,
        errors: [],
      });

      renderHook(() => useUsernameValidation('valid', { includeInErrors: true }));

      expect(mockErrorManager.replaceClientErrors).toHaveBeenCalledWith(
        [],
        { byField: 'username' }
      );
    });

    it('should update error manager when validation result changes', () => {
      mockValidateUsername.mockReturnValue({
        isValid: true,
        errors: [],
      });

      const { rerender } = renderHook(
        ({ username }) => useUsernameValidation(username, { includeInErrors: true }),
        { initialProps: { username: 'valid' } }
      );

      expect(mockErrorManager.replaceClientErrors).toHaveBeenCalledWith(
        [],
        { byField: 'username' }
      );

      // Change to invalid username
      mockValidateUsername.mockReturnValue({
        isValid: false,
        errors: [{ code: 'invalid', message: 'Invalid username' }],
      });

      rerender({ username: 'invalid' });

      expect(mockErrorManager.replaceClientErrors).toHaveBeenCalledWith(
        [{ code: 'invalid', message: 'Invalid username' }],
        { byField: 'username' }
      );
    });

    it('should handle includeInErrors option changes', () => {
      mockValidateUsername.mockReturnValue({
        isValid: false,
        errors: [{ code: 'invalid', message: 'Invalid username' }],
      });

      const { rerender } = renderHook(
        ({ includeInErrors }) => useUsernameValidation('invalid', { includeInErrors }),
        { initialProps: { includeInErrors: false } }
      );

      expect(mockErrorManager.replaceClientErrors).not.toHaveBeenCalled();

      rerender({ includeInErrors: true });

      expect(mockErrorManager.replaceClientErrors).toHaveBeenCalledWith(
        [{ code: 'invalid', message: 'Invalid username' }],
        { byField: 'username' }
      );
    });
  });

  describe('memoization', () => {
    it('should return the same result object for identical validations', () => {
      mockValidateUsername.mockReturnValue({
        isValid: true,
        errors: [],
      });

      const { result, rerender } = renderHook(() => useUsernameValidation('user'));

      const firstResult = result.current;
      rerender();

      expect(result.current).toBe(firstResult);
    });

    it('should return new result object when validation changes', () => {
      mockValidateUsername.mockReturnValue({
        isValid: true,
        errors: [],
      });

      const { result, rerender } = renderHook(
        ({ username }) => useUsernameValidation(username),
        { initialProps: { username: 'valid' } }
      );

      const firstResult = result.current;

      mockValidateUsername.mockReturnValue({
        isValid: false,
        errors: [{ code: 'invalid', message: 'Invalid' }],
      });

      rerender({ username: 'invalid' });

      expect(result.current).not.toBe(firstResult);
      expect(result.current.isValid).toBe(false);
    });
  });



  describe('edge cases', () => {
    it('should handle very long usernames', () => {
      const longUsername = 'a'.repeat(1000);
      
      mockValidateUsername.mockReturnValue({
        isValid: false,
        errors: [{ code: 'too_long', message: 'Username is too long' }],
      });

      const { result } = renderHook(() => useUsernameValidation(longUsername));

      expect(mockValidateUsername).toHaveBeenCalledWith(longUsername);
      expect(result.current.isValid).toBe(false);
    });

    it('should handle special characters in username', () => {
      const specialUsername = 'user@#$%^&*()';
      
      mockValidateUsername.mockReturnValue({
        isValid: false,
        errors: [{ code: 'invalid_chars', message: 'Contains invalid characters' }],
      });

      const { result } = renderHook(() => useUsernameValidation(specialUsername));

      expect(mockValidateUsername).toHaveBeenCalledWith(specialUsername);
      expect(result.current.isValid).toBe(false);
    });

    it('should handle unicode characters in username', () => {
      const unicodeUsername = 'user测试🚀';
      
      mockValidateUsername.mockReturnValue({
        isValid: true,
        errors: [],
      });

      const { result } = renderHook(() => useUsernameValidation(unicodeUsername));

      expect(mockValidateUsername).toHaveBeenCalledWith(unicodeUsername);
      expect(result.current.isValid).toBe(true);
    });

    it('should handle whitespace in username', () => {
      const testCases = ['   ', 'user name', ' username', 'username '];
      
      testCases.forEach(username => {
        mockValidateUsername.mockReturnValue({
          isValid: false,
          errors: [{ code: 'invalid_format', message: 'Invalid username format' }],
        });

        const { result } = renderHook(() => useUsernameValidation(username));

        expect(mockValidateUsername).toHaveBeenCalledWith(username);
        expect(result.current.isValid).toBe(false);
      });
    });
  });

  describe('performance', () => {
    it('should not cause excessive validation calls', () => {
      const { rerender } = renderHook(() => useUsernameValidation('user'));

      expect(mockValidateUsername).toHaveBeenCalledTimes(1);

      // Multiple renders with same username
      for (let i = 0; i < 10; i++) {
        rerender();
      }

      expect(mockValidateUsername).toHaveBeenCalledTimes(1);
    });

    it('should handle rapid option changes efficiently', () => {
      const { rerender } = renderHook(
        ({ includeInErrors }) => useUsernameValidation('user', { includeInErrors }),
        { initialProps: { includeInErrors: false } }
      );

      expect(mockValidateUsername).toHaveBeenCalledTimes(1);

      // Toggle includeInErrors - should cause revalidation due to memoization dependency
      rerender({ includeInErrors: true });
      expect(mockValidateUsername).toHaveBeenCalledTimes(2);

      rerender({ includeInErrors: false });
      expect(mockValidateUsername).toHaveBeenCalledTimes(3);
    });
  });

  describe('integration scenarios', () => {
    it('should work with realistic username validation workflow', () => {
      // Start with empty username
      mockValidateUsername.mockReturnValue({
        isValid: false,
        errors: [{ code: 'required', message: 'Username is required' }],
      });

      const { result, rerender } = renderHook(
        ({ username }) => useUsernameValidation(username, { includeInErrors: true }),
        { initialProps: { username: '' } }
      );

      expect(result.current.isValid).toBe(false);
      expect(result.current.errors).toEqual([
        { code: 'required', message: 'Username is required' }
      ]);
      expect(mockErrorManager.replaceClientErrors).toHaveBeenCalledWith(
        [{ code: 'required', message: 'Username is required' }],
        { byField: 'username' }
      );

      // User types short username
      mockValidateUsername.mockReturnValue({
        isValid: false,
        errors: [{ code: 'too_short', message: 'Username too short' }],
      });

      rerender({ username: 'ab' });

      expect(result.current.isValid).toBe(false);
      expect(result.current.errors).toEqual([
        { code: 'too_short', message: 'Username too short' }
      ]);

      // User types valid username
      mockValidateUsername.mockReturnValue({
        isValid: true,
        errors: [],
      });

      rerender({ username: 'validuser' });

      expect(result.current.isValid).toBe(true);
      expect(result.current.errors).toEqual([]);
      expect(mockErrorManager.replaceClientErrors).toHaveBeenCalledWith(
        [],
        { byField: 'username' }
      );
    });

    it('should handle validation with multiple error conditions', () => {
      const multipleErrors = [
        { code: 'too_short', message: 'Username too short' },
        { code: 'invalid_chars', message: 'Contains invalid characters' },
        { code: 'reserved_word', message: 'Username is reserved' },
      ];

      mockValidateUsername.mockReturnValue({
        isValid: false,
        errors: multipleErrors,
      });

      const { result } = renderHook(() => 
        useUsernameValidation('a!', { includeInErrors: true })
      );

      expect(result.current.isValid).toBe(false);
      expect(result.current.errors).toEqual(multipleErrors);
      expect(mockErrorManager.replaceClientErrors).toHaveBeenCalledWith(
        multipleErrors,
        { byField: 'username' }
      );
    });
  });
});