import { z } from 'zod';
import { BaseContext } from '../../interfaces/models/base-context';
import { ScreenContext } from '../../interfaces/models/screen';
import { UntrustedDataContext } from '../models/untrusted-data';


interface Screen extends ScreenContext {
  links?: {
    signup?: string;
    reset_password?: string;
  };
}

interface UntrustedData extends UntrustedDataContext {
  submitted_form_data?: {
    email?: string;
    phone?: string;
    username?: string;
    [key: `ulp-${string}`]: string;
  };
}

export interface SignupPassword extends BaseContext {
  screen: Screen;
  UntrustedData: UntrustedData;
}



export const zodSchema = z.object({
  state: z.string().optional(),
  password: z.string(),
})
.catchall(
  z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.null()
  ])
);

export type IFormSchema = z.infer<typeof zodSchema>;


