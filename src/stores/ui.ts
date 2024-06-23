import { defineStore } from 'pinia'

interface GoodsState {
  lang: 'ru' | 'en',
  regions: string[]
  activeRegion: string
}

export const useUiStore = defineStore('ui', {
  state: (): GoodsState => ({
    lang: 'ru',
    regions: [
      'Санкт-Петербург',
      'Москва',
      'Гатчина',
      'Нижний Новгород',
      'Ейск',
      'Псков',
      'Всеволожск',
      'Пермь',
      'Казань'
    ],
    activeRegion: 'Санкт-Петербург'
  }),
  getters: {

  },
  actions: {
    SET_REGION (region: string) {
      this.activeRegion = region
    }
  }
})
