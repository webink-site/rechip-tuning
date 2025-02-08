<template>
  <nuxt-link :to="`/services/${$route.params.serv ?? 'chip-tyuning'}/${item.slug.toLocaleLowerCase()}`.replaceAll('_', '-')">
    <div class="h-full bg-gray-3 hover:bg-[#DADADA] transition-all rounded-lg p-2.5 text-center select-none">
      <img
        :src="`https://api.rechip-tuning.ru/storage/${item.catalog_image}`"
        :alt="item.name"
        class="h-16 mx-auto object-contain mix-blend-multiply"
      >
      <p class="text-dark font-bold">{{ item.name }}</p>
    </div>
  </nuxt-link>
</template>

<script setup lang="ts">
import type { Brand } from '@/src/types/car'

type Props = {
  item: Brand
}

const { item } = defineProps<Props>()
</script>

<style scoped>

</style>
