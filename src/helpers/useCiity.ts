import { computed } from 'vue'
import { useUiStore } from '../stores/ui'

export function useCity () {
  const uiStore = useUiStore()
  const getCityIndex = computed(() => {
    const host = window?.location?.hostname ?? 'msk'

    const index = uiStore.regions.findIndex(i => host.includes(i.code))
    return index !== -1 ? index : 4
  })

  const getCityContact = computed(() => {
    const host = window?.location?.hostname ?? 'msk'

    const city = uiStore.contacts.find(i => host === i.region_code)
    return city ?? uiStore.contacts.find(i => i.region_code === 'msk')
  })

  return {
    getCityIndex,
    getCityContact
  }
}
