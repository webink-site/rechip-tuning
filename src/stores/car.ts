import { defineStore } from 'pinia'
import { popular } from '../helpers/popular'
import type { Brand } from '@/src/types/car'

interface GoodsState {
  search: {
    serv: string | null,
    brand: string | null,
    model: string | null
    gen: string | null
    body: string | null
    mod: string | null
  },
  servces: string[]
  brands: Brand[]
  models: any
  gens: any
  bodies: any
  mods: any
}

export const useCarStore = defineStore('car', {
  state: (): GoodsState => ({
    search: {
      serv: null,
      brand: null,
      model: null,
      gen: null,
      body: null,
      mod: null
    },
    servces: ['Чип-тюнинг', 'Система мочевины AdBlue'],
    brands: [],
    models: [],
    gens: [],
    bodies: [],
    mods: []
  }),
  getters: {
    getGens (state) {
      return state.gens?.map((i: any) => {
        return {
          ...i,
          gen_name: i['year-stop'] ? `${i.name ? i.name + ' ' : ''} ${i['year-start']} - ${i['year-stop']}` : `${i.name ? i.name + ' ' : ''}${i['year-start']}`
        }
      })
    },
    getBodies (state) {
      return Object.entries(state.bodies).flatMap(([bodyType, cars]) =>
        (cars as Array<{ [key: string]: any }>).map(car => ({ bodyType, ...car, search: `${car.name} (${bodyType})` }))
      )
    }
  },
  actions: {
    SET_SERV (serv: string | null) {
      this.search.serv = serv
    },
    SET_MOD (mod: string | null) {
      this.search.mod = mod
    },
    async LOAD_BRANDS () {
      if (this.brands.length) { return }
      const { data } = await useFetch<Brand[]>('https://api.rechip-tuning.ru/wp-json/custom/v1/base/test')
      if (data.value) {
        this.brands = data.value.map((i) => {
          return {
            ...i,
            popular: popular.includes(i.id)
          }
        })
      }
    },
    async LOAD_MODELS (brand: string | null) {
      if (!brand) { return }
      this.search.brand = brand
      const models = await $fetch<any>(`https://api.rechip-tuning.ru/wp-json/custom/v1/base/test?mark_id=${this.search.brand}`)
      if (models.length) {
        this.models = models
      }
    },
    async LOAD_GENS (model: string | null) {
      if (!model) { return }
      this.search.model = model
      const gens = await $fetch<any>(`https://api.rechip-tuning.ru/wp-json/custom/v1/base/test?mark_id=${this.search.brand}&model_id=${this.search.model}`)
      if (gens.length) {
        this.gens = gens
      }
    },
    async LOAD_BODY (gen: string | null) {
      if (!gen) { return }
      this.search.gen = gen
      const bodies = await $fetch<any>(`https://api.rechip-tuning.ru/wp-json/custom/v1/base/test?mark_id=${this.search.brand}&model_id=${this.search.model}&generation_id=${this.search.gen}`)
      if (bodies) {
        this.bodies = bodies
      }
    },
    LOAD_MODS (body: string | null) {
      if (!body) { return }
      this.search.body = body
      const mods = this.bodies.find((i: any) => i.id === this.search.body)
      if (mods) {
        this.mods = mods.modifications.map((i: any) => {
          return {
            ...i,
            title: `${i.specifications['volume-litres'] ? i.specifications['volume-litres'] + 'л. ' : ''} ${i.specifications.transmission} ${i.specifications['horse-power']} л.с. ${i.specifications['engine-type']} ${i['group-name'] ?? ''}`
          }
        })
      }
    }
  }
})
