import { ActionCreator, Action } from './actions';
import { AnyAction } from 'redux';

export type Reducer<TState, TAction extends AnyAction> = (state: TState, action: TAction) => TState;

export const reduce = <TState, TPayload, TMeta>(
    actionCreator: ActionCreator<TPayload, TMeta>,
    reducer: Reducer<TState, Action<TPayload, TMeta>>
): Record<
    string, 
    Reducer<TState, Action<TPayload, TMeta>>
> => ({ [actionCreator.toString()]: reducer })

export const createReducer = <TState>(
    defaultState: TState, 
    ...reducers: Array<Record<string, Reducer<TState, any>>>
) => {
    const reducersMap = reducers.reduce((prev, next) => ({ ...prev, ...next }), {});

    return (state: TState = defaultState, action: AnyAction): TState => {
      if (reducersMap.hasOwnProperty(action.type)) {
        return reducersMap[action.type](state, action);
      }

      return state;
    }
}

