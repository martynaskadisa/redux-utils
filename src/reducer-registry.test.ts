import { createReducerRegistry } from './reducer-registry';

describe('#createReducerRegistry', () => {
  describe('#getReducersMap', () => {
    it('should return current reducers map', () => {
      const fooReducer = () => 'foo';
      const registry = createReducerRegistry({ fooReducer });

      const expected = { fooReducer };
      const result = registry.getReducersMap();

      expect(result).toEqual(expected);
    });
  });

  describe('#add', () => {
    it('should allow adding new reducers', () => {
      const registry = createReducerRegistry();
      const fooReducer = () => true;

      registry.add({ fooReducer });

      const expected = { fooReducer };
      const result = registry.getReducersMap();

      expect(result).toEqual(expected);
    });

    it('should merge initial reducers map with new reducers map', () => {
      const fooReducer = () => 'foo';
      const registry = createReducerRegistry({ fooReducer });

      const barReducer = () => 'bar';
      registry.add({ barReducer });

      const expected = { fooReducer, barReducer };
      const result = registry.getReducersMap();

      expect(result).toEqual(expected);
    });

    it('should always merge previous reducer map with new reducers map', () => {
      const fooReducer = () => 'foo';
      const registry = createReducerRegistry({ fooReducer });

      const barReducer = () => 'bar';
      registry.add({ barReducer });

      const bazReducer = () => 'baz';
      registry.add({ bazReducer });

      const expected = { fooReducer, barReducer, bazReducer };
      const result = registry.getReducersMap();

      expect(result).toEqual(expected);
    });
  });

  describe('#remove', () => {
    it('should remove existing reducer by key', () => {
      const fooReducer = () => 'foo';
      const barReducer = () => 'bar';
      const registry = createReducerRegistry({ fooReducer, barReducer });

      registry.remove('barReducer');

      const expected = { fooReducer };
      const result = registry.getReducersMap();

      expect(result).toEqual(expected);
    });
  });

  describe('#subscribe', () => {
    it('should notify subscribers when new reducer is added', () => {
      const subscriber = jest.fn();
      const registry = createReducerRegistry();

      registry.subscribe(subscriber);

      const fooReducer = () => 'foo';
      registry.add({ fooReducer });

      expect(subscriber).toBeCalledTimes(1);
    });

    it('should notify subscribers when reducers are removed', () => {
      const subscriber = jest.fn();
      const fooReducer = () => 'foo';
      const registry = createReducerRegistry({ fooReducer });

      registry.subscribe(subscriber);
      registry.remove('fooReducer');

      expect(subscriber).toBeCalledTimes(1);
    });

    it('should unsubscribe when called the returned function', () => {
      const subscriber = jest.fn();
      const registry = createReducerRegistry();
      const unsubscribe = registry.subscribe(subscriber);

      unsubscribe();

      const fooReducer = () => 'foo';
      registry.add({ fooReducer });

      expect(subscriber).not.toBeCalled();
    });
  });
});
