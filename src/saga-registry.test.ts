import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { take } from 'redux-saga/effects';
import { createSagaRegistry } from './saga-registry';

const stubReducer = () => true;

describe('#createSagaRegistry', () => {
  describe('#add', () => {
    it('should add new saga', () => {
      const fn = jest.fn();
      function* saga() {
        fn();
        yield;
      }

      const sagaMiddleware = createSagaMiddleware();
      createStore(stubReducer, applyMiddleware(sagaMiddleware));
      const sagaRegistry = createSagaRegistry(sagaMiddleware);

      sagaRegistry.add(saga);

      expect(fn).toHaveBeenCalled();
    });

    it('should not add already existing saga', () => {
      const fn = jest.fn();

      function* saga() {
        fn();
        yield;
      }

      const sagaMiddleware = createSagaMiddleware();
      createStore(stubReducer, applyMiddleware(sagaMiddleware));
      const sagaRegistry = createSagaRegistry(sagaMiddleware);

      sagaRegistry.add(saga);
      sagaRegistry.add(saga);

      expect(fn).toHaveBeenCalledTimes(1);
    });
  });

  describe('#remove', () => {
    it('should remove existing saga', () => {
      const fn = jest.fn();
      const actionType = 'TEST';

      function* saga() {
        while (true) {
          yield take(actionType);

          fn();
        }
      }

      const sagaMiddleware = createSagaMiddleware();
      const store = createStore(stubReducer, applyMiddleware(sagaMiddleware));
      const sagaRegistry = createSagaRegistry(sagaMiddleware);

      sagaRegistry.add(saga);
      sagaRegistry.remove(saga);
      store.dispatch({ type: actionType });

      expect(fn).not.toHaveBeenCalled();
    });

    it('should do nothing when saga does not exist', () => {
      const fn = jest.fn();
      const actionType = 'TEST';

      function* saga() {
        while (true) {
          yield take(actionType);

          fn();
        }
      }

      const sagaMiddleware = createSagaMiddleware();
      const store = createStore(stubReducer, applyMiddleware(sagaMiddleware));
      const sagaRegistry = createSagaRegistry(sagaMiddleware);

      sagaRegistry.remove(saga);
      store.dispatch({ type: actionType });

      expect(fn).not.toHaveBeenCalled();
    });
  });
});
