import { BaseContext } from '../../../../src/models/base-context';
import DeviceCodeActivationAllowed from '../../../../src/screens/device-code-activation-allowed';
import { ScreenIds } from '../../../../src/constants/enums';
import { baseContextData } from '../../../data/test-data';

describe('DeviceCodeActivationAllowed', () => {

  beforeEach(() => {
    jest.resetModules();
    global.window = Object.create(window);
    baseContextData.screen.name = ScreenIds.DEVICE_CODE_ACTIVATION_ALLOWED;
    window.universal_login_context = baseContextData;
  });

  it('should have a static screenIdentifier property', () => {
    expect(DeviceCodeActivationAllowed.screenIdentifier).toBeDefined();
    expect(DeviceCodeActivationAllowed.screenIdentifier).toBe(ScreenIds.DEVICE_CODE_ACTIVATION_ALLOWED);
  });

  it('should create an instance of DeviceCodeActivationAllowed', () => {
    const instance = new DeviceCodeActivationAllowed();
    expect(instance).toBeInstanceOf(DeviceCodeActivationAllowed);
  });

  it('should extend BaseContext', () => {
    const instance = new DeviceCodeActivationAllowed();
    expect(instance).toBeInstanceOf(BaseContext);
  });
});