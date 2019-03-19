import { ReducersMapObject } from 'redux'

type Subscriber = () => any

export const createReducerRegistry = (initialReducersMap: ReducersMapObject = {}) => {
  let currentReducerMap: ReducersMapObject = { ...initialReducersMap }
  let subscribers: Subscriber[] = []

  /**
   * Subscribe to registry changes after reducers have been added or removed
   */
  const subscribe = (subscriber: Subscriber) => {
    subscribers.push(subscriber)

    return () => {
      subscribers = subscribers.filter(x => x !== subscriber)
    }
  }

  const notifySubscribers = () => subscribers.forEach(subscriber => subscriber())

  /**
   * Add new reducers to the registry
   */
  const add = (reducersMap: ReducersMapObject) => {
    currentReducerMap = { ...currentReducerMap, ...reducersMap }
    notifySubscribers()
  }

  /**
   * Remove existing reducers from the registry
   */
  const remove = (...keys: string[]) => {
    const newReducerMap = Object.keys(currentReducerMap)
      .filter(key => !keys.includes(key))
      .reduce((reducerMap: ReducersMapObject, key) => {
        reducerMap[key] = currentReducerMap[key]

        return reducerMap
      }, {})

    currentReducerMap = newReducerMap
    notifySubscribers()
  }

  /**
   * Get current reducers
   */
  const getReducersMap = () => currentReducerMap

  return {
    add,
    getReducersMap,
    remove,
    subscribe
  }
}
