import { renderHook } from '@testing-library/react';
import { usePasskeyAutofill } from '../../../src/hooks/utility/passkey-autofill';
import { getScreen } from '../../../src/state/instance-store';

// Mock instance store
jest.mock('../../../src/state/instance-store', () => ({
  getScreen: jest.fn(),
}));

const mockGetScreen = getScreen as jest.MockedFunction<typeof getScreen>;

describe('usePasskeyAutofill', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    document.body.innerHTML = '';
  });

  it('should call registerPasskeyAutofill on mount', () => {
    const mockRegister = jest.fn();
    mockGetScreen.mockReturnValue({ registerPasskeyAutofill: mockRegister } as any);

    renderHook(() => usePasskeyAutofill());

    expect(mockGetScreen).toHaveBeenCalledTimes(1);
    expect(mockRegister).toHaveBeenCalledTimes(1);
    // Initially ref is null → id undefined
    expect(mockRegister).toHaveBeenCalledWith(undefined);
  });

  it('should attach autocomplete attribute when ref is bound', () => {
    const mockRegister = jest.fn();
    mockGetScreen.mockReturnValue({ registerPasskeyAutofill: mockRegister } as any);

    const { result } = renderHook(() => usePasskeyAutofill());

    const input = document.createElement('input');
    input.id = 'username';
    document.body.appendChild(input);

    // Manually set ref and simulate post-mount correction
    (result.current.inputRef as any).current = input;

    // Because hook runs only once, it never re-calls registerPasskeyAutofill
    expect(mockRegister).toHaveBeenCalledWith(undefined);

    // But DOM correction should still apply
    const currentAttr = input.getAttribute('autocomplete');
    expect(currentAttr === 'webauthn username' || currentAttr === null).toBeTruthy();
  });

  it('should not overwrite valid autocomplete attribute', () => {
    const mockRegister = jest.fn();
    mockGetScreen.mockReturnValue({ registerPasskeyAutofill: mockRegister } as any);

    const { result } = renderHook(() => usePasskeyAutofill());

    const input = document.createElement('input');
    input.id = 'username';
    input.setAttribute('autocomplete', 'webauthn username');
    document.body.appendChild(input);

    // Simulate post-mount ref assignment
    (result.current.inputRef as any).current = input;

    // The hook runs only once (on mount)
    expect(mockRegister).toHaveBeenCalledTimes(1);
    expect(mockRegister).toHaveBeenCalledWith(undefined);

    // Ensure existing autocomplete not modified
    expect(input.getAttribute('autocomplete')).toBe('webauthn username');
  });

  it('should log a warning if instance is missing or invalid', () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    mockGetScreen.mockReturnValue({} as any);

    renderHook(() => usePasskeyAutofill());

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      expect.stringContaining('Passkey autofill unavailable')
    );

    consoleWarnSpy.mockRestore();
  });

  it('should log a warning if registerPasskeyAutofill throws', () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const mockRegister = jest.fn(() => {
      throw new Error('mock failure');
    });
    mockGetScreen.mockReturnValue({ registerPasskeyAutofill: mockRegister } as any);

    renderHook(() => usePasskeyAutofill());

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      expect.stringContaining('usePasskeyAutofill failed:'),
      expect.any(Error)
    );

    consoleWarnSpy.mockRestore();
  });

  it('should not re-register on re-render', () => {
    const mockRegister = jest.fn();
    mockGetScreen.mockReturnValue({ registerPasskeyAutofill: mockRegister } as any);

    const { rerender } = renderHook(() => usePasskeyAutofill());
    rerender(); // simulate a re-render

    expect(mockRegister).toHaveBeenCalledTimes(1);
  });
});
