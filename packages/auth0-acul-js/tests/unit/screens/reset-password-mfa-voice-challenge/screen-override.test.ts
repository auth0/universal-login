import { ScreenOverride } from '../../../../src/screens/reset-password-mfa-voice-challenge/screen-override';
import { getEditIdentifierLink } from '../../../../src/shared/screen';
import type { ScreenContext } from '../../../../interfaces/models/screen';

// Mock dependencies
jest.mock('../../../../src/shared/screen', () => ({
  getEditIdentifierLink: jest.fn(() => 'MOCKED_EDIT_IDENTIFIER_LINK'),
}));

describe('ScreenOverride', () => {
  let screenContext: ScreenContext;
  let screenOverride: ScreenOverride;

  beforeEach(() => {
    screenContext = {
      name: 'reset-password',
      data: {
        phone_number: '9999999999',
      },
      links: {
        edit_identifier: 'EDIT_IDENTIFIER_LINK',
        other_link: 'OTHER_LINK',
      },
    } as ScreenContext;

    screenOverride = new ScreenOverride(screenContext);
  });

  it('should initialize data correctly', () => {
    expect(screenOverride.data).toEqual({
      phoneNumber: '9999999999',
    });
  });

  it('should map edit_identifier to editIdentifier in links', () => {
    expect(screenOverride.links).toHaveProperty('editIdentifier', 'EDIT_IDENTIFIER_LINK');
  });

  it('should retain other links if present', () => {
    expect(screenOverride.links).toMatchObject({
      other_link: 'OTHER_LINK',
    });
  });

  it('should call getEditIdentifierLink and set editIdentifierLink', () => {
    expect(getEditIdentifierLink).toHaveBeenCalledWith(screenContext);
    expect(screenOverride.editIdentifierLink).toBe('MOCKED_EDIT_IDENTIFIER_LINK');
  });

  it('should return null for data if screenContext.data is missing', () => {
    screenContext.data = undefined;
    const override = new ScreenOverride(screenContext);
    expect(override.data).toBeNull();
  });

  it('should return null for links if screenContext.links is missing', () => {
    screenContext.links = undefined;
    const override = new ScreenOverride(screenContext);
    expect(override.links).toBeNull();
  });
});
