import {StoreSubscription} from './subscription';
import {getStore} from './main';

export function Shop() {
  return function (target: Object, propertyKey: string) {
    Reflect.defineProperty(target, propertyKey, {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      value: new StoreSubscription(target as any),
      enumerable: false,
      configurable: false,
    });
  };
}

export function UseStore() {
  return function (target: Object, propertyKey: string) {
    Reflect.defineProperty(target, propertyKey, {
      get: () => getStore(),
      enumerable: false,
      configurable: false,
    });
  };
}

export function UseStates() {
  return function (target: Object, propertyKey: string) {
    Reflect.defineProperty(target, propertyKey, {
      get: () => getStore()?.get(),
      enumerable: false,
      configurable: false,
    });
  };
}
