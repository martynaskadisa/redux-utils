import { ActionWithPayload } from './actions';

export const set = <TPayload>(
  _: any,
  action: ActionWithPayload<any, TPayload>
) => action.payload;

export const merge = <TState extends object, TPayload extends object>(
  state: TState,
  action: ActionWithPayload<any, TPayload>
) => ({ ...state, ...action.payload });

export const append = <TState, TPayload>(
  state: ReadonlyArray<TState>,
  action: ActionWithPayload<any, ReadonlyArray<TPayload>>
) => [...state, ...action.payload];

export const prepend = <TState, TPayload>(
  state: ReadonlyArray<TState>,
  action: ActionWithPayload<any, ReadonlyArray<TPayload>>
) => [...action.payload, ...state];
