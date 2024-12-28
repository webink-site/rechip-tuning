import { defineStore } from 'pinia'
import type { Service } from '@/src/types/ui'
// import serv1 from '@/public/img/serv1.webp'
// import serv2 from '@/public/img/serv2.webp'
// import serv3 from '@/public/img/serv3.webp'
// import serv4 from '@/public/img/serv4.webp'
// import serv5 from '@/public/img/serv5.webp'

interface GoodsState {
  services: Service[]
}

export const useServStore = defineStore('serv', {
  state: (): GoodsState => ({
    services: []
  }),
  getters: {

  },
  actions: {
    async LOAD_SERVICES () {
      const services = await $fetch<any>('https://api.rechip-tuning.ru/api/services')
      if (services) {
        this.services = services.data.filter((i: any) => i.slug)
      }
    }
  }
})
