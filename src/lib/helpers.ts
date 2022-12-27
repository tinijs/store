/* eslint-disable @typescript-eslint/no-explicit-any */
import {MutationToolbox, Transaction, TransactionHandler} from './types';

export function createUpdateTransaction<Payload, Value>(
  path: string,
  handler: TransactionHandler<Payload, Value>
) {
  return function (payload: Payload) {
    return ({update}: MutationToolbox) => {
      update(path, ((currentValue: Value) =>
        handler(payload, currentValue)) as any);
    };
  } as Transaction;
}
