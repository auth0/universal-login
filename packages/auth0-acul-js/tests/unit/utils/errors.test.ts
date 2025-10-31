import { AculError, ValidationError, ConfigurationError } from '../../../src/utils/errors';

describe('AculError hierarchy', () => {
  test('AculError: basic shape, code, instanceof, name, stack', () => {
    const err = new AculError('base message');

    expect(err).toBeInstanceOf(Error);
    expect(err).toBeInstanceOf(AculError);
    expect(err).not.toBeInstanceOf(ValidationError);
    expect(err).not.toBeInstanceOf(ConfigurationError);

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

  test('ValidationError: shape, code, instanceof chain, name, stack', () => {
    const err = new ValidationError('password policy mismatch');

    // instanceof chain is intact
    expect(err).toBeInstanceOf(Error);
    expect(err).toBeInstanceOf(AculError);
    expect(err).toBeInstanceOf(ValidationError);
    expect(err).not.toBeInstanceOf(ConfigurationError);

    // metadata
    expect(err.name).toBe('ValidationError');
    expect(err.message).toBe('password policy mismatch');
    expect(err.code).toBe('USER_INPUT_ERROR');
    expect(err.field).toBeUndefined();

    // Prototype chain points to the concrete subclass
    const protoCtorName = Object.getPrototypeOf(err).constructor.name;
    expect(protoCtorName).toBe('ValidationError');

    // stack/toString sanity
    expect(typeof err.stack).toBe('string');
    expect(err.stack).toEqual(expect.stringContaining('ValidationError'));
    expect(String(err)).toEqual(expect.stringContaining('ValidationError'));
    expect(String(err)).toEqual(expect.stringContaining('password policy mismatch'));
  });

  test('ValidationError: optional field is propagated', () => {
    const err = new ValidationError('Password too short', 'password');
    expect(err.field).toBe('password');
    expect(err.code).toBe('USER_INPUT_ERROR');
  });

  test('ConfigurationError: shape, code, instanceof chain, name, stack', () => {
    const err = new ConfigurationError('Missing required "username" parameter');

    expect(err).toBeInstanceOf(Error);
    expect(err).toBeInstanceOf(AculError);
    expect(err).toBeInstanceOf(ConfigurationError);
    expect(err).not.toBeInstanceOf(ValidationError);

    expect(err.name).toBe('ConfigurationError');
    expect(err.message).toBe('Missing required "username" parameter');
    expect(err.code).toBe('SDK_USAGE_ERROR');
    expect(err.field).toBeUndefined();

    const protoCtorName = Object.getPrototypeOf(err).constructor.name;
    expect(protoCtorName).toBe('ConfigurationError');

    expect(typeof err.stack).toBe('string');
    expect(err.stack).toEqual(expect.stringContaining('ConfigurationError'));
    expect(String(err)).toEqual(expect.stringContaining('ConfigurationError'));
    expect(String(err)).toEqual(expect.stringContaining('Missing required "username" parameter'));
  });

  test('ConfigurationError: optional field is propagated', () => {
    const err = new ConfigurationError('username is required', 'username');
    expect(err.field).toBe('username');
    expect(err.code).toBe('SDK_USAGE_ERROR');
  });

  test('Thrown & caught errors preserve instanceof across try/catch', () => {
    let caught: unknown;
    try {
      throw new ValidationError('bad input', 'password');
    } catch (e) {
      caught = e;
    }

    expect(caught).toBeInstanceOf(Error);
    expect(caught).toBeInstanceOf(AculError);
    expect(caught).toBeInstanceOf(ValidationError);
    expect((caught as AculError).code).toBe('USER_INPUT_ERROR');
    expect((caught as AculError).field).toBe('password');
  });

  test('Prototype repair: instanceof works reliably for subclasses', () => {
    const u = new ValidationError('x');
    const s = new ConfigurationError('y');

    expect(u instanceof ValidationError).toBe(true);
    expect(u instanceof AculError).toBe(true);
    expect(u instanceof Error).toBe(true);

    expect(s instanceof ConfigurationError).toBe(true);
    expect(s instanceof AculError).toBe(true);
    expect(s instanceof Error).toBe(true);
  });

  test('Code constants per class remain distinct', () => {
    const base = new AculError('m');
    const u = new ValidationError('m');
    const s = new ConfigurationError('m');

    expect(base.code).toBe('ACUL_ERROR');
    expect(u.code).toBe('USER_INPUT_ERROR');
    expect(s.code).toBe('SDK_USAGE_ERROR');
  });

  test('Empty message is still valid and preserved', () => {
    const u = new ValidationError('', 'password');
    expect(u.message).toBe('');
    expect(u.field).toBe('password');
    expect(String(u)).toEqual(expect.stringContaining('ValidationError'));
  });
});
