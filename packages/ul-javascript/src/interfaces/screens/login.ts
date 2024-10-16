import { z } from 'zod';
import { BaseContext } from '../../interfaces/models/base-context';

export interface ILogin extends BaseContext {
  screen: {
    name: string;
    links: {
      signup?: string;
      reset_password?: string;
    };
    captcha?: any; // TBD
  };
  untrusted_data?: {
    submitted_form_data?: {
      email?: string;
      phone?: string;
      username?: string;
    };
  };
}

export const formSchema = z.object({
  state: z.string(),
  email: z.string().email(),
});
