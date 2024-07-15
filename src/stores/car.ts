import { defineStore } from 'pinia'
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
    }
  },
  actions: {
    SET_SERV (serv: string) {
      this.search.serv = serv
    },
    SET_MOD (mod: string) {
      this.search.mod = mod
    },
    async LOAD_BRANDS () {
      const { data } = await useFetch<Brand[]>('http://api.rechip-tuning.ru/wp-json/custom/v1/base?full=1')
      if (data.value) {
        this.brands = data.value
      }
    },
    async LOAD_MODELS (brand: string) {
      this.search.brand = brand
      const models = await $fetch<any>(`http://api.rechip-tuning.ru/wp-json/custom/v1/base/${this.search.brand}`)
      if (models.length) {
        this.models = models
      }
    },
    async LOAD_GENS (model: string) {
      this.search.model = model
      const gens = await $fetch<any>(`http://api.rechip-tuning.ru/wp-json/custom/v1/base/${this.search.brand}/${this.search.model}`)
      if (gens.length) {
        this.gens = gens
      }
    },
    async LOAD_BODY (gen: string) {
      this.search.gen = gen
      const bodies = await $fetch<any>(`http://api.rechip-tuning.ru/wp-json/custom/v1/base/${this.search.brand}/${this.search.model}/${this.search.gen}`)
      if (bodies.length) {
        this.bodies = bodies
      }
    },
    LOAD_MODS (body: string) {
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
