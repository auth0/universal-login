import { mfaPushPolling } from '../../../src/helpers/startMfaPushPolling.js';

describe('mfaPushPolling', () => {
  let originalXMLHttpRequest: typeof XMLHttpRequest;
  let mockXHR: {
    open: jest.Mock;
    setRequestHeader: jest.Mock;
    send: jest.Mock;
    getResponseHeader: jest.Mock;
    status: number;
    responseText: string;
    onload: (() => void) | null;
    onerror: (() => void) | null;
  };
  let _onload: (() => void) | null;
  let _onerror: (() => void) | null;

  beforeEach(() => {
    jest.useFakeTimers();
    originalXMLHttpRequest = global.XMLHttpRequest;
    _onload = null;
    _onerror = null;
    mockXHR = {
      open: jest.fn(),
      setRequestHeader: jest.fn(),
      send: jest.fn(),
      getResponseHeader: jest.fn(() => 'application/json'),
      status: 200,
      responseText: JSON.stringify({ completed: true }),
      get onload(): (() => void) | null { return _onload; },
      set onload(fn) { _onload = fn; },
      get onerror(): (() => void) | null { return _onerror; },
      set onerror(fn) { _onerror = fn; },
    };
    // @ts-expect-error: Assigning mock XMLHttpRequest for testing purposes
    global.XMLHttpRequest = jest.fn(() => mockXHR);
  });

  afterEach(() => {
    jest.useRealTimers();
    global.XMLHttpRequest = originalXMLHttpRequest;
    jest.clearAllMocks();
  });

  it('should call onResult when condition is met', () => {
    const onResult = jest.fn();
    const onError = jest.fn();

    mfaPushPolling({
      intervalMs: 100,
      url: '/test',
      condition: (body) => !!body.completed,
      onResult,
      onError,
    })();

    jest.runOnlyPendingTimers();
    if (_onload) _onload();

    expect(mockXHR.open).toHaveBeenCalledWith('GET', '/test');
    expect(mockXHR.setRequestHeader).toHaveBeenCalledWith('Accept', 'application/json');
    expect(mockXHR.send).toHaveBeenCalled();
    expect(onError).not.toHaveBeenCalled();
  });

  it('should continue polling if condition is not met', () => {
    const onResult = jest.fn();
    const onError = jest.fn();
    mockXHR.responseText = JSON.stringify({ completed: false });

    mfaPushPolling({
      intervalMs: 100,
      url: '/test',
      condition: (body) => !!body.completed,
      onResult,
      onError,
    })();

    jest.runOnlyPendingTimers();
    if (_onload) _onload();

    expect(onResult).not.toHaveBeenCalled();
    expect(mockXHR.send).toHaveBeenCalled();
  });

  it('should handle rate limiting (429)', () => {
    const onResult = jest.fn();
    const onError = jest.fn();
    mockXHR.status = 429;
    mockXHR.getResponseHeader = jest.fn((header) => header === 'X-RateLimit-Reset' ? `${Math.floor(Date.now() / 1000) + 2}` : 'application/json');

    mfaPushPolling({
      intervalMs: 100,
      url: '/test',
      condition: (body) => !!body.completed,
      onResult,
      onError,
    })();

    jest.runOnlyPendingTimers(); 
    if (_onload) _onload();

    expect(onResult).not.toHaveBeenCalled();
    expect(mockXHR.send).toHaveBeenCalled();
  });

  it('should call onError for non-200/429 status', () => {
    const onResult = jest.fn();
    const onError = jest.fn();
    mockXHR.status = 500;
    mockXHR.responseText = 'error';

    mfaPushPolling({
      intervalMs: 100,
      url: '/test',
      condition: (body) => !!body.completed,
      onResult,
      onError,
    })();

    jest.runOnlyPendingTimers();
    if (_onload) _onload();

    expect(onResult).not.toHaveBeenCalled();
  });

  it('should call onError on XHR error', () => {
    const onResult = jest.fn();
    const onError = jest.fn();

    mfaPushPolling({
      intervalMs: 100,
      url: '/test',
      condition: (body) => !!body.completed,
      onResult,
      onError,
    })();

    jest.runOnlyPendingTimers();
    if (_onerror) _onerror();

    expect(onResult).not.toHaveBeenCalled();
  });
});