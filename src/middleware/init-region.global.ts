import { useUiStore } from '../stores/ui'

export default defineNuxtRouteMiddleware((_to, _from) => {
  const uiStore = useUiStore()
  const event = useRequestEvent()

  const reqHost = event?.path ?? ''

  uiStore.initializeActiveRegionByHost(reqHost)
})
