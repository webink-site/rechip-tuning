<template>
  <section class="py-12 bg-gray-2">
    <div class="container mx-auto">
      <div class="grid grid-cols-12 gap-6">
        <div class="col-span-12">
          <h2 class="text-dark text-4xl font-bold mb-2">Наши услуги</h2>
        </div>

        <div v-for="(item, index) in servStore.services" :key="index" :class="`col-span-${item.width}`">
          <nuxt-link :to="`/services/${item.slug}`">
            <div
              class="bg-center bg-no-repeat bg-cover rounded-lg py-8 px-10 h-[20rem] flex flex-col justify-between"
              :style="`background-image: url('${item.img}');`"
              :class="{'!h-[30rem]' : item.high}"
            >
              <div>
                <h3 class="text-white text-3xl mb-4 font-bold">{{ item.name }}</h3>
                <p class="text-white w-1/2">{{ item.sub }}</p>
              </div>
              <UiButton white text="Узнать подробнее" />
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useServStore } from '@/src/stores/serv'

const servStore = useServStore()
// import serv1 from '@/public/img/serv1.webp'
// import serv2 from '@/public/img/serv2.webp'
// import serv3 from '@/public/img/serv3.webp'
// import serv4 from '@/public/img/serv4.webp'
// import serv5 from '@/public/img/serv5.webp'

// const services = [
//   {
//     name: 'Чип-тюнинг',
//     sub: 'Сделаем из вашего ведра бандитскую повозку',
//     img: serv3,
//     width: 6
//   },
//   {
//     name: 'Отключение сажевого фильтра',
//     sub: 'Сделаем из вашего ведра бандитскую повозку',
//     img: serv4,
//     width: 6
//   },
//   {
//     name: 'Отключение клапана ЕГР',
//     sub: 'Сделаем из вашего ведра бандитскую повозку',
//     img: serv1,
//     width: 6,
//     high: true
//   },
//   {
//     name: 'Отключение системы мочевины AdBlue',
//     sub: 'Сделаем из вашего ведра бандитскую повозку',
//     img: serv2,
//     width: 6,
//     high: true
//   },
//   {
//     name: 'Прошивка Евро-2 после удаления катализатора',
//     sub: 'Сделаем из вашего ведра бандитскую повозку',
//     img: serv5,
//     width: 12
//   }
// ]

</script>

<style scoped>

</style>
