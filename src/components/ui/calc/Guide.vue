<template>
  <section class="py-12">
    <div class="container mx-auto px-4 md:px-0">
      <div class="grid grid-cols-12 gap-6">
        <div class="col-span-12">
          <h2 class="text-dark text-2xl font-bold mb-2">Как записаться?</h2>
        </div>
        <div v-for="(item, index) in icons" :key="index" class="col-span-12 md:col-span-4">
          <div class="h-full bg-gray-2 rounded-lg p-6">
            <img :src="item.img" class="mb-8" :alt="item.name">
            <p class="font-bold text-dark text-lg mb-2">{{ item.name }}</p>
            <p class="text-gray-400 text-sm">{{ item.sub }}</p>
          </div>
        </div>
        <div class="col-span-12">
          <div class="bg-cover bg-[url('/img/freediagn.webp')] rounded-lg bg-center px-8 py-6 md:h-64 ">
            <div class="flex flex-col justify-end h-full md:w-1/2">
              <div>
                <h3 class="text-white text-3xl font-bold mb-1.5">
                  Бесплатная компьютерная
                  диагностика
                </h3>
                <p class="text-white">
                  Мы бесплатно продиагностируем все датчики и блоки управления, и произведем настройку индивидуально под ваш автомобиль,
                  с учетом состояния машины и ваших пожеланий.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// import { BoltIcon } from '@heroicons/vue/24/outline/index.js'
import guide1 from '@/public/icons/guide1.svg'
import guide2 from '@/public/icons/guide2.svg'
import guide3 from '@/public/icons/guide3.svg'
import { useCity } from '~/src/helpers/useCiity'

const { getCityContact } = useCity()

const icons = [
  {
    name: '1. Звонок',
    sub: `Позвоните нам ${getCityContact.value?.addresses[0].phone_number ?? '+7 (905) 216-98-98'} и получите профессиональную консультацию.`,
    img: guide1
  },
  {
    name: '2. Запись',
    sub: 'Запишитесь на удобное время и приезжайте к нам в сервис на установку тюнинга.',
    img: guide2
  },
  {
    name: '3. Чип-тюнинг',
    sub: 'Оставьте автомобиль на 1-3 часа для индивидуальной настройки.',
    img: guide3
  }
]

</script>

<style scoped>

</style>
