import type { FormOptions, PostPayloadOptions, TelemetryOptions } from '../../interfaces/utils/form-handler';

export class FormHandler {
  options: FormOptions;
  constructor(options: FormOptions) {
    this.options = options;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async submitData<T>(payload: T): Promise<void> {
    const extendedPayload: PostPayloadOptions = {
      ...payload,
      state: this.options.state,
    };

    const $form = this.buildForm(extendedPayload);

    document.body.appendChild($form);
    $form.submit();
  }

  private buildForm(payload: PostPayloadOptions): HTMLFormElement {
    const $form = document.createElement('form');
    $form.method = 'POST';
    $form.action = this.options.route ?? '';

    Object.entries(payload).forEach(([key, value]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = String(value ?? '');
      $form.appendChild(input);
    });

    this.addTelemetryField($form);

    return $form;
  }

  private addTelemetryField(form: HTMLFormElement): HTMLFormElement {
    const input = document.createElement('input');
    const [screenName, methodName] = this.options.telemetry ?? [];
    const sdkName = __SDK_NAME__;
    const sdkVersion = __SDK_VERSION__;
    const telemetryPayload: TelemetryOptions = {
      sdkVersion,
      sdkName,
      screenName,
      methodName,
    };
    input.type = 'hidden';
    input.name = 'x-acul-sdk-analytics';
    input.value = JSON.stringify(telemetryPayload);
    form.appendChild(input);

    return form;
  }
}
