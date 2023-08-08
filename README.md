# TiniJS Store 

The state management module for the TiniJS framework.

It is very small, under ~1KB at around 50 lines of code.

## Install

To manually install the module: `npm i @tinijs/store`

It is recommended to download the [Skeleton](https://github.com/tinijs/skeleton) for a ready-to-use structured project.

For more, please visit: <https://tinijs.dev> (TODO)

## Usage

- Create a store `stores/main.ts`

```ts
import {createStore} from '@tinijs/store';

export const mainStore = createStore({
  foo: 'bar'
});

```

- Access a state

```ts
import {mainStore} from './stores/main';

const foo = mainStore.foo;
```

- Subscribe to a state

```ts
import {TiniComponent, Component, Reactive} from '@tinijs/core';
import {Subscribe} from '@tinijs/store';

import {mainStore} from './stores/main';

@Component()
export class MyComponent extends TiniComponent {

  // 'this.foo' will be updated when 'mainStore.foo' changes
  @Subscribe(mainStore) foo = mainStore.foo;

  // use a different name
  // also, make this.foo2 reactive (@Reactive() equals @state() of Lit)
  @Subscribe(mainStore, 'foo') @Reactive() foo2 = mainStore.foo;

  // or use a callback
  onInit() {
    mainStore.subscribe('foo', value => {
      // do something
    });
  }
}
```

- Mutate a state

```ts
import {mainStore} from './stores/main';

// assign a new value
mainStore.foo = 'bar2';

// or
mainStore.commit('foo', 'bar3');
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
