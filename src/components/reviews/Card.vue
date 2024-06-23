<template>
  <div class="bg-white rounded-xl px-8 py-6 break-inside-avoid mb-6">
    <div class="flex gap-4 items-center">
      <img
        src="https://img.freepik.com/free-photo/young-and-beautiful-woman-in-pink-warm-sweater-natural-look-smiling-portrait-on-isolated-long-hair_285396-896.jpg"
        class="h-10 w-10 rounded-lg object-cover"
      >
      <div>
        <p class="text-dark font-semibold leading-4">{{ item.name }}</p>
        <p class="text-gray-400 text-sm">{{ item.date }}</p>
      </div>
    </div>
    <div class="my-4 flex">
      <StarIcon v-for="i in 5" :key="i" class="text-yellow-500 h-6" />
    </div>
    <p class="text-gray-400">{{ item.text }}</p>
  </div>
</template>

<script setup lang="ts">
import { StarIcon } from '@heroicons/vue/24/solid/index.js'

interface Props {
  item: {
    name: string
    date: string
    text: string
  }
}
const { item } = defineProps<Props>()
</script>

<style scoped>

</style>
