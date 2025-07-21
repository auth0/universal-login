import { Screen } from '../../../../src/models/screen';
import { ScreenOverride } from '../../../../src/screens/email-verification-result/screen-override';

import type { ScreenContext } from '../../../../interfaces/models/screen';

describe('EmailVerificationResult ScreenOverride', () => {
  /**
   * Test suite for the constructor and data parsing.
   */
  describe('constructor and data parsing', () => {
    it('should correctly initialize with valid screen context data', () => {
      const screenContext: ScreenContext = {
        name: 'email-verification-result',
        data: {
          status: 'success', // Example status
        },
        links: {
          login: '/login-url', // Example login link
        },
      } as ScreenContext; // Cast to ScreenContext for test purposes

      const screenOverride = new ScreenOverride(screenContext);

      // Check inheritance
      expect(screenOverride).toBeInstanceOf(Screen);

      // Check parsed data
      expect(screenOverride.data).toBeDefined();
      expect(screenOverride.data).toEqual({
        status: 'success',
      });

      // Check parsed links (inherited and typed)
      expect(screenOverride.links).toBeDefined();
      expect(screenOverride.links).toEqual({
        login: '/login-url',
      });
    });

    it('should return null for data.status if status is missing in screenContext.data', () => {
      const screenContextMissingStatus: ScreenContext = {
        name: 'email-verification-result',
        data: {
          // status is missing
        },
        links: { login: '/login-url' },
      } as ScreenContext;
      let screenOverride = new ScreenOverride(screenContextMissingStatus);
      expect(screenOverride.data).toBeNull();

      const screenContextInvalidStatus: ScreenContext = {
        name: 'email-verification-result',
        links: { login: '/login-url' },
      } as ScreenContext;
      screenOverride = new ScreenOverride(screenContextInvalidStatus);
      expect(screenOverride.data).toBeNull();
    });

    it('should return null for data if screenContext.data itself is missing', () => {
      const screenContextNoData: ScreenContext = {
        name: 'email-verification-result',
        // data property is missing
        links: { login: '/login-url' },
      } as ScreenContext;
      const screenOverride = new ScreenOverride(screenContextNoData);
      expect(screenOverride.data).toBeNull();
    });

    it('should correctly handle links if screenContext.links is missing or login link is absent', () => {
      const screenContextNoLinks: ScreenContext = {
        name: 'email-verification-result',
        data: { status: 'failure' },
        // links property is missing
      } as ScreenContext;
      let screenOverride = new ScreenOverride(screenContextNoLinks);
      // Base Screen class initializes links to null if screenContext.links is undefined.
      expect(screenOverride.links).toBeNull();

      const screenContextNoLoginLink: ScreenContext = {
        name: 'email-verification-result',
        data: { status: 'failure' },
        links: {
          // login link is missing
        },
      } as ScreenContext;
      screenOverride = new ScreenOverride(screenContextNoLoginLink);
      // The type cast `as OverrideOptions['links']` expects `login` to be there.
      // The base Screen would have `links` as an object, but `login` would be undefined.
      // For strong typing, if `login` is mandatory per interface, this implies an issue with context.
      // Here, we test how the base `Screen` populates it.
      expect(screenOverride.loginLink).toBeNull(); // Base Screen model populates it as an empty object if links is present but login isn't
    });
  });

  /**
   * Test suite for the static getScreenData method.
   */
  describe('getScreenData static method', () => {
    it('should extract status correctly when present and valid', () => {
      const screenContext: ScreenContext = {
        name: 'email-verification-result',
        data: { status: 'already_verified' },
      } as ScreenContext;
      const data = ScreenOverride.getScreenData(screenContext);
      expect(data).toEqual({ status: 'already_verified' });
    });

    it('should return null if data object is missing', () => {
      const screenContext: ScreenContext = {
        name: 'email-verification-result',
        // no data property
      } as ScreenContext;
      const data = ScreenOverride.getScreenData(screenContext);
      expect(data).toBeNull();
    });

    it('should return null if status property is missing in data', () => {
      const screenContext: ScreenContext = {
        name: 'email-verification-result',
        data: { other_prop: 'value' }, // status missing
      } as ScreenContext;
      const data = ScreenOverride.getScreenData(screenContext);
      expect(data).toBeNull();
    });
  });
});