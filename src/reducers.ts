import { ActionCreator, Action, createActionCreator } from './actions';
import { AnyAction } from 'redux';

type Reducer<TState, TAction extends AnyAction> = (state: TState, action: TAction) => TState;

const reduce = <TState, TPayload, TMeta>(
    actionCreator: ActionCreator<TPayload, TMeta>,
    reducer: Reducer<TState, Action<TPayload, TMeta>>
) => (state: TState, action: Action<TPayload, TMeta>) => {
    if (actionCreator.toString() === action.type) {
        return reducer(state, action);
    }

    return state;
}

export const createReducer = <TState>(
    defaultState: TState, 
    ...reducers: Array<Reducer<TState, any>>
) => (state: TState, action: AnyAction): TState => {
    return defaultState
};


const setIds = createActionCreator<number[]>('SET_IDS');
const appendIds = createActionCreator<string[]>('APPEND_IDS');

const ids = createReducer(
    [] as string[],
    reduce(setIds, (_, action) => action.payload.map(x => x.toString())),
    reduce(appendIds, (state, action) => [...state, ...action.payload])
)
