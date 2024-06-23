<template>
  <div class="col-span-12">
    <div class="flex gap-6 items-center rounded-xl bg-white px-8 py-5">
      <div class="flex items-end gap-2">
        <img src="/icons/ya.svg" alt="">
        <div>
          <p class="text-dark font-semibold leading-4">Рейтинг 5</p>
          <p class="text-gray-400">оценка Яндекс</p>
        </div>
      </div>
      <div class="flex ">
        <StarIcon v-for="i in 5" :key="i" class="text-yellow-500 h-6" />
      </div>
      <p class="text-gray-400">Более 100 оценок</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { StarIcon } from '@heroicons/vue/24/solid/index.js'
</script>

<style scoped>

</style>
