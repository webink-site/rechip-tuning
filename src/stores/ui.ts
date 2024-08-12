import { defineStore } from 'pinia'
import type { Contact } from '@/src/types/ui'
// import { useRuntimeConfig } from '#imports'
interface GoodsState {
  lang: 'ru' | 'en',
  regions: {name: string, place: string, code: string, web: string}[]
  activeRegion: number
  contacts: Contact[]
}

export const useUiStore = defineStore('ui', {
  state: (): GoodsState => ({
    lang: 'ru',
    regions: [
      { name: 'Санкт-Петербург', place: 'Санкт-Петербурге', code: 'spb', web: 'https://spb.rechip-tuning.ru/' },
      { name: 'Москва', place: 'Москве', code: 'msk', web: 'https://msk.rechip-tuning.ru/' }
      // { name: 'Гатчина', place: 'Гатчине', code: 'gtn' },
      // { name: 'Нижний Новгород', place: 'Нижнем Новгороде', code: 'nng' },
      // { name: 'Ейск', place: 'Ейске', code: 'ysk' }
    ],
    activeRegion: 0,
    // activeRegion: Number(useRuntimeConfig().public.activeCity),
    contacts: []
  }),
  getters: {
    getCurrentRegion (state) {
      return state.contacts.find(i => i.region_name === state.regions[state.activeRegion].name)
    }
  },
  actions: {
    SET_REGION (region: number) {
      this.activeRegion = region
    },
    async LOAD_CONTACTS () {
      const { data } = await useFetch<Contact[]>('https://api.rechip-tuning.ru/wp-json/custom/v1/page?slug=contacts')
      if (data.value) {
        this.contacts = data.value
      }
    }
  }
})
