import { defineStore } from 'pinia'
import type { Service } from '@/src/types/ui'
import serv1 from '@/public/img/serv1.webp'
import serv2 from '@/public/img/serv2.webp'
import serv3 from '@/public/img/serv3.webp'
import serv4 from '@/public/img/serv4.webp'
import serv5 from '@/public/img/serv5.webp'

interface GoodsState {
  services: Service[]
}

export const useServStore = defineStore('serv', {
  state: (): GoodsState => ({
    services: [
      {
        slug: 'chip',
        name: 'Чип-тюнинг',
        sub: 'Сделаем из вашего ведра бандитскую повозку',
        img: serv3,
        width: 6
      },
      {
        slug: 'soot-filter',
        name: 'Отключение сажевого фильтра',
        sub: 'Сделаем из вашего ведра бандитскую повозку',
        img: serv4,
        width: 6
      },
      {
        slug: 'egr',
        name: 'Отключение клапана ЕГР',
        sub: 'Сделаем из вашего ведра бандитскую повозку',
        img: serv1,
        width: 6,
        high: true
      },
      {
        slug: 'ad-blue',
        name: 'Отключение системы мочевины AdBlue',
        sub: 'Сделаем из вашего ведра бандитскую повозку',
        img: serv2,
        width: 6,
        high: true
      },
      {
        slug: 'euro-2',
        name: 'Прошивка Евро-2 после удаления катализатора',
        sub: 'Сделаем из вашего ведра бандитскую повозку',
        img: serv5,
        width: 12
      }
    ]
  }),
  getters: {

  },
  actions: {

  }
})
