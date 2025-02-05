import { ScreenOverride } from '../../../../src/screens/passkey-enrollment/screen-override';
import { getBackLink, getLoginLink, getPublicKey } from '../../../../src/shared/screen';
import { Screen } from '../../../../src/models/screen';
import type { ScreenContext } from '../../../../interfaces/models/screen';

jest.mock('../../../../src/shared/screen');
jest.mock('../../../../src/models/screen');

describe('ScreenOverride', () => {
  let screenContext: ScreenContext;
  let screenOverride: ScreenOverride;

  beforeEach(() => {
    screenContext = {} as ScreenContext;

    (getLoginLink as jest.Mock).mockReturnValue('mockLoginLink');
    (getBackLink as jest.Mock).mockReturnValue('mockBackLink');
    (getPublicKey as jest.Mock).mockReturnValue({ key: 'mockPublicKey' });

    screenOverride = new ScreenOverride(screenContext);
  });

  it('should initialize loginLink correctly', () => {
    expect(screenOverride.loginLink).toBe('mockLoginLink');
  });

  it('should initialize backLink correctly', () => {
    expect(screenOverride.backLink).toBe('mockBackLink');
  });

  it('should initialize publicKey correctly', () => {
    expect(screenOverride.publicKey).toEqual({ key: 'mockPublicKey' });
  });

  it('should call getPublicKey with correct screenContext', () => {
    expect(getPublicKey).toHaveBeenCalledWith(screenContext);
  });

  it('should call getLoginLink and getBackLink with correct screenContext', () => {
    expect(getLoginLink).toHaveBeenCalledWith(screenContext);
    expect(getBackLink).toHaveBeenCalledWith(screenContext);
  });

  it('should create an instance of Screen', () => {
    expect(screenOverride).toBeInstanceOf(Screen);
  });

  it('should handle missing screenContext properties gracefully', () => {
    (getPublicKey as jest.Mock).mockReturnValue(undefined);

    const emptyScreenOverride = new ScreenOverride({} as ScreenContext);

    expect(emptyScreenOverride.publicKey).toBeUndefined();
  });

  it('should return publicKey using static getPublicKey method', () => {
    const publicKey = ScreenOverride.getPublicKey(screenContext);
    expect(publicKey).toEqual({ key: 'mockPublicKey' });
    expect(getPublicKey).toHaveBeenCalledWith(screenContext);
  });
});
