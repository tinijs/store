import {tx} from 'tinyx';
import {Store} from './types';

export function createStore<States>(states: States) {
  return tx(states) as Store<States>;
}
