export interface Action<TPayload = undefined, TMeta = any> {
  type: string
  payload: TPayload
  meta: TMeta
}

export type ActionCreator<TPayload = undefined, TMeta = any> = TPayload extends undefined
  ? (payload?: TPayload, meta?: TMeta) => Action<TPayload, TMeta>
  : (payload: TPayload, meta?: TMeta) => Action<TPayload, TMeta>

export function createActionCreator<TPayload = undefined, TMeta = any>(
  type: string
): ActionCreator<TPayload, TMeta>

export function createActionCreator(type: string) {
  const actionCreator = (payload: any, meta: any) => ({
    type,
    payload,
    meta
  })

  actionCreator.toString = () => type

  return actionCreator
}
