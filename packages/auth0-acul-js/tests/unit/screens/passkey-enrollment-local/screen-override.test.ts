import { ScreenOverride } from '../../../../src/screens/passkey-enrollment-local/screen-override';
import { getPublicKey } from '../../../../src/shared/screen';
import { Screen } from '../../../../src/models/screen';
import type { ScreenContext } from '../../../../interfaces/models/screen';

jest.mock('../../../../src/shared/screen');
jest.mock('../../../../src/models/screen');

describe('ScreenOverride', () => {
  let screenContext: ScreenContext;
  let screenOverride: ScreenOverride;

  beforeEach(() => {
    screenContext = {} as ScreenContext;

    (getPublicKey as jest.Mock).mockReturnValue({ key: 'mockPublicKey' });

    screenOverride = new ScreenOverride(screenContext);
  });

  it('should initialize publicKey correctly', () => {
    expect(screenOverride.publicKey).toEqual({ key: 'mockPublicKey' });
  });

  it('should call getPublicKey with correct screenContext', () => {
    expect(getPublicKey).toHaveBeenCalledWith(screenContext);
  });

  it('should create an instance of Screen', () => {
    expect(screenOverride).toBeInstanceOf(Screen);
  });

  it('should handle missing screenContext properties gracefully', () => {
    (getPublicKey as jest.Mock).mockReturnValue(undefined);

    const emptyScreenOverride = new ScreenOverride({} as ScreenContext);

    expect(emptyScreenOverride.publicKey).toBeUndefined();
  });
});
