import { ActionCreator, Action, createActionCreator } from './actions';
import { AnyAction } from 'redux';

type Reducer<TState, TAction extends AnyAction> = (state: TState, action: TAction) => TState;


const reduce = <TState, TPayload, TMeta>(
    actionCreator: ActionCreator<TPayload, TMeta>,
    reducer: Reducer<TState, Action<TPayload, TMeta>>
): Record<
    string, 
    Reducer<TState, Action<TPayload, TMeta>>
> => {
    return {
        [actionCreator.toString()]: reducer
    };
}

export const createReducer = <TState>(
    defaultState: TState, 
    ...reducers: Array<Record<string, Reducer<TState, any>>>
) => {
    const reducersMap = reducers.reduce((prev, next) => ({ ...prev, ...next }));

    return (state: TState = defaultState, action: AnyAction): TState => {
      if (reducersMap.hasOwnProperty(action.type)) {
        reducersMap[action.type](state, action);
      }

      return state;
    }
}


const setIds = createActionCreator<number[]>('SET_IDS');
const appendIds = createActionCreator<string[]>('APPEND_IDS');

const ids = createReducer(
    [] as string[],
    reduce(setIds, (_, action) => action.payload.map(x => x.toString())),
    reduce(appendIds, (state, action) => [...state, ...action.payload])
)
