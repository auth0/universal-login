import type { BaseMembers } from '../../interfaces/models/base-context';
import type { ScreenMembers, ScreenData } from '../models/screen';

export interface BruteForceProtectionUnblockFailureOptions {
  [key: string]: string | number | boolean | undefined;
}

export interface ScreenDataOptions extends ScreenData {
  errorType?: string;
}

export interface ScreenMembersOnBruteForceProtectionUnblockFailure extends ScreenMembers {
  data: {
    errorType?: string;
  } | null;
}

export interface BruteForceProtectionUnblockFailureMembers extends BaseMembers {
  screen: ScreenMembersOnBruteForceProtectionUnblockFailure;
}
