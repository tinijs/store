# TiniJS Store 

> [!IMPORTANT]
> This previously experiment is wrapped up, moving forward the development will happen at <https://github.com/tinijs/tinijs/tree/main/packages/store>.
>
> If you want to use the experimental version still, please use the version `0.16.0`.

The state management module for the TiniJS framework.

It is very small, under ~1KB at around 50 lines of code.

## Install

To manually install the module: `npm i @tinijs/store@0.16.0`

It is recommended to download the [Skeleton](https://github.com/tinijs/skeleton) for a ready-to-use structured project.

For more, please visit: <https://tinijs.dev>

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
  // it is reactive by default
  @Subscribe(mainStore) foo = mainStore.foo;

  // use a different variable name
  @Subscribe(mainStore, 'foo') xyz = mainStore.foo;

  // to turn of reactive
  // set the third argument to false
  @Subscribe(mainStore, null, false) foo = mainStore.foo;

  // or subscribe manually
  // NOTE: remember to unsubscribe when the component is destroyed
  onInit() {
    this.fooSubscription = mainStore.subscribe('foo', value => {
      // do something
    });
  }
  onDestroy() {
    this.fooSubscription();
  }

}
```

- Mutate a state

```ts
import {mainStore} from './stores/main';

// assign a new value
mainStore.foo = 'bar2';

// or, using the 'commit' method
mainStore.commit('foo', 'bar3');
```

## API

// TODO

## Developement

- Create a home for TiniJS: `mkdir TiniJS && cd TiniJS`
- Fork the repo
- Install dependencies: `cd store && npm i`
- Make changes & preview locally: `npm run build && npm pack`
- Push changes & create a PR 👌

## License

**@tinijs/store** is released under the [MIT](https://github.com/tinijs/core/blob/master/LICENSE) license.
