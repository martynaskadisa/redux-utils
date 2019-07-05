# redux-utils

[![Build Status](https://travis-ci.com/martynaskadisa/redux-utils.svg?branch=master)](https://travis-ci.com/martynaskadisa/redux-utils)
[![minified size](https://badgen.net/bundlephobia/min/@reduxify/utils)](https://bundlephobia.com/result?p=@reduxify/utils)
[![minzipped size](https://badgen.net/bundlephobia/minzip/@reduxify/utils)](https://bundlephobia.com/result?p=@reduxify/utils)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
<!-- [![Greenkeeper badge](https://badges.greenkeeper.io/martynaskadisa/redux-utils.svg)](https://greenkeeper.io/) -->
<!-- [![Travis](https://img.shields.io/travis/martynaskadisa/redux-utils.svg)](https://travis-ci.org/martynaskadisa/redux-utils) -->
<!-- [![Coveralls](https://img.shields.io/coveralls/martynaskadisa/redux-utils.svg)](https://coveralls.io/github/martynaskadisa/redux-utils) -->
<!-- [![Dev Dependencies](https://david-dm.org/martynaskadisa/redux-utils/dev-status.svg)](https://david-dm.org/martynaskadisa/redux-utils?type=dev) -->

Tiny type-safe redux utilities to make your life easier

## Installing

```bash
yarn add @reduxify/utils
```

## Usage

### createActionCreator

`createActionCreator<P, M>(type: string): (payload: P, meta: M) => { type: string, payload: P, meta: M }`

Action creator factory. Accepts `type` as first argument and returns an action creator which accepts two arguments - `payload` and `meta`.

```ts
import { createActionCreator } from '@reduxify/utils'

const add = createActionCreator<number>('ADD');

dispatch(add(5)) //=> { type: 'ADD', payload: 5 }

const openCalendar = createActionCreator('OPEN_CALENDAR');

dispatch(openCalendar()) //=> { type: 'OPEN_CALENDAR' }

const throttledAdd = createActionCreator<number, { throttle: number }>('ADD');

dispatch(throttledAdd(5, { throttle: 100 })) //=> { type: 'ADD', payload: 5, meta: { throttle: 100 }}
```

This utility has one extra feature - `toString()` method returns action's type. So action creator can be used everywhere instead of an action type constant, even in reducers or sagas:

```ts
import { createActionCreator } from '@reduxify/utils';

const openDropdown = createActionCreator<boolean>('OPEN_DROPDOWN');

console.log(openDropdown) //=> 'OPEN_DROPDOWN'


// Example reducer
const reducer = (state, action) => {
  switch(action.type) {
    case openDropdown.toString():
      return action.payload;
    default:
      return state;
  }
}

// Example saga
function* saga() {
   const action = yield take(openDropdown);
}
```


### createReducer

`createReducer<S, A>(defaultState: S, ...reducersMap: Array<Record<string, Reducer<S, any>>>)`

Reducer creator. Accepts default state as first argument and reducers map as n-th argument.

```ts
import { createActionCreator, createReducer, reduce } from '@reduxify/utils';

const openCalendar = createActionCreator('OPEN_CALENDAR');
const closeCalendar = createActionCreator('OPEN_CALENDAR');
const incrementBy = createActionCreator<number>('INCREMENT_BY');

const reducer = createReducer(
    { open: false, count: 0 },
    reduce(openCalendar, (state, action) => ({ ...state, open: true })),
    reduce(closeCalendar, (state, action) => ({ ...state, open: false })),
    reduce(incrementBy, (state, action) => ({ ...state, count: state.count + action.payload }))
)
```

```ts
import { createReducer } from '@reduxify/utils';

const reducer = createReducer(true, {
    'OPEN_CALENDAR': (state, action) => true,
    'CLOSE_CALENDAR': (state, action) => false
})
```

```ts
import { createReducer } from '@reduxify/utils';

const reducer = createReducer(true, 
    {
        'OPEN_CALENDAR': (state, action) => true
    }, 
    {
        'CLOSE_CALENDAR': (state, action) => false
    }
)
```

### reduce

`reduce<S, A>(actionCreator:(...args: any[]) => A,
  reducer: Reducer<S, A>
): Record<string, Reducer<S, A>>`

Reduce actions with full type information from action creators. This utility essentially creates a reducers map object. It's main purpose is to provide full type information from action creator for type safe reducers.

```ts
import { reduce, createActionCreator } from '@reduxify/utils';

const add = createActionCreator<number>('ADD');

const reducersMap = reduce(add, (state, action) => state + action.payload) 
// reducersMap = { 'ADD': (state, action) => state + action.payload }
```

### Helpers

#### set

```
set(state: any, action: Action<Payload>) => Payload
```

Sets action's payload unconditionally

```ts
import { createActionCreator, createReducer, reduce, set } from '@reduxify/utils';

const setTitle = createActionCreator<string>('SET_TITLE');

const reducer = createReducer('', 
  reduce(setTitle, set)
);

// Initial state:
// ''

dispatch(setTitle('Awesome title'));

// Updated state:
// 'Awesome title'

```

#### merge

```
merge(state: object, action: Action<object>) => object
```

Spreads action's payload over state

```ts
import { createActionCreator, createReducer, reduce, merge } from '@reduxify/utils';

interface User {
  name: string;
  surname: string;
  address: string;
}

const updateUser = createActionCreator<Partial<User>>('UPDATE_USER');

const reducer = createReducer({ name: 'Jon', surname: 'Snow', address: `Night's watch` },
  reduce(updateUser, merge)
);

// Initial state:
// {
//   name: 'Jon',
//   surname: 'Snow',
//   address: `Night's watch`
// }

dispatch(updateUser({ address: 'Winterfell' });

// Updated state:
// {
//   name: 'Jon',
//   surname: 'Snow',
//   address: 'Winterfell'
// }

```

## Licence

MIT
