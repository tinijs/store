# TiniJS Store 

The state management module for the TiniJS framework.

It uses the [Tinyx](https://github.com/dmaevsky/tinyx) under the hood.

## Install

To manually install the module: `npm i @tinijs/store`

It is recommended to download the [Skeleton](https://github.com/tinijs/skeleton) for a ready-to-use structured project.

For more, please visit: <https://tinijs.dev>

## Usage

- Add the `states.ts`

```ts
import {TiniStore} from '@tinijs/store';

const states = {
  key: 'value',
};

export default states;
export type States = typeof states;

export type Store = TiniStore<States>;

```

- Create a store instance in the `app.ts`

```ts
import {createStore} from '@tinijs/store';

import states, {Store} from './states';

@App()
export class AppRoot extends TiniComponent {
  $store!: Store;

  onReady() {
    this.$store = createStore(states);
  }
}
```

## API

// TODO

## Developement

- Create a home for TiniJS: `mkdir TiniJS && cd TiniJS`
- Fork the repo: `git clone https://github.com/tinijs/store.git`
- Install dependencies: `cd store && npm i`
- Make changes & preview locally: `npm run build && npm pack`
- Push changes & create a PR 👌

## License

**@tinijs/store** is released under the [MIT](https://github.com/tinijs/core/blob/master/LICENSE) license.
