import { defineStore } from 'pinia'

interface GoodsState {
  lang: 'ru' | 'en',
  regions: {name: string, place: string}[]
  activeRegion: number
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
    activeRegion: 0
  }),
  getters: {

  },
  actions: {
    SET_REGION (region: number) {
      this.activeRegion = region
    }
  }
})
