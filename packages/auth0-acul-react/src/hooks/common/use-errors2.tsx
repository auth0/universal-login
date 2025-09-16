import { getErrors, type Error as TransactionError } from '@auth0/auth0-acul-js';

export const useErrors2 = (): TransactionError[] | null => {
  return getErrors();
};
