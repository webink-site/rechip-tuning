import { computed } from 'vue'
import { useUiStore } from '../stores/ui'
// import { useYandexMetrika } from '#imports'

export function useCity () {
  const uiStore = useUiStore()
  // const { reachGoal } = useYandexMetrika()

  const getCityIndex = computed(() => {
    const host = window?.location?.hostname ?? 'msk'

    const index = uiStore.regions.findIndex(i => host.includes(i.code))
    return index !== -1 ? index : 4
  })

  const getCityContact = computed(() => {
    const host = window?.location?.hostname ?? 'msk'

    const city = uiStore.contacts.find(i => host.includes(i.region_code))
    return city ?? uiStore.contacts.find(i => i.region_code === 'msk')
  })

  // function watchTelClick () {
  //   switch (getCityContact.value?.region_code) {
  //     case 'msk':
  //       reachGoal('ostzavmoch')
  //       break
  //     case 'Отключение клапана ЕГР':
  //       reachGoal('ostzavklapegr')
  //       break
  //     case 'Прошивка Евро-2':
  //       reachGoal('ostzaveuro')
  //       break
  //     case 'Отключение сажевого фильтра':
  //       reachGoal('ostzavfiltr')
  //       break
  //     default:
  //       reachGoal('ostzavchiptune')
  //   }
  // }

  return {
    getCityIndex,
    getCityContact
  }
}
