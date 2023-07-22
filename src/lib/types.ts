export type StoreCallback<Type> = (newValue: Type, oldValue: Type) => void;

export interface StoreOptions {
  preserveOldValue?: boolean;
}

export type Store<States> = States & {
  subscribe: <Type>(key: keyof States, cb: StoreCallback<Type>) => () => void;
  commit: <Type>(key: keyof States, value: Type) => Type;
};
