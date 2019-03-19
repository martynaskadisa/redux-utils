import { append, merge, prepend, set } from './helpers'

describe('helpers', () => {
  describe('#set', () => {
    it(`should return action's payload`, () => {
      const action = { type: 'test', payload: 1, meta: {} }

      const result = set(0, action)

      expect(result).toEqual(1)
    })
  })

  describe('#append', () => {
    it('should append payload to state', () => {
      const state = [1, 2, 3]
      const action = { type: 'test', payload: [4, 5, 6], meta: {} }

      const result = append(state, action)

      expect(result).toEqual([1, 2, 3, 4, 5, 6])
    })
  })

  describe('#prepend', () => {
    it('should append payload to state', () => {
      const state = [4, 5, 6]
      const action = { type: 'test', payload: [1, 2, 3], meta: {} }

      const result = prepend(state, action)

      expect(result).toEqual([1, 2, 3, 4, 5, 6])
    })
  })

  describe('#merge', () => {
    it('should merge state and payload', () => {
      const state = { foo: 'foo' }
      const action = { type: 'test', payload: { bar: 'bar' }, meta: {} }

      const result = merge(state, action)

      expect(result).toEqual({ foo: 'foo', bar: 'bar' })
    })
  })
})
