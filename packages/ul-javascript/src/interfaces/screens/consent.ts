import { z } from 'zod';
import { BaseContext } from '../../interfaces/models/base-context';

type Links = {
  signup?: string;
  reset_password?: string;
};

export interface IConsent extends Omit<BaseContext, 'screen'> {
  screen: {
    name: string;
    links?: Links;
    captcha?: any;
  };
  untrusted_data?: {
    submitted_form_data?: {
      email?: string;
      phone?: string;
      username?: string;
    };
  };
}

export const zodSchema = z.object({
  state: z.string().optional(),
  action: z.enum(['deny', 'accept']),
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



