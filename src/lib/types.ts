export type TransactionHandler<Payload, Value> = (
  payload: Payload,
  value: Value
) => Value;

export type UpdateMutation<Value> = (
  path: string,
  handler: (currentValue: Value) => Value
) => unknown;

export interface MutationMethods<Value> {
  update: UpdateMutation<Value>;
}
