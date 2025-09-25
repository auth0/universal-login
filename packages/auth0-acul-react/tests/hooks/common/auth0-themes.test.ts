import { renderHook } from '@testing-library/react';
import { useAuth0Themes } from '../../../src/hooks/common/auth0-themes';
import { getCurrentThemeOptions } from '@auth0/auth0-acul-js';

// Mock the auth0-acul-js module
jest.mock('@auth0/auth0-acul-js', () => ({
  getCurrentThemeOptions: jest.fn(),
}), { virtual: true });

const mockGetCurrentThemeOptions = getCurrentThemeOptions as jest.MockedFunction<typeof getCurrentThemeOptions>;

describe('useAuth0Themes', () => {
  // Note: jest.clearAllMocks() is now handled globally in jest.setup.js

  it('should return theme options when available', () => {
    const mockTheme = {
      colors: {
        primary: '#007bff',
        primaryText: '#ffffff',
        primaryBorder: '#0056b3',
      },
      fonts: {
        bodyFont: 'Arial, sans-serif',
        titleFont: 'Georgia, serif',
      },
      borders: {
        buttonBorderRadius: '4px',
      },
      pageBackground: {
        pageBackground: '#f8f9fa',
      },
      widget: {
        backgroundColor: '#ffffff',
      },
    };

    mockGetCurrentThemeOptions.mockReturnValue(mockTheme);

    const { result } = renderHook(() => useAuth0Themes());

    expect(result.current).toEqual(mockTheme);
    expect(mockGetCurrentThemeOptions).toHaveBeenCalledTimes(1);
  });

  it('should return null when no theme is available', () => {
    mockGetCurrentThemeOptions.mockReturnValue(null);

    const { result } = renderHook(() => useAuth0Themes());

    expect(result.current).toBeNull();
    expect(mockGetCurrentThemeOptions).toHaveBeenCalledTimes(1);
  });

  it('should handle partial theme objects', () => {
    const partialTheme = {
      colors: {
        primary: '#ff6b6b',
      },
      fonts: {},
      borders: {},
      pageBackground: {},
      widget: {},
    };

    mockGetCurrentThemeOptions.mockReturnValue(partialTheme as any);

    const { result } = renderHook(() => useAuth0Themes());

    expect(result.current).toEqual(partialTheme);
    expect(result.current?.colors?.primary).toBe('#ff6b6b');
  });

  it('should handle empty theme object', () => {
    const emptyTheme = {
      colors: {},
      fonts: {},
      borders: {},
      pageBackground: {},
      widget: {},
    };

    mockGetCurrentThemeOptions.mockReturnValue(emptyTheme as any);

    const { result } = renderHook(() => useAuth0Themes());

    expect(result.current).toEqual(emptyTheme);
  });
});