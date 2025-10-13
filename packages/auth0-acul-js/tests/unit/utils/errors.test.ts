import { AculError, UserInputError, SDKUsageError } from '../../../src/utils/errors';

describe('AculError hierarchy', () => {
  test('AculError: basic shape, code, instanceof, name, stack', () => {
    const err = new AculError('base message');

    expect(err).toBeInstanceOf(Error);
    expect(err).toBeInstanceOf(AculError);
    expect(err).not.toBeInstanceOf(UserInputError);
    expect(err).not.toBeInstanceOf(SDKUsageError);

    expect(err.name).toBe('AculError');
    expect(err.message).toBe('base message');
    expect(err.code).toBe('ACUL_ERROR');
    expect(err.field).toBeUndefined();

    // Stack should exist and include the class name (format may vary by runtime)
    expect(typeof err.stack).toBe('string');
    expect(err.stack).toEqual(expect.stringContaining('AculError'));
    // toString usually includes "<Name>: <message>"
    expect(String(err)).toEqual(expect.stringContaining('AculError'));
    expect(String(err)).toEqual(expect.stringContaining('base message'));
  });

  test('AculError: accepts optional field', () => {
    const err = new AculError('with field', 'generic');
    expect(err.field).toBe('generic');
    expect(err.code).toBe('ACUL_ERROR');
  });

  test('UserInputError: shape, code, instanceof chain, name, stack', () => {
    const err = new UserInputError('password policy mismatch');

    // instanceof chain is intact
    expect(err).toBeInstanceOf(Error);
    expect(err).toBeInstanceOf(AculError);
    expect(err).toBeInstanceOf(UserInputError);
    expect(err).not.toBeInstanceOf(SDKUsageError);

    // metadata
    expect(err.name).toBe('UserInputError');
    expect(err.message).toBe('password policy mismatch');
    expect(err.code).toBe('USER_INPUT_ERROR');
    expect(err.field).toBeUndefined();

    // Prototype chain points to the concrete subclass
    const protoCtorName = Object.getPrototypeOf(err).constructor.name;
    expect(protoCtorName).toBe('UserInputError');

    // stack/toString sanity
    expect(typeof err.stack).toBe('string');
    expect(err.stack).toEqual(expect.stringContaining('UserInputError'));
    expect(String(err)).toEqual(expect.stringContaining('UserInputError'));
    expect(String(err)).toEqual(expect.stringContaining('password policy mismatch'));
  });

  test('UserInputError: optional field is propagated', () => {
    const err = new UserInputError('Password too short', 'password');
    expect(err.field).toBe('password');
    expect(err.code).toBe('USER_INPUT_ERROR');
  });

  test('SDKUsageError: shape, code, instanceof chain, name, stack', () => {
    const err = new SDKUsageError('Missing required "username" parameter');

    expect(err).toBeInstanceOf(Error);
    expect(err).toBeInstanceOf(AculError);
    expect(err).toBeInstanceOf(SDKUsageError);
    expect(err).not.toBeInstanceOf(UserInputError);

    expect(err.name).toBe('SDKUsageError');
    expect(err.message).toBe('Missing required "username" parameter');
    expect(err.code).toBe('SDK_USAGE_ERROR');
    expect(err.field).toBeUndefined();

    const protoCtorName = Object.getPrototypeOf(err).constructor.name;
    expect(protoCtorName).toBe('SDKUsageError');

    expect(typeof err.stack).toBe('string');
    expect(err.stack).toEqual(expect.stringContaining('SDKUsageError'));
    expect(String(err)).toEqual(expect.stringContaining('SDKUsageError'));
    expect(String(err)).toEqual(expect.stringContaining('Missing required "username" parameter'));
  });

  test('SDKUsageError: optional field is propagated', () => {
    const err = new SDKUsageError('username is required', 'username');
    expect(err.field).toBe('username');
    expect(err.code).toBe('SDK_USAGE_ERROR');
  });

  test('Thrown & caught errors preserve instanceof across try/catch', () => {
    let caught: unknown;
    try {
      throw new UserInputError('bad input', 'password');
    } catch (e) {
      caught = e;
    }

    expect(caught).toBeInstanceOf(Error);
    expect(caught).toBeInstanceOf(AculError);
    expect(caught).toBeInstanceOf(UserInputError);
    expect((caught as AculError).code).toBe('USER_INPUT_ERROR');
    expect((caught as AculError).field).toBe('password');
  });

  test('Prototype repair: instanceof works reliably for subclasses', () => {
    const u = new UserInputError('x');
    const s = new SDKUsageError('y');

    expect(u instanceof UserInputError).toBe(true);
    expect(u instanceof AculError).toBe(true);
    expect(u instanceof Error).toBe(true);

    expect(s instanceof SDKUsageError).toBe(true);
    expect(s instanceof AculError).toBe(true);
    expect(s instanceof Error).toBe(true);
  });

  test('Code constants per class remain distinct', () => {
    const base = new AculError('m');
    const u = new UserInputError('m');
    const s = new SDKUsageError('m');

    expect(base.code).toBe('ACUL_ERROR');
    expect(u.code).toBe('USER_INPUT_ERROR');
    expect(s.code).toBe('SDK_USAGE_ERROR');
  });

  test('Empty message is still valid and preserved', () => {
    const u = new UserInputError('', 'password');
    expect(u.message).toBe('');
    expect(u.field).toBe('password');
    expect(String(u)).toEqual(expect.stringContaining('UserInputError'));
  });
});
