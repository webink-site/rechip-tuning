<template>
  <div class="bg-white rounded-xl px-8 py-6 break-inside-avoid mb-6">
    <div class="flex gap-4 items-center">
      <div class="h-10 w-10 bg-neutral-300 rounded-lg text-xl text-white font-semibold justify-center items-center flex">
        {{ item.sender.name[0] }}
      </div>
      <div>
        <p class="text-dark font-semibold leading-4">{{ item.sender.name }}</p>
        <p class="text-gray-400 text-sm">{{ formatDate(item.createdAt) }}</p>
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
import { formatDate } from '@/src/helpers/date'
import type { ReviewItem } from '~/src/types/ui'

interface Props {
  item: ReviewItem
}
const { item } = defineProps<Props>()
</script>

<style scoped>

</style>
