import { Reducer } from 'redux';
import { ActionWithPayload, createActionCreator } from './actions';
import { createReducer, reduce } from './reducers';

describe('reducers', () => {
  describe('#createReducer', () => {
    describe('type checks', () => {
      it('should infer `state` from `defaultState`', () => {
        const numberReducer: Reducer<number> = createReducer(5);
        const stringReducer: Reducer<string> = createReducer('test');
        const objectReducer: Reducer<{ foo: boolean }> = createReducer({
          foo: true
        });

        expect(numberReducer);
        expect(stringReducer);
        expect(objectReducer);
      });

      it('should infer `state` inside reducers map object', () => {
        createReducer(
          { testProperty: true },
          {
            foo: state => ({ testProperty: state.testProperty }),
            bar: state => ({ testProperty: state.testProperty })
          }
        );
      });
    });

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
    describe('type checks', () => {
      it('should infer action type from action creator', () => {
        const testActionCreator = () => ({ type: 'test', payload: 5 });

        reduce(testActionCreator, (_, action) => action.payload);
      });

      it('should infer `state` from `createReducer`', () => {
        const actionCreator2 = () => ({ type: 'test-2' });
        const actionCreator1 = () => ({ type: 'test-1' });

        createReducer(
          { testProperty: 5 },
          reduce(actionCreator1, state => ({
            testProperty: state.testProperty
          })),
          reduce(actionCreator2, state => ({
            testProperty: state.testProperty
          }))
        );
      });
    });

    it('should create reducers map by action type and reducer', () => {
      const actionCreator = createActionCreator<number>('ADD');
      const add = (state: number, action: ActionWithPayload<string, number>) =>
        state + action.payload;
      const result = reduce(actionCreator, add);

      expect(result).toEqual({ [actionCreator.toString()]: add });
    });
  });
});
