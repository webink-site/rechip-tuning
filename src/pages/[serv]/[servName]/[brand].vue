<template>
  <section class="bg-gray-2 pt-10 md:pt-20">
    <div class="container mx-auto px-4 md:px-0">
      <UiFormsCarSearch full />
    </div>
    <SearchModels v-if="data" :models="data" :title="marks?.find((i) => i.id === $route.params.brand.toString().toUpperCase())?.name ?? ''" />
  </section>
</template>

<script setup lang="ts">
import type { Model, Brand } from '@/src/types/car'

const route = useRoute()
const { data } = await useAsyncData<Model[]>('models', () => $fetch(`https://api.rechip-tuning.ru/wp-json/custom/v1/base?mark_id=${route.params.brand.toString().toUpperCase()}`))
const { data: marks } = await useAsyncData<Brand[]>('marks', () => $fetch('https://api.rechip-tuning.ru/wp-json/custom/v1/base'))

</script>

<style scoped>

</style>
