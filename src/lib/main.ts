import {tx} from 'tinyx';
import {getAppInstance, TiniApp, Global} from '@tinijs/core';
import {Store} from './types';

export function createStore<States>(states: States) {
  return tx(states) as Store<States>;
}

export function getStore<States>(): null | Store<States> {
  const appOrGlobal = getAppInstance(true);
  return (
    (appOrGlobal as TiniApp).$store ||
    (appOrGlobal as Global).$tiniStore ||
    null
  );
}
