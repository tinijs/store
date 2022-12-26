import {MutationMethods, TransactionHandler} from './types';

export function createUpdateTransaction<Payload, Value>(
  path: string,
  handler: TransactionHandler<Payload, Value>
) {
  return function (payload: Payload) {
    return ({update}: MutationMethods<Value>) => {
      update(path, (currentValue: Value) => handler(payload, currentValue));
    };
  } as Transaction;
}
