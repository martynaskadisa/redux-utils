import { createReducer } from './reducers';

describe('reducers', () => {
    describe('#createReducer', () => {
        it('should create reducer with provided default state', () => {
            const defaultState = 'test';
            const reducer = createReducer(defaultState);

            const result = reducer(undefined, { type: 'test' });

            expect(result).toEqual(defaultState);
        })

        it('should create reducer that reduces by action type', () => {
            const actionType = 'add';
            const reducer = createReducer(1, {
                [actionType]: (state, action) => state + action.payload
            })

            const result = reducer(1, { type: actionType, payload: 1 });

            expect(result).toEqual(2);
        });
    });
})