import type { FormOptions, PostPayloadOptions } from '../../interfaces/utils/form-handler';

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
    // Allow wrapper SDKs (like React) to override telemetry
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const sdkName = (globalThis as any).__ACUL_SDK_NAME__ || __SDK_NAME__;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const sdkVersion = (globalThis as any).__ACUL_SDK_VERSION__ || __SDK_VERSION__;
    input.type = 'hidden';
    input.name = 'acul-sdk';
    input.value = `${sdkName}@${sdkVersion}`;
    form.appendChild(input);

    return form;
  }
}
