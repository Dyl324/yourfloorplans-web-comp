import { ref, watchEffect } from 'vue'
import type { Ref } from 'vue'
type LoadState<T> =
  | { type: 'SUCCESS'; data: T }
  | { type: 'LOADING' }
  | { type: 'ERROR'; error: Error }

const useLoadData = <T>(onLoad: () => Promise<T>): [Ref<LoadState<T>>, () => void] => {
  const state = ref<LoadState<Ref<T>>>({ type: 'LOADING' })

  const refresh = async () => {
    state.value = { type: 'LOADING' }
    try {
      const data = await onLoad()
      state.value = { type: 'SUCCESS', data }
    } catch (err) {
      console.error('An error occured loading data', err)
      state.value = { type: 'ERROR', error: err as Error }
    }
  }

  watchEffect(() => {
    refresh()
  })

  return [state, refresh]
}

export default useLoadData
