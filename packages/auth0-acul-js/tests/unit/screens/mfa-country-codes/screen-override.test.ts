import { ScreenOverride } from '../../../../src/screens/mfa-country-codes/screen-override';
import { Screen } from '../../../../src/models/screen';
import type { ScreenContext } from '../../../../interfaces/models/screen';

jest.mock('../../../../src/models/screen');

describe('ScreenOverride', () => {
  let screenContext: ScreenContext;
  let screenOverride: ScreenOverride;

  beforeEach(() => {
    screenContext = {
      name: 'mfa-country-codes',
      data: {
        phone_prefixes: [
          {
            country: 'United States',
            country_code: 'US',
            phone_prefix: '+1'
          },
          {
            country: 'United Kingdom',
            country_code: 'GB',
            phone_prefix: '+44'
          }
        ]
      }
    } as ScreenContext;
    screenOverride = new ScreenOverride(screenContext);
  });

  it('should initialize data correctly', () => {
    expect(screenOverride.data).toEqual({
      phone_prefixes: [
        {
          country: 'United States',
          country_code: 'US',
          phone_prefix: '+1'
        },
        {
          country: 'United Kingdom',
          country_code: 'GB',
          phone_prefix: '+44'
        }
      ]
    });
  });

  it('should return null for data when screenContext.data is undefined', () => {
    const emptyContext = {} as ScreenContext;
    const result = ScreenOverride.getScreenData(emptyContext);
    expect(result).toBeNull();
  });

  it.skip('should return empty array for phone_prefixes when data.phone_prefixes is not an array', () => {
    const invalidContext = {
      name: 'mfa-country-codes',
      data: {
        phone_prefixes: 'not an array'
      }
    } as ScreenContext;
    const result = ScreenOverride.getScreenData(invalidContext);
    expect(result).toEqual({
      phone_prefixes: []
    });
  });

  it('should create an instance of Screen', () => {
    expect(screenOverride).toBeInstanceOf(Screen);
  });
});