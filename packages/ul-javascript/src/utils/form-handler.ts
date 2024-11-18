import type { infer as ZodInfer } from 'zod';
import type { FormOptions } from '../../interfaces/utils/form-handler';
import { isBrave, isJsAvailable, isWebAuthAvailable, isWebAuthPlatformAvailable } from './browser-capabilities';

interface IPostPayload {
  [key: string]: string | number | boolean | null | undefined;
}

export class FormHandler {
  options: FormOptions;
  constructor(options: FormOptions) {
    this.options = options;
  }

  async submitForm(event: Event): Promise<void> {
    const submitEvent = event as SubmitEvent;
    submitEvent.preventDefault();

    const $form = event.currentTarget as HTMLFormElement | null;

    if (!$form) {
      throw new Error('Form not found');
    }

    const formData = new FormData($form);
    const clickedButton = submitEvent.submitter as HTMLButtonElement | null;

    if (clickedButton) {
      const { name, value, type: _type } = clickedButton;
      const schemaShape = this.options.zodSchema.shape;
      const includeButtonValue: boolean = _type === 'submit' && name && value && !formData.has(name) && schemaShape[name];
      if (includeButtonValue) {
        formData.append(name, value);
      }
    }

    const dataObject = Object.fromEntries(formData.entries());
    await this.submitData(dataObject as ZodInfer<typeof this.options.zodSchema>);
  }

  async submitData(payload: ZodInfer<typeof this.options.zodSchema>): Promise<void> {
    const browserCapabilities = {
      'js-available': isJsAvailable(),
      'is-brave': await isBrave(),
      'webauthn-available': isWebAuthAvailable(),
      'webauthn-platform-available': await isWebAuthPlatformAvailable()
    }

    const extendedPayload: IPostPayload = {
      ...payload,
//      ...browserCapabilities,
      state: this.options.state,
    };

    const $form = this.buildForm(extendedPayload);

    document.body.appendChild($form);
    $form.submit();
  }

  private buildForm(payload: IPostPayload): HTMLFormElement {
    const $form = document.createElement('form');
    $form.method = 'POST';
    $form.action = this.options.route || '';

    Object.entries(payload).forEach(([key, value]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = String(value ?? '');
      $form.appendChild(input);
    });

    return $form;
  }
}
