import { renderHook } from '@testing-library/react';
import { useLoginIdentifiers } from '../../../src/hooks/utility/login-identifiers';
import { getScreen } from '../../../src/state/instance-store';

// Mock the instance store
jest.mock('../../../src/state/instance-store', () => ({
  getScreen: jest.fn(),
}));

const mockGetScreen = getScreen as jest.MockedFunction<typeof getScreen>;

describe('useLoginIdentifiers', () => {
  // Note: jest.clearAllMocks() is now handled globally in jest.setup.js

  it('should return login identifiers when screen instance is available', () => {
    const mockInstance = {
      getLoginIdentifiers: jest.fn().mockReturnValue(['email', 'username']),
    };

    mockGetScreen.mockReturnValue(mockInstance);

    const { result } = renderHook(() => useLoginIdentifiers());

    expect(result.current).toEqual(['email', 'username']);
    expect(mockInstance.getLoginIdentifiers).toHaveBeenCalledTimes(1);
  });

  it('should return null when getLoginIdentifiers returns null', () => {
    const mockInstance = {
      getLoginIdentifiers: jest.fn().mockReturnValue(null),
    };

    mockGetScreen.mockReturnValue(mockInstance);

    const { result } = renderHook(() => useLoginIdentifiers());

    expect(result.current).toBeNull();
    expect(mockInstance.getLoginIdentifiers).toHaveBeenCalledTimes(1);
  });

  it('should return undefined when getLoginIdentifiers returns undefined', () => {
    const mockInstance = {
      getLoginIdentifiers: jest.fn().mockReturnValue(undefined),
    };

    mockGetScreen.mockReturnValue(mockInstance);

    const { result } = renderHook(() => useLoginIdentifiers());

    expect(result.current).toBeUndefined();
    expect(mockInstance.getLoginIdentifiers).toHaveBeenCalledTimes(1);
  });

  it('should handle different identifier types', () => {
    const mockInstance = {
      getLoginIdentifiers: jest.fn().mockReturnValue(['email', 'phone', 'username']),
    };

    mockGetScreen.mockReturnValue(mockInstance);

    const { result } = renderHook(() => useLoginIdentifiers());

    expect(result.current).toEqual(['email', 'phone', 'username']);
    expect(result.current).toContain('email');
    expect(result.current).toContain('phone');
    expect(result.current).toContain('username');
  });

  it('should handle single identifier type', () => {
    const mockInstance = {
      getLoginIdentifiers: jest.fn().mockReturnValue(['email']),
    };

    mockGetScreen.mockReturnValue(mockInstance);

    const { result } = renderHook(() => useLoginIdentifiers());

    expect(result.current).toEqual(['email']);
    expect(result.current).toHaveLength(1);
  });

  it('should handle empty identifiers array', () => {
    const mockInstance = {
      getLoginIdentifiers: jest.fn().mockReturnValue([]),
    };

    mockGetScreen.mockReturnValue(mockInstance);

    const { result } = renderHook(() => useLoginIdentifiers());

    expect(result.current).toEqual([]);
    expect(result.current).toHaveLength(0);
  });
});