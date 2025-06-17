import { BaseContext } from '../models/base-context';

import type { Error } from '../../interfaces/models/transaction';

export function getError(): Error[] {
    try {
        const context = new BaseContext();
        return context.transaction?.errors ?? [];
    } catch {
        return [];
    }
}
