import { PiniaPluginContext } from 'pinia'

function resetStore({ store }: PiniaPluginContext) {
  const initialState = useCloneDeep(store.$state)
  store.$reset = () => store.$patch(useCloneDeep(initialState))
}

export default defineNuxtPlugin(({ $pinia }) => {
  $pinia.use(resetStore)
})
