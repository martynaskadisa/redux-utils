import { Action } from './actions';

export const set = <T>(_: any, action: Action<T, any>) => action.payload;

export const merge = <TState extends object, TPayload extends object>(state: TState, action: Action<TPayload, any>) => ({ ...state, ...action.payload });

export const append = <T, P>(state: T[], action: Action<P[], any>) => [...state, ...action.payload];

export const prepend = <T, P>(state: T[], action: Action<P[], any>) => [...action.payload, ...state];
