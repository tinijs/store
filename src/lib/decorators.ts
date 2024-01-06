import {Store} from './types';

export function Subscribe<States>(
  store: Store<States>,
  stateKey?: keyof States
) {
  return function (prototype: any, propertyName: string) {
    prototype.storeManager ||= {pending: []};
    prototype.storeManager.pending.push([
      store,
      stateKey || propertyName,
      propertyName,
    ]);
  };
}
