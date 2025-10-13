import { Screen } from '../../../../src/models/screen';
import { ScreenOverride } from '../../../../src/screens/signup-password/screen-override';
import { getLoginLink, getEditIdentifierLink } from '../../../../src/shared/screen';

import type { ScreenContextOnSignupPassword } from '../../../../interfaces/screens/signup-password';

jest.mock('../../../../src/shared/screen');
jest.mock('../../../../src/models/screen');

describe('ScreenOverride', () => {
  let screenContext: ScreenContextOnSignupPassword;
  let screenOverride: ScreenOverride;

  beforeEach(() => {
    screenContext = {
      name: 'signup-password',
      links: { login: 'mockLoginLink', edit_identifier: 'mockEditLink' },
      data: { 
        email: 'test@example.com',
        phone_number: '+1234567890',
        username: 'testuser'
      },
    } as ScreenContextOnSignupPassword;

    (getLoginLink as jest.Mock).mockReturnValue('mockLoginLink');
    (getEditIdentifierLink as jest.Mock).mockReturnValue('mockEditLink');

    screenOverride = new ScreenOverride(screenContext);
  });

  it('should initialize loginLink correctly', () => {
    expect(screenOverride.loginLink).toBe('mockLoginLink');
  });

  it('should initialize editLink correctly', () => {
    expect(screenOverride.editLink).toBe('mockEditLink');
  });

  it('should initialize data correctly with phoneNumber transformation', () => {
    expect(screenOverride.data).toEqual({
      email: 'test@example.com',
      phoneNumber: '+1234567890',
      username: 'testuser'
    });
  });

  it('should call getLoginLink with screenContext', () => {
    expect(getLoginLink).toHaveBeenCalledWith(screenContext);
  });

  it('should call getEditIdentifierLink with screenContext', () => {
    expect(getEditIdentifierLink).toHaveBeenCalledWith(screenContext);
  });

  describe('getScreenData', () => {
    it('should transform phone_number to phoneNumber', () => {
      const result = ScreenOverride.getScreenData(screenContext);
      expect(result).toEqual({
        email: 'test@example.com',
        phoneNumber: '+1234567890',
        username: 'testuser'
      });
    });

    it('should return null when no data is provided', () => {
      const contextWithoutData = {
        ...screenContext,
        data: null
      } as unknown as ScreenContextOnSignupPassword;
      
      const result = ScreenOverride.getScreenData(contextWithoutData);
      expect(result).toBeNull();
    });

    it('should handle missing phone_number field', () => {
      const contextWithoutPhone = {
        ...screenContext,
        data: {
          email: 'test@example.com',
          username: 'testuser'
        }
      } as ScreenContextOnSignupPassword;
      
      const result = ScreenOverride.getScreenData(contextWithoutPhone);
      expect(result).toEqual({
        email: 'test@example.com',
        phoneNumber: undefined,
        username: 'testuser'
      });
    });
  });

  it('should extend Screen class', () => {
    expect(screenOverride).toBeInstanceOf(Screen);
  });
});
