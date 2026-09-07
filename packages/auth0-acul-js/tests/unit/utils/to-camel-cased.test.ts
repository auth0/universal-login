import { toCamelCased } from '../../../src/utils/to-camel-cased';

describe('toCamelCased', () => {
  it('should convert snake_case keys to camelCase', () => {
    const input = {
      first_name: 'John',
      last_name: 'Doe',
      nested_object: {
        inner_key: 'value'
      }
    };
    const expected = {
      firstName: 'John',
      lastName: 'Doe',
      nestedObject: {
        innerKey: 'value'
      }
    };
    expect(toCamelCased(input)).toEqual(expected);
  });
});