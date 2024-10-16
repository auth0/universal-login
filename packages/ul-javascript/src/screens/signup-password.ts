import { BaseContext } from '../models/base-context';
import { zodSchema, IFormSchema } from '../interfaces/screens/signup-password';
import { stateNotFound } from '../utils/errors';
import { FormHandler } from '../utils/form-handler';
import { FormOptions } from '../interfaces/utils/form-handler';

export class SignupPassword extends BaseContext {
  constructor() {
    super();
  }
  
  submitForm = (event: Event): void => {
    if (this.transaction.state === undefined) {
      throw stateNotFound();
    }

    const options: FormOptions = {
      state: this.transaction.state,
      zodSchema: zodSchema
    }
    return new FormHandler(options).submitForm(event);
  }

  submitData(data: IFormSchema): void {
    if (this.transaction.state === undefined) {
      throw stateNotFound();
    }

    const options: FormOptions = {
      state: this.transaction.state,
      zodSchema: zodSchema
    }
    return new FormHandler(options).submitData(data);
  }
}