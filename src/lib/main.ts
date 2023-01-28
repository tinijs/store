import {tx} from 'tinyx';
import {getAppInstance, TiniApp, Global} from '@tinijs/core';
import {TiniStore} from './types';

export function createStore<States>(states: States) {
  return tx(states) as TiniStore<States>;
}

export function getStore<States>(): null | TiniStore<States> {
  const appOrGlobal = getAppInstance(true);
  return (
    (appOrGlobal as TiniApp).$store ||
    (appOrGlobal as Global).$tiniStore ||
    null
  );
}
