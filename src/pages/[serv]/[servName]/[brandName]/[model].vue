<template>
  <section class="bg-gray-2 pt-10 md:pt-20">
    <div class="container mx-auto">
      <UiFormsCarSearch full />
    </div>
    <!-- {{ data }} -->
    <SearchGenerations v-if="data" :gens="data" :title="title" />
  </section>
</template>

<script setup lang="ts">
import type { Model } from '@/src/types/car'
import { useCarStore } from '@/src/stores/car'
const carStore = useCarStore()

const route = useRoute()
const { data } = await useAsyncData<Model[]>('generations', () => $fetch(`https://api.rechip-tuning.ru/wp-json/custom/v1/base?mark_id=${route.params.brandName.toString().toUpperCase()}&model_id=${route.params.model.toString().toUpperCase()}`))
// const { data: models } = await useAsyncData<Brand[]>('models', () => $fetch('https://api.rechip-tuning.ru/wp-json/custom/v1/base?full=1'))
useAsyncData('brands', () => carStore.LOAD_BRANDS())
const { data: models } = await useAsyncData<Model[]>('models', () => $fetch(`https://api.rechip-tuning.ru/wp-json/custom/v1/base?mark_id=${route.params.brandName.toString().toUpperCase()}`))

const title = computed(() => {
  const brand = carStore.brands?.find(i => i.id === route.params.brandName.toString().toUpperCase())

  if (brand) {
    const model = models.value?.find(i => i.id === route.params.model.toString().toUpperCase())
    return `${brand.name} ${model?.name}`
  } else {
    return ''
  }
})

useSeoMeta({
  title: () => `Чип-тюнинг Stage 1/Stage 2 ${title.value}`,
  ogTitle: () => `Чип-тюнинг Stage 1/Stage 2 ${title.value}`,
  description: 'Чип-тюнинг ателье ReChip Прошивка всех марок авто от 2000 г.в. с гарантией',
  ogDescription: 'Чип-тюнинг ателье ReChip Прошивка всех марок авто от 2000 г.в. с гарантией',
  ogType: 'website'
})

</script>

<style scoped>

</style>
