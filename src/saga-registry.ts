import { Saga, SagaMiddleware, Task } from 'redux-saga'

export const createSagaRegistry = ({ run }: SagaMiddleware) => {
  const sagasMap = new Map<Saga, Task>()

  const add = (...sagas: Saga[]) => {
    sagas.forEach(saga => {
      if (sagasMap.has(saga)) {
        return
      }

      sagasMap.set(saga, run(saga))
    })
  }

  const remove = (...sagas: Saga[]) => {
    sagas.forEach(saga => {
      if (!sagasMap.has(saga)) {
        return
      }

      const task = sagasMap.get(saga)!
      task.cancel()
      sagasMap.delete(saga)
    })
  }

  return {
    add,
    remove
  }
}
