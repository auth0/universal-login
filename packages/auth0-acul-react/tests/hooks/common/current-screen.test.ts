import { renderHook } from '@testing-library/react';
import { useCurrentScreen } from '../../../src/hooks/common/current-screen';
import { getCurrentScreenOptions, type CurrentScreenOptions } from '@auth0/auth0-acul-js';

// Mock the auth0-acul-js module
jest.mock('@auth0/auth0-acul-js', () => ({
  getCurrentScreenOptions: jest.fn(),
}), { virtual: true });

const mockGetCurrentScreenOptions = getCurrentScreenOptions as jest.MockedFunction<() => CurrentScreenOptions>;

describe('useCurrentScreen', () => {
  // Note: jest.clearAllMocks() is now handled globally in jest.setup.js

  it('should call getCurrentScreenOptions and return the result', () => {
    const mockScreenOptions: CurrentScreenOptions = {
      client: { id: 'test-client-id', metadata: null },
      organization: null,
      prompt: { name: 'login' },
      screen: { name: 'login' },
      tenant: { enabledLocales: ['en'] },
      transaction: { state: 'active', locale: 'en', errors: null },
      untrustedData: { authorizationParams: null },
    };

    mockGetCurrentScreenOptions.mockReturnValue(mockScreenOptions);

    const { result } = renderHook(() => useCurrentScreen());

    expect(result.current).toEqual(mockScreenOptions);
    expect(mockGetCurrentScreenOptions).toHaveBeenCalledTimes(1);
  });

  it('should handle screen options with transaction errors', () => {
    const mockScreenOptionsWithErrors: CurrentScreenOptions = {
      client: { id: 'test-client-id', metadata: null },
      organization: null,
      prompt: { name: 'login' },
      screen: { name: 'login' },
      tenant: { enabledLocales: ['en'] },
      transaction: {
        state: 'error',
        locale: 'en',
        errors: [{ code: 'invalid_credentials', message: 'Wrong email or password.' }],
      },
      untrustedData: { authorizationParams: null },
    };

    mockGetCurrentScreenOptions.mockReturnValue(mockScreenOptionsWithErrors);

    const { result } = renderHook(() => useCurrentScreen());

    expect(result.current).toEqual(mockScreenOptionsWithErrors);
    expect(result.current?.transaction?.errors).toHaveLength(1);
    expect(result.current?.transaction?.errors?.[0].code).toBe('invalid_credentials');
  });
});