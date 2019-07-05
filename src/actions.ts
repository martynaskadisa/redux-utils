import { Action } from 'redux';

export interface ActionWithPayload<T, P> extends Action<T> {
  payload: P;
}

export interface ActionWithMeta<T, M> extends Action<T> {
  meta: M;
}

export function createActionCreator(
  type: string
): (payload?: never, meta?: never) => Action<string>;

export function createActionCreator<TPayload>(
  type: string
): (payload: TPayload, meta?: never) => ActionWithPayload<string, TPayload>;

export function createActionCreator<TPayload, TMeta>(
  type: string
): (
  payload: TPayload,
  meta: TMeta
) => TPayload extends void
  ? ActionWithMeta<string, TMeta>
  : ActionWithPayload<string, TPayload> & ActionWithMeta<string, TMeta>;

export function createActionCreator(type: string) {
  const actionCreator = (payload: any, meta: any) => ({
    type,
    payload,
    meta
  });

  actionCreator.toString = () => type;

  return actionCreator;
}
