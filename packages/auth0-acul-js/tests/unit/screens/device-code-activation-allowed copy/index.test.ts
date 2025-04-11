import { BaseContext } from '../../../../src/models/base-context';
import DeviceCodeActivationDenied from '../../../../src/screens/device-code-activation-denied';
import { ScreenIds } from '../../../../src/constants/enums';
import { baseContextData } from '../../../data/test-data';

describe('DeviceCodeActivationDenied', () => {

  beforeEach(() => {
    jest.resetModules();
    global.window = Object.create(window);
    baseContextData.screen.name = ScreenIds.DEVICE_CODE_ACTIVATION_DENIED;
    window.universal_login_context = baseContextData;
  });

  it('should have a static screenIdentifier property', () => {
    expect(DeviceCodeActivationDenied.screenIdentifier).toBeDefined();
    expect(DeviceCodeActivationDenied.screenIdentifier).toBe(ScreenIds.DEVICE_CODE_ACTIVATION_DENIED);
  });

  it('should create an instance of DeviceCodeActivationDenied', () => {
    const instance = new DeviceCodeActivationDenied();
    expect(instance).toBeInstanceOf(DeviceCodeActivationDenied);
  });

  it('should extend BaseContext', () => {
    const instance = new DeviceCodeActivationDenied();
    expect(instance).toBeInstanceOf(BaseContext);
  });
});