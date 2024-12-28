<template>
  <section
    class="bg-center bg-no-repeat bg-cover py-12 px-10 md:h-[30rem] relative"
    :style="`background-image: url('https://api.rechip-tuning.ru/storage/${image}');`"
  >
    <div class="h-full top-0 left-0 w-full absolute bg-gradient-to-r from-black to-transparent opacity-80" />

    <div class="container mx-auto flex flex-col justify-between h-full relative">
      <div class="lg:w-1/2 mb-12 sm:mb-0">
        <h1 class="text-white text-2xl md:text-4xl font-bold mb-4">{{ title }}</h1>
        <p class="text-white leading-7">
          {{ description.replace('<p>', '').replace('</p>', '') }}
        </p>
      </div>
      <div class="flex items-center flex-wrap gap-5">
        <div class="h-12 w-12 bg-sky-500 rounded-lg bg-opacity-10 flex justify-center items-center">
          <img src="/public/icons/tg.svg" alt="Telegram" class="h-6">
        </div>
        <div>
          <p class="text-white font-semibold">Оценим стоимость услуги сейчас!</p>
          <p class="text-gray-400">Отправьте нам описание вашего автомобиля в мессенджер</p>
        </div>
      </div>
    </div>
    <!-- {{ page }} -->
  </section>
</template>

<script setup lang="ts">
// import { useServStore } from '@/src/stores/serv'

interface Props {
  title: string
  description: string
  image: string
}
const { title, description, image } = defineProps<Props>()
// const route = useRoute()
// const servStore = useServStore()

// const page = computed(() => {
//   return servStore.services.find(i => i.slug === route.params.serv)
// })
</script>

<style scoped>

</style>
