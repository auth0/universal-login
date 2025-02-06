import {
  isBrave,
  isWebAuthAvailable,
  isJsAvailable,
  isWebAuthPlatformAvailable,
} from '../../../src/utils/browser-capabilities';

describe('isBrave', () => {
  let navigatorSpy: jest.SpyInstance;

  afterEach(() => {
    jest.restoreAllMocks(); // Reset mocks after each test
  });

  it('should return true if the browser is Brave and isBrave() resolves to true', async () => {
    navigatorSpy = jest.spyOn(global, 'navigator', 'get').mockReturnValue({
      brave: { isBrave: jest.fn().mockResolvedValue(true) },
    } as unknown as Navigator);

    await expect(isBrave()).resolves.toBe(true);
  });

  it('should return false if the browser is Brave but isBrave() resolves to false', async () => {
    navigatorSpy = jest.spyOn(global, 'navigator', 'get').mockReturnValue({
      brave: { isBrave: jest.fn().mockResolvedValue(false) },
    } as unknown as Navigator);

    await expect(isBrave()).resolves.toBe(false);
  });

  it('should return false if the browser is not Brave (no `navigator.brave` property)', async () => {
    navigatorSpy = jest.spyOn(global, 'navigator', 'get').mockReturnValue({
      brave: undefined,
    } as unknown as Navigator);

    await expect(isBrave()).resolves.toBe(false);
  });

  it('should return false if `navigator.brave` exists but `isBrave` method is missing', async () => {
    navigatorSpy = jest.spyOn(global, 'navigator', 'get').mockReturnValue({
      brave: {},
    } as unknown as Navigator);

    await expect(isBrave()).resolves.toBe(false);
  });

  it('should return false if `isBrave()` throws an error', async () => {
    navigatorSpy = jest.spyOn(global, 'navigator', 'get').mockReturnValue({
      brave: { isBrave: jest.fn().mockRejectedValue(new Error('Some error')) },
    } as unknown as Navigator);

    await expect(isBrave()).resolves.toBe(false);
  });

  it('should return false if `navigator` is undefined (e.g., in SSR environments)', async () => {
    navigatorSpy = jest.spyOn(global, 'navigator', 'get').mockReturnValue(undefined as any);

    await expect(isBrave()).resolves.toBe(false);
  });
});

describe('isWebAuthAvailable', () => {
  let windowSpy: jest.SpyInstance;

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return true if PublicKeyCredential is defined', () => {
    windowSpy = jest.spyOn(global, 'window', 'get').mockReturnValue({
      ...global.window, // Preserve other properties
      PublicKeyCredential: jest.fn(), // Mock PublicKeyCredential
    } as unknown as Window & typeof globalThis);
    

    expect(isWebAuthAvailable()).toBe(true);
  });

  it('should return false if PublicKeyCredential is undefined', () => {
    windowSpy = jest.spyOn(global, 'window', 'get').mockReturnValue({
      ...global.window, // Preserve other properties
      PublicKeyCredential: undefined,
    } as unknown as Window & typeof globalThis);
    

    expect(isWebAuthAvailable()).toBe(false);
  });
});

describe('isJsAvailable', () => {
  it('should always return true', () => {
    expect(isJsAvailable()).toBe(true);
  });
});

describe('isWebAuthPlatformAvailable', () => {
  let windowSpy: jest.SpyInstance;

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return true if isUserVerifyingPlatformAuthenticatorAvailable resolves to true', async () => {
    windowSpy = jest.spyOn(global, 'window', 'get').mockReturnValue({
      ...global.window, // Preserve other window properties
      PublicKeyCredential: {
        isUserVerifyingPlatformAuthenticatorAvailable: jest.fn().mockResolvedValue(true),
      },
    } as unknown as Window & typeof globalThis);
    

    await expect(isWebAuthPlatformAvailable()).resolves.toBe(true);
  });

  it('should return false if isUserVerifyingPlatformAuthenticatorAvailable resolves to false', async () => {
    windowSpy = jest.spyOn(global, 'window', 'get').mockReturnValue({
      ...global.window, // Preserve other window properties
      PublicKeyCredential: {
        isUserVerifyingPlatformAuthenticatorAvailable: jest.fn().mockResolvedValue(false),
      },
    } as unknown as Window & typeof globalThis);
    

    await expect(isWebAuthPlatformAvailable()).resolves.toBe(false);
  });

  it('should return false if PublicKeyCredential is undefined', async () => {
    windowSpy = jest.spyOn(global, 'window', 'get').mockReturnValue({
      ...global.window,
    } as unknown as Window & typeof globalThis);
    await expect(isWebAuthPlatformAvailable()).resolves.toBe(false);
  });

  it('should return false if isUserVerifyingPlatformAuthenticatorAvailable throws an error', async () => {
    windowSpy = jest.spyOn(global, 'window', 'get').mockReturnValue({
      ...global.window, // Preserve existing window properties
      PublicKeyCredential: {
        isUserVerifyingPlatformAuthenticatorAvailable: jest
          .fn()
          .mockRejectedValue(new Error('Something went wrong')),
      },
    } as unknown as Window & typeof globalThis);    

    await expect(isWebAuthPlatformAvailable()).resolves.toBe(false);
  });
});
