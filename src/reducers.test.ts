import { Action, createActionCreator } from './actions';
import { createReducer, reduce } from './reducers';

describe('reducers', () => {
  describe('#createReducer', () => {
    it('should create reducer with provided default state', () => {
      const defaultState = 'test';
      const reducer = createReducer(defaultState);

      const result = reducer(undefined, { type: 'test' });

      expect(result).toEqual(defaultState);
    });

    it('should create reducer that reduces by action type', () => {
      const actionType = 'add';
      const reducer = createReducer(1, {
        [actionType]: (state, action) => state + action.payload
      });

      const result = reducer(1, { type: actionType, payload: 1 });

      expect(result).toEqual(2);
    });
  });

  describe('#reduce', () => {
    it('should create reducers map by action type and reducer', () => {
      const actionCreator = createActionCreator<number>('ADD');
      const add = (state: number, action: Action<number, any>) =>
        state + action.payload;
      const result = reduce(actionCreator, add);

      expect(result).toEqual({ [actionCreator.toString()]: add });
    });
  });
});
