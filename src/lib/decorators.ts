import {getAppInstance} from '@tinijs/core';

export function UseStore() {
  return function (target: Object, propertyKey: string) {
    Reflect.defineProperty(target, propertyKey, {
      get: () => getAppInstance().store,
    });
  };
}
