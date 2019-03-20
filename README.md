# redux-utils

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
<!-- [![Greenkeeper badge](https://badges.greenkeeper.io/martynaskadisa/redux-utils.svg)](https://greenkeeper.io/) -->
<!-- [![Travis](https://img.shields.io/travis/martynaskadisa/redux-utils.svg)](https://travis-ci.org/martynaskadisa/redux-utils) -->
<!-- [![Coveralls](https://img.shields.io/coveralls/martynaskadisa/redux-utils.svg)](https://coveralls.io/github/martynaskadisa/redux-utils) -->
<!-- [![Dev Dependencies](https://david-dm.org/martynaskadisa/redux-utils/dev-status.svg)](https://david-dm.org/martynaskadisa/redux-utils?type=dev) -->

Type-safe redux utilities to make your life easier

## Installing

```bash
yarn add @reduxify/utils
```

## Usage

### createActionCreator

`createActionCreator<T>(type: string): (payload: T) => { type: string, payload: T }`

Action creator factory. 

```ts
import { createActionCreator } from '@reduxify/utils'

const add = createActionCreator<number>('ADD');

dispatch(add(5)) //=> { type: 'ADD', payload: 5 }



const openCalendar = createActionCreator('OPEN_CALENDAR');

dispatch(openCalendar()) //=> { type: 'OPEN_CALENDAR' }
```


### createReducer

`createReducer<S, A>(defaultState: S, ...reducersMap: Array<Record<string, Reducer<S, any>>>)`

```ts
import { createActionCreator, createReducer, reduce } from '@reduxify/utils';

const openCalendar = createActionCreator('OPEN_CALENDAR');
const closeCalendar = createActionCreator('OPEN_CALENDAR');
const setCount = createActionCreator<number>('SET_COUNT');

const reducer = createReducer(
    { open: false, count: 0 },
    reduce(openCalendar, (state, action) => ({ ...state, open: true })),
    reduce(closeCalendar, (state, action) => ({ ...state, open: false })),
    reduce(setCount, (state, action) => ({ ...state, count: state.count + action.payload }))
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

Reduce actions with full type information from action creators.


## Licence

MIT
