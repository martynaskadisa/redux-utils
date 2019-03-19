import { AnyAction } from 'redux'

export type Reducer<TState, TAction extends AnyAction> = (state: TState, action: TAction) => TState

export const reduce = <TState, TAction extends AnyAction>(
  actionCreator: (...args: any[]) => TAction,
  reducer: Reducer<TState, TAction>
): Record<string, Reducer<TState, TAction>> => ({
  [actionCreator.toString()]: reducer
})

export const createReducer = <TState>(
  defaultState: TState,
  ...reducers: Array<Record<string, Reducer<TState, any>>>
) => {
  const reducersMap = reducers.reduce((prev, next) => ({ ...prev, ...next }), {})

  return (state: TState = defaultState, action: AnyAction): TState => {
    if (reducersMap.hasOwnProperty(action.type)) {
      return reducersMap[action.type](state, action)
    }

    return state
  }
}
