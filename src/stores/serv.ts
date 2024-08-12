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
        id: 6180,
        slug: 'chip',
        name: 'Чип-тюнинг',
        sub: 'Чип-тюнинг автомобилей любой марки',
        img: serv3,
        width: 6
      },
      {
        id: 6190,
        slug: 'soot-filter',
        name: 'Отключение сажевого фильтра',
        sub: 'Программное отключение сажевого фильтра',
        img: serv4,
        width: 6
      },
      {
        id: 6193,
        slug: 'egr',
        name: 'Отключение клапана ЕГР',
        sub: 'Альтернатива ремонта данной системы',
        img: serv1,
        width: 6,
        high: true
      },
      {
        id: 6196,
        slug: 'ad-blue',
        name: 'Отключение системы мочевины AdBlue',
        sub: 'Программное отключение системы SCR',
        img: serv2,
        width: 6,
        high: true
      },
      {
        id: 6199,
        slug: 'euro-2',
        name: 'Прошивка Евро-2 после удаления катализатора',
        sub: 'Отключение лямбда-зонда и прошивка автомобиля',
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
