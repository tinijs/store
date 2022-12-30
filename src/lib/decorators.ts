import {getAppInstance} from '@tinijs/core';

import {StoreSubscription} from './subscription';

export function SubscribeStore() {
  return function (target: Object, propertyKey: string) {
    Reflect.defineProperty(target, propertyKey, {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      value: new StoreSubscription(target as any),
    });
  };
}

export function UseStore() {
  return function (target: Object, propertyKey: string) {
    Reflect.defineProperty(target, propertyKey, {
      get: () => getAppInstance().$store,
    });
  };
}
