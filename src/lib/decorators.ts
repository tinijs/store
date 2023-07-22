import {Store} from './types';

export function Subscribe<States>(
  store: Store<States>,
  stateKey?: keyof States
) {
  return function (target: any, propertyKey: string) {
    const key = (stateKey || propertyKey) as string;
    const unsubscribeKey = Symbol();
    // originals
    const originalConnectedCallback = target.connectedCallback;
    const originalDisconnectedCallback = target.disconnectedCallback;
    // override
    target.connectedCallback = function () {
      originalConnectedCallback.bind(this)();
      this[unsubscribeKey] = store['subscribe'](
        key as unknown as keyof States,
        (value: unknown) => (this[propertyKey] = value)
      );
    };
    target.disconnectedCallback = function () {
      originalDisconnectedCallback.bind(this)();
      this[unsubscribeKey]?.();
    };
  };
}
