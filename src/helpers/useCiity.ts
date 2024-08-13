import { computed } from 'vue'
import { useUiStore } from '../stores/ui'

export function useCity () {
  const uiStore = useUiStore()
  const getCityIndex = computed(() => {
    const host = window?.location?.hostname ?? 'ekb'

    const index = uiStore.regions.findIndex(i => host.includes(i.code))
    return index !== -1 ? index : 1
  })

  return {
    getCityIndex
  }
}
