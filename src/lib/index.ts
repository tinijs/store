import {tx} from 'tinyx';

export function createStore<States>(states: States) {
  return tx<States>(states);
}
