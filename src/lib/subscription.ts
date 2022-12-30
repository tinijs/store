import {ReactiveController, ReactiveControllerHost} from 'lit';
import {getAppInstance} from '@tinijs/core';

import {
  Store,
  Transaction,
  KeyPath,
  Unsubscriber,
  SubscriptionChangedCallback,
} from './types';

export class StoreSubscription<States> implements ReactiveController {
  private host!: ReactiveControllerHost;
  store!: Store<States>;
  unsubscribe?: Unsubscriber;

  constructor(host: ReactiveControllerHost) {
    this.host = host;
    host.addController(this);
  }

  subscribe(cb: SubscriptionChangedCallback<States>) {
    if (!this.unsubscribe) {
      this.unsubscribe = this.store.subscribe(states => cb(states));
    }
  }

  get(...keyPath: KeyPath) {
    return this.store.get(...keyPath);
  }

  commit(transaction: Transaction, payload: unknown, ...keyPath: KeyPath) {
    return this.store.commit(transaction, payload, ...keyPath);
  }

  hostConnected() {
    this.store = getAppInstance().$store;
  }

  hostDisconnected() {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = undefined;
    }
  }
}
