import { Branding } from './models';
import { BaseContext } from './models/base-context';

import type  { CurrentScreenOptions } from '../interfaces/common';

export * from './screens';
export * from '../interfaces/export/base-properties';
export * from '../interfaces/export/screen-properties';
export * from '../interfaces/export/options';
export * from '../interfaces/export/extended-types';
export * from '../interfaces/export/common';

export function getCurrentScreen(): CurrentScreenOptions {
  const contextDetails = new BaseContext();
  return {
    screenName: contextDetails.getContext('screen')?.name || null,
    promptName: contextDetails.getContext('prompt')?.name || null,
    state: contextDetails.getContext('transaction')?.state || null,
    branding: Branding.getSettings(contextDetails.getContext('branding')) || null,
  }
}
