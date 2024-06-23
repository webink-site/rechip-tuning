<template>
  <section class="py-12">
    <div class="container mx-auto">
      <div class="grid grid-cols-12 gap-6">
        <div class="col-span-12">
          <h2 class="text-dark text-2xl font-bold mb-2">Преимущества</h2>
        </div>
        <div v-for="(item, index) in icons" :key="index" class="col-span-6">
          <div class="h-full bg-gray-2 rounded-lg p-6">
            <img :src="item.img" class="mb-8" :alt="item.name">
            <p class="font-bold text-dark text-lg mb-2">{{ item.name }}</p>
            <p class="text-gray-400 text-sm">{{ item.sub }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// import { BoltIcon } from '@heroicons/vue/24/outline/index.js'

import adv1 from '@/public/icons/adv1.svg'
import adv2 from '@/public/icons/adv2.svg'
import adv3 from '@/public/icons/adv3.svg'
import adv4 from '@/public/icons/adv4.svg'

const icons = [
  {
    name: '100% возврат средств',
    sub: 'На наши услуги действует 14-дневный тест-драйв. Если результат нашей работы не будет соответствовать заявленному, в течение этого срока мы вернем вам средства и восстановим заводские настройки автомобиля.',
    img: adv1
  },
  {
    name: 'Оплата после проверки',
    sub: 'Вы производите оплату, только если вас все устраивает в ходе пробной поездки. Цена не вырастет в ходе процедуры.',
    img: adv2
  },
  {
    name: 'Сохранение ресурса',
    sub: 'На наши услуги действует 14-дневный тест-драйв. Если результат нашей работы не будет соответствовать заявленному, в течение этого срока мы вернем вам средства и восстановим заводские настройки автомобиля.',
    img: adv3
  },
  {
    name: 'Гарантия 1 год',
    sub: 'Вы производите оплату, только если вас все устраивает в ходе пробной поездки. Цена не вырастет в ходе процедуры.',
    img: adv4
  }
]

</script>

<style scoped>

</style>
