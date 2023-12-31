import {Store} from './types';

export function Subscribe<States>(
  store: Store<States>,
  stateKey?: keyof States
) {
  return function (prototype: any, propertyName: string) {
    const key = (stateKey || propertyName) as string;
    const unsubscribeKey = Symbol();
    // originals
    const originalConnectedCallback = prototype.connectedCallback;
    const originalDisconnectedCallback = prototype.disconnectedCallback;
    // override
    prototype.connectedCallback = function () {
      originalConnectedCallback.apply(this);
      this[unsubscribeKey] = store['subscribe'](
        key as unknown as keyof States,
        (value: unknown) => (this[propertyName] = value)
      );
    };
    prototype.disconnectedCallback = function () {
      originalDisconnectedCallback.apply(this);
      this[unsubscribeKey]?.();
    };
  };
}
