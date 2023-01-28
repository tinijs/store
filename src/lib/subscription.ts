import {ReactiveController, ReactiveControllerHost} from 'lit';
import {
  TiniStore,
  Transaction,
  KeyPath,
  Unsubscriber,
  SubscriptionChangedCallback,
} from './types';
import {getStore} from './main';

export class StoreSubscription<States> implements ReactiveController {
  private _host!: ReactiveControllerHost;
  store?: null | TiniStore<States>;
  unsubscribe?: Unsubscriber;

  constructor(host: ReactiveControllerHost) {
    this._host = host;
    host.addController(this);
  }

  subscribe(cb: SubscriptionChangedCallback<States>) {
    if (!this.unsubscribe) {
      this.unsubscribe = this.store?.subscribe(states => cb(states));
    }
  }

  get(...keyPath: KeyPath) {
    return this.store?.get(...keyPath);
  }

  commit(transaction: Transaction, payload: unknown, ...keyPath: KeyPath) {
    return this.store?.commit(transaction, payload, ...keyPath);
  }

  hostConnected() {
    this.store = getStore<States>();
  }

  hostDisconnected() {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = undefined;
    }
  }
}
