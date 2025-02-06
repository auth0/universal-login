import { FormHandler } from '../../../src/utils/form-handler';
import type { FormOptions, PostPayloadOptions } from '../../../interfaces/utils/form-handler';

describe('FormHandler', () => {
  let formHandler: FormHandler;
  let options: FormOptions;
  const currentLocation = window.location.href;

  beforeEach(() => {
    options = { route: '/submit', state: 'testState' };
    formHandler = new FormHandler(options);
    jest.spyOn(document.body, 'appendChild').mockImplementation((node: Node) => node);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    document.body.innerHTML = '';
  });

  it('should initialize FormHandler with provided options', () => {
    expect(formHandler.options).toEqual(options);
  });

  it('should build a form with correct attributes and hidden inputs', () => {
    const payload: PostPayloadOptions = { key1: 'value1', key2: 'value2', state: options.state };
    
    const form = formHandler['buildForm'](payload); // Access private method via bracket notation
  
    expect(form.tagName.toUpperCase()).toBe('FORM');
    expect(form.method.toUpperCase()).toBe('POST');
    expect(form.action).toBe(`${ currentLocation }submit`);
  
    // Check that all inputs are correctly created
    const inputs = form.querySelectorAll('input');
    expect(inputs.length).toBe(3);
    expect(inputs[0].name).toBe('key1');
    expect(inputs[0].value).toBe('value1');
    expect(inputs[1].name).toBe('key2');
    expect(inputs[1].value).toBe('value2');
    expect(inputs[2].name).toBe('state');
    expect(inputs[2].value).toBe('testState');
  });

  it('should handle an empty payload gracefully', () => {
    const form = formHandler['buildForm']({ state: options.state });

    expect(form.tagName.toUpperCase()).toBe('FORM');
    expect(form.method.toUpperCase()).toBe('POST');
    expect(form.action).toBe(`${ currentLocation }submit`);

    const inputs = form.querySelectorAll('input');
    expect(inputs.length).toBe(1);
    expect(inputs[0].name).toBe('state');
    expect(inputs[0].value).toBe('testState');
  });

  it('should set form action correctly when route is undefined', () => {
    const noRouteOptions: FormOptions = { route: undefined, state: 'testState' };
    console.log('noRouteOptions');
    const noRouteHandler = new FormHandler(noRouteOptions);
    const form = noRouteHandler['buildForm']({ state: noRouteOptions.state });

    expect(form.action).toBe(currentLocation);
  });

  it('should handle payload with null or undefined values correctly', () => {
    const payload: PostPayloadOptions = {
      key1: null,
      key2: undefined,
      state: options.state,
    };

    const form = formHandler['buildForm'](payload);

    const inputs = form.querySelectorAll('input');
    expect(inputs.length).toBe(3);
    expect(inputs[0].name).toBe('key1');
    expect(inputs[0].value).toBe(''); // null should be converted to an empty string
    expect(inputs[1].name).toBe('key2');
    expect(inputs[1].value).toBe(''); // undefined should be converted to an empty string
    expect(inputs[2].name).toBe('state');
    expect(inputs[2].value).toBe('testState');
  });

  it('should submit form with correct payload', async () => {
    const mockSubmit = jest.fn();
    const payload = { key1: 'value1', state: options.state };

    jest.spyOn(document, 'createElement').mockImplementation((tagName: string) => {
      if (tagName === 'form') {
        return {
          submit: mockSubmit,
          appendChild: jest.fn(),
        } as unknown as HTMLFormElement;
      }
      
      return Object.getPrototypeOf(document).createElement.call(document, tagName);
    });

    await formHandler.submitData(payload);

    expect(mockSubmit).toHaveBeenCalled();
    expect(document.body.appendChild).toHaveBeenCalled();
  });
});
