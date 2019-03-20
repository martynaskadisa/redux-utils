import { Action } from 'redux';

export interface ActionWithPayload<T, P> extends Action<T> {
  payload: P;
}

export function createActionCreator(
  type: string
): (payload?: never) => Action<string>;

export function createActionCreator<TPayload>(
  type: string
): (payload: TPayload) => ActionWithPayload<string, TPayload>;

export function createActionCreator(type: string) {
  const actionCreator = (payload: any) => ({
    type,
    payload
  });

  actionCreator.toString = () => type;

  return actionCreator;
}
