import { Screen } from '../../../../src/models/screen'; // Ensure Screen model is imported for instanceof check
import { ScreenOverride } from '../../../../src/screens/mfa-recovery-code-challenge-new-code/screen-override';

import type { ScreenContext } from '../../../../interfaces/models/screen';

describe('MfaRecoveryCodeChallengeNewCode ScreenOverride', () => {
  it('should correctly initialize with valid screen context data containing text_code', () => {
    const testCode = 'NEW-CODE-12345';
    const screenContext: ScreenContext = {
      name: 'mfa-recovery-code-challenge-new-code',
      data: {
        text_code: testCode,
        other_data: 'irrelevant', // Extra data should be ignored
      },
    } as ScreenContext;

    const screenOverride = new ScreenOverride(screenContext);

    expect(screenOverride).toBeInstanceOf(Screen); // Check inheritance
    expect(screenOverride.data).toBeDefined();
    expect(screenOverride.data).toEqual({
      textCode: testCode, // Ensure correct mapping and value
    });
  });

  it('should return null for data when screenContext.data is missing', () => {
    const screenContext: ScreenContext = {
      name: 'mfa-recovery-code-challenge-new-code',
      data: undefined, // Data object is missing
    } as ScreenContext;

    const screenOverride = new ScreenOverride(screenContext);
    expect(screenOverride.data).toBeNull();
  });

   it('should return null for data when screenContext.data is null', () => {
    const screenContext: ScreenContext = {
      name: 'mfa-recovery-code-challenge-new-code',
      data: null as any, // Explicitly null
    } as ScreenContext;

    const screenOverride = new ScreenOverride(screenContext);
    expect(screenOverride.data).toBeNull();
  });

  it('should return null for data when text_code property is missing in data', () => {
    const screenContext: ScreenContext = {
      name: 'mfa-recovery-code-challenge-new-code',
      data: {
        some_other_key: 'value', // text_code is missing
      },
    } as ScreenContext;

    const screenOverride = new ScreenOverride(screenContext);
    expect(screenOverride.data).toBeNull();
  });

  it('should return null for data when text_code is not a string', () => {
    const screenContext: ScreenContext = {
      name: 'mfa-recovery-code-challenge-new-code',
      data: {
        // text_code is now explicitly typed in ScreenData,
        // so passing a number directly would be a TS error earlier.
        // Test with a non-string value that fits the index signature but isn't expected.
        text_code: 12345 as any, // Cast to any to bypass TS check for test case
      },
    } as ScreenContext;

    const screenOverride = new ScreenOverride(screenContext);
    // The getScreenData logic specifically checks `typeof data.text_code === 'string'`
    expect(screenOverride.data).toBeNull();
  });

  it('should return null for data when text_code is an empty string', () => {
    const screenContext: ScreenContext = {
      name: 'mfa-recovery-code-challenge-new-code',
      data: {
        text_code: '', // Recovery code is an empty string (should be invalid)
      },
    } as ScreenContext;

    const screenOverride = new ScreenOverride(screenContext);
    expect(screenOverride.data).toBeNull();
  });

  // Static method test
  describe('getScreenData static method', () => {
    it('should extract text_code correctly when present and valid', () => {
      const testCode = 'STATIC-TEST-CODE';
      const screenContext: ScreenContext = {
        name: 'mfa-recovery-code-challenge-new-code',
        data: {
          text_code: testCode,
        },
      } as ScreenContext;

      const data = ScreenOverride.getScreenData(screenContext);
      expect(data).toEqual({ textCode: testCode });
    });

    it('should return null if data object is missing', () => {
      const screenContext: ScreenContext = {
        name: 'mfa-recovery-code-challenge-new-code',
      } as ScreenContext; // No data property

      const data = ScreenOverride.getScreenData(screenContext);
      expect(data).toBeNull();
    });

    it('should return null if text_code property is missing in data', () => {
      const screenContext: ScreenContext = {
        name: 'mfa-recovery-code-challenge-new-code',
        data: { another_prop: 'value' }, // text_code missing
      } as ScreenContext;

      const data = ScreenOverride.getScreenData(screenContext);
      expect(data).toBeNull();
    });

    it('should return null if text_code is not a string type', () => {
        const screenContext: ScreenContext = {
          name: 'mfa-recovery-code-challenge-new-code',
           // Cast to any to bypass TS check for test case
          data: { text_code: 123 as any }, // Not a string
        } as ScreenContext;

        const data = ScreenOverride.getScreenData(screenContext);
        expect(data).toBeNull();
      });

    it('should return null if text_code is an empty string', () => {
        const screenContext: ScreenContext = {
            name: 'mfa-recovery-code-challenge-new-code',
            data: { text_code: '' }, // Empty string
        } as ScreenContext;

        const data = ScreenOverride.getScreenData(screenContext);
        expect(data).toBeNull();
        });
  });
});