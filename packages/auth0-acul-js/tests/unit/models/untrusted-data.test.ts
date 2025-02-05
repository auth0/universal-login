import { UntrustedData } from '../../../src/models/untrusted-data';
import type { UntrustedDataContext, UntrustedDataMembers } from '../../../interfaces/models/untrusted-data';

describe('UntrustedData', () => {
  let untrustedDataContext: UntrustedDataContext;
  let untrustedData: UntrustedData;

  beforeEach(() => {
    untrustedDataContext = {
      submitted_form_data: { username: 'testUser', email: 'test@example.com' },
      authorization_params: {
        login_hint: 'testLoginHint',
        screen_hint: 'signup',
        ui_locales: 'en'
      },
    };

    untrustedData = new UntrustedData(untrustedDataContext);
  });

  it('should initialize submittedFormData correctly', () => {
    expect(untrustedData.submittedFormData).toEqual({
      username: 'testUser',
      email: 'test@example.com',
    });
  });

  it('should initialize authorizationParams correctly', () => {
    expect(untrustedData.authorizationParams).toEqual({
      login_hint: 'testLoginHint',
      screen_hint: 'signup',
      ui_locales: 'en'
    });
  });

  describe('getSubmittedFormData', () => {
    it('should return submitted form data when available', () => {
      expect(UntrustedData.getSubmittedFormData(untrustedDataContext)).toEqual({
        username: 'testUser',
        email: 'test@example.com',
      });
    });

    it('should return null if submitted_form_data is missing', () => {
      expect(UntrustedData.getSubmittedFormData({} as UntrustedDataContext)).toBeNull();
    });

    it('should return null if untrustedData is undefined', () => {
      expect(UntrustedData.getSubmittedFormData(undefined)).toBeNull();
    });
  });

  describe('getAuthorizationParams', () => {
    it('should return authorization params when available', () => {
      expect(UntrustedData.getAuthorizationParams(untrustedDataContext)).toEqual({
        login_hint: 'testLoginHint',
        screen_hint: 'signup',
        ui_locales: 'en'
      });
    });

    it('should return null if authorization_params is missing', () => {
      expect(UntrustedData.getAuthorizationParams({} as UntrustedDataContext)).toBeNull();
    });

    it('should return null if untrustedData is undefined', () => {
      expect(UntrustedData.getAuthorizationParams(undefined)).toBeNull();
    });

    it('should correctly extract specific properties when provided', () => {
      const partialData = {
        authorization_params: {
          login_hint: 'hintOnly',
        },
      } as UntrustedDataContext;

      expect(UntrustedData.getAuthorizationParams(partialData)).toEqual({
        login_hint: 'hintOnly',
      });
    });
  });
});
