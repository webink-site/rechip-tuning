import { defineStore } from 'pinia'
import type { Contact } from '@/src/types/ui'
import { useRuntimeConfig } from '#imports'
interface GoodsState {
  lang: 'ru' | 'en',
  regions: {name: string, place: string}[]
  activeRegion: number
  contacts: Contact[]
}

export const useUiStore = defineStore('ui', {
  state: (): GoodsState => ({
    lang: 'ru',
    regions: [
      { name: 'Санкт-Петербург', place: 'Санкт-Петербурге' },
      { name: 'Москва', place: 'Москве' },
      { name: 'Гатчина', place: 'Гатчине' },
      { name: 'Нижний Новгород', place: 'Нижнем Новгороде' },
      { name: 'Ейск', place: 'Ейске' }
    ],
    activeRegion: Number(useRuntimeConfig().public.activeCity),
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
      const { data } = await useFetch<Contact[]>('http://api.rechip-tuning.ru/wp-json/custom/v1/page?slug=contacts')
      if (data.value) {
        this.contacts = data.value
      }
    }
  }
})
