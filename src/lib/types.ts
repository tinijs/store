export type Store<States> = Tinyx<States>;

export type SubscriptionChangedCallback<States> = (states: States) => void;

export type Subscriber<T> = (value: T) => void;
export type Unsubscriber = () => void;
export type Updater<T> = (value: T) => T;

export interface Readable<T> {
  subscribe(subscriber: Subscriber<T>): Unsubscriber;
  get(): T;
}

export interface DeepReadable<T> extends Readable<T> {
  get(...keyPath: KeyPath): T;
}

export interface Writable<T> extends Readable<T> {
  set(value: T): boolean;
  update(updater: Updater<T>): boolean;
}

export type KeyPath = unknown[];
export type KeyPathNonEmpty = [NonNullable<unknown>, ...KeyPath];

export type KeyPathAndValue = [...KeyPath, unknown];
export type KeyPathAndUpdater = [...KeyPath, Updater<unknown>];
export type KeyPathAndMutation = [...KeyPath, Mutation];

export type Mutation = (ops: Partial<MutationToolbox>) => void;

export interface MutationToolbox {
  get: (...keyPath: KeyPath) => unknown;
  set: (...keyPath: KeyPathAndValue) => void;
  update: (...keyPath: KeyPathAndUpdater) => void;
  remove: (...keyPath: KeyPath) => void;
  apply: (...keyPath: KeyPathAndMutation) => void;
}

export type Reducer<T> = (state: T) => T;

export type Diff<T> = {
  keyPath: KeyPath;
  oldValue: T | undefined;
  newValue: T | undefined;
};

export type Recorder = (diff: Diff<unknown>) => void;
export type Changes = Diff<unknown>[];

export type Transaction = (payload: unknown) => Mutation;

export interface Tinyx<T> extends DeepReadable<T> {
  commit(
    transaction: Transaction,
    payload: unknown,
    ...keyPath: KeyPath
  ): Changes;
}

export type Middleware<T, U = T> = (store: Tinyx<T>) => Tinyx<U>;

export type Action<T> = (store: Tinyx<T>, ...args: unknown[]) => unknown;

export type EqualsPredicate<T> = (a: T, b: T) => boolean;
