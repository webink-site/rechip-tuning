import { defineStore } from 'pinia'
import type { Contact, Homepage } from '@/src/types/ui'
// import { useRuntimeConfig } from '#imports'

// const host = window.location.hostname

// console.log(host)
interface GoodsState {
  lang: 'ru' | 'en',
  regions: {name: string, place: string, code: string, web: string}[]
  activeRegion: number
  contacts: Contact[]
  homepage: null | Homepage
}

export const useUiStore = defineStore('ui', {
  state: (): GoodsState => ({
    lang: 'ru',
    regions: [
      { name: 'Ейск', place: 'Ейске', code: 'yeysk', web: 'https://yeysk.rechip-tuning.ru' },
      { name: 'Нефтекамск', place: 'Нефтекамске', code: 'nevtekamsk', web: 'https://nevtekamsk.rechip-tuning.ru' },
      { name: 'Крым', place: 'Крыму', code: 'simferopol', web: 'https://simferopol.rechip-tuning.ru' },
      { name: 'Санкт-Петербург', place: 'Санкт-Петербурге', code: 'spb', web: 'https://spb.rechip-tuning.ru' },
      { name: 'Москва', place: 'Москве', code: 'msk', web: 'https://msk.rechip-tuning.ru' },
      { name: 'Северодвинск', place: 'Северодвинскe', code: 'severodvinsk', web: 'https://severodvinsk.rechip-tuning.ru' },
      { name: 'Орск', place: 'Орске', code: 'orsk', web: 'https://orsk.rechip-tuning.ru' },
      { name: 'Краснодар', place: 'Краснодаре', code: 'krasnodar', web: 'https://krasnodar.rechip-tuning.ru' },
      { name: 'Новотроицк', place: 'Новотроицке', code: 'novotroitsk', web: 'https://novotroitsk.rechip-tuning.ru' }
    ],
    activeRegion: 4,
    // activeRegion: Number(useRuntimeConfig().public.activeCity),
    contacts: [],
    homepage: null
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
      const { data } = await useFetch<Contact[]>('https://api.rechip-tuning.ru/api/page?slug=contacts')
      if (data.value) {
        this.contacts = data.value
      }
    },
    async LOAD_HOMEPAGE () {
      const { data } = await useFetch<Homepage>('https://api.rechip-tuning.ru/api/page?slug=main')
      if (data.value) {
        this.homepage = data.value
      }
    }
  }
})
