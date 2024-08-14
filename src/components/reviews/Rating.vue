<template>
  <div class="col-span-6 col-start-4">
    <div class="flex flex-wrap gap-6 items-center rounded-xl bg-white px-8 py-5 border">
      <div class="flex items-end gap-2">
        <img v-if="title === 'Яндекс'" src="/icons/ya.svg" :alt="title" class="h-10">
        <img v-else src="/icons/avito.svg" :alt="title" class="h-10">
        <div>
          <p class="text-dark font-semibold leading-4">{{ title }}</p>
          <p class="text-gray-400">Отзывы</p>
        </div>
      </div>
      <!-- <div class="flex ">
        <StarIcon v-for="i in 5" :key="i" class="text-yellow-500 h-6" />
      </div>
      <p class="text-gray-400">Более 100 оценок</p> -->
    </div>
  </div>
</template>

<script setup lang="ts">

type Props = {
  title: string
}
const { title } = defineProps<Props>()
// import { StarIcon } from '@heroicons/vue/24/solid/index.js'
</script>

<style scoped>

</style>
