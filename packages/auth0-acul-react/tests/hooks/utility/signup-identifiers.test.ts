import { renderHook } from '@testing-library/react';
import { useSignupIdentifiers } from '../../../src/hooks/utility/signup-identifiers';
import { getScreen } from '../../../src/state/instance-store';
import type { Identifier } from '@auth0/auth0-acul-js';

// Mock the instance store
jest.mock('../../../src/state/instance-store', () => ({
  getScreen: jest.fn(),
}));

const mockGetScreen = getScreen as jest.MockedFunction<typeof getScreen>;

describe('useSignupIdentifiers', () => {
  // Note: jest.clearAllMocks() is now handled globally in jest.setup.js

  it('should return signup identifiers when screen instance is available', () => {
    const mockIdentifiers: Identifier[] = [
      { type: 'email', required: true },
      { type: 'username', required: false },
    ];

    const mockInstance = {
      getSignupIdentifiers: jest.fn().mockReturnValue(mockIdentifiers),
    };

    mockGetScreen.mockReturnValue(mockInstance);

    const { result } = renderHook(() => useSignupIdentifiers());

    expect(result.current).toEqual(mockIdentifiers);
    expect(mockInstance.getSignupIdentifiers).toHaveBeenCalledTimes(1);
  });

  it('should return empty array when getSignupIdentifiers returns null', () => {
    const mockInstance = {
      getSignupIdentifiers: jest.fn().mockReturnValue(null),
    };

    mockGetScreen.mockReturnValue(mockInstance);

    const { result } = renderHook(() => useSignupIdentifiers());

    expect(result.current).toEqual([]);
    expect(mockInstance.getSignupIdentifiers).toHaveBeenCalledTimes(1);
  });

  it('should return empty array when getSignupIdentifiers returns undefined', () => {
    const mockInstance = {
      getSignupIdentifiers: jest.fn().mockReturnValue(undefined),
    };

    mockGetScreen.mockReturnValue(mockInstance);

    const { result } = renderHook(() => useSignupIdentifiers());

    expect(result.current).toEqual([]);
    expect(mockInstance.getSignupIdentifiers).toHaveBeenCalledTimes(1);
  });

  it('should handle multiple identifiers with different required status', () => {
    const mockIdentifiers: Identifier[] = [
      { type: 'email', required: true },
      { type: 'phone', required: false },
      { type: 'username', required: true },
    ];

    const mockInstance = {
      getSignupIdentifiers: jest.fn().mockReturnValue(mockIdentifiers),
    };

    mockGetScreen.mockReturnValue(mockInstance);

    const { result } = renderHook(() => useSignupIdentifiers());

    expect(result.current).toEqual(mockIdentifiers);
    expect(result.current).toHaveLength(3);
    
    const emailIdentifier = result.current.find(id => id.type === 'email');
    const phoneIdentifier = result.current.find(id => id.type === 'phone');
    const usernameIdentifier = result.current.find(id => id.type === 'username');
    
    expect(emailIdentifier?.required).toBe(true);
    expect(phoneIdentifier?.required).toBe(false);
    expect(usernameIdentifier?.required).toBe(true);
  });

  it('should handle single identifier', () => {
    const mockIdentifiers: Identifier[] = [
      { type: 'email', required: true },
    ];

    const mockInstance = {
      getSignupIdentifiers: jest.fn().mockReturnValue(mockIdentifiers),
    };

    mockGetScreen.mockReturnValue(mockInstance);

    const { result } = renderHook(() => useSignupIdentifiers());

    expect(result.current).toEqual(mockIdentifiers);
    expect(result.current).toHaveLength(1);
    expect(result.current[0].type).toBe('email');
    expect(result.current[0].required).toBe(true);
  });

  it('should handle empty identifiers array', () => {
    const mockInstance = {
      getSignupIdentifiers: jest.fn().mockReturnValue([]),
    };

    mockGetScreen.mockReturnValue(mockInstance);

    const { result } = renderHook(() => useSignupIdentifiers());

    expect(result.current).toEqual([]);
    expect(result.current).toHaveLength(0);
  });
});