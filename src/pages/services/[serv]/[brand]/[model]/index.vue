<template>
  <section class="bg-gray-2 pt-10 md:pt-20">
    <div class="container mx-auto">
      <UiFormsCarSearch />
    </div>
    <SearchGenerations v-if="data" :gens="data" :title="title" />
  </section>
</template>

<script setup lang="ts">
import type { Model } from '@/src/types/car'
import { useCarStore } from '@/src/stores/car'
import { useServStore } from '~/src/stores/serv'
import { useUiStore } from '@/src/stores/ui'
import { useCity } from '~/src/helpers/useCiity'

const { getCityIndex } = useCity()
const uiStore = useUiStore()
const servStore = useServStore()
const carStore = useCarStore()

const route = useRoute()
const { data } = await useAsyncData<Model[]>('generations', () => $fetch(`http://api.rechip-tuning.ru/wp-json/custom/v1/base/test?mark_id=${route.params.brand.toString().toUpperCase()}&model_id=${route.params.model.toString().toUpperCase()}`))
useAsyncData('brands', () => carStore.LOAD_BRANDS())
const { data: models } = await useAsyncData<Model[]>('models', () => $fetch(`http://api.rechip-tuning.ru/wp-json/custom/v1/base/test?mark_id=${route.params.brand.toString().toUpperCase()}`))

const title = computed(() => {
  const brand = carStore.brands?.find(i => i.id === route.params.brand.toString().toUpperCase())

  if (brand) {
    const model = models.value?.find(i => i.id === route.params.model.toString().toUpperCase())
    return `${brand.name} ${model?.name ?? ''}`
  } else {
    return ''
  }
})

useSeoMeta({
  title: () => `${servStore.services.find((i: any) => i.slug === route.params.serv)?.name} ${title.value} - прошивка Stage 1/Stage 2 в ${uiStore.regions[getCityIndex.value].place}`,
  ogTitle: () => `${servStore.services.find((i: any) => i.slug === route.params.serv)?.name} ${title.value} - прошивка Stage 1/Stage 2 в ${uiStore.regions[getCityIndex.value].place}`,
  description: `Услуги чип тюнинга автомобиля ${title.value} в ${uiStore.regions[getCityIndex.value].place}. Прострелы выхлопной системы на сбросе газа. Чип тюнинг коробки DSG. Наша компания ReChip предоставляет гарантию 1 год и 14 - дневный тест-драйв. Оплата после проверки.`,
  ogDescription: `Услуги чип тюнинга автомобиля ${title.value} в ${uiStore.regions[getCityIndex.value].place}. Прострелы выхлопной системы на сбросе газа. Чип тюнинг коробки DSG. Наша компания ReChip предоставляет гарантию 1 год и 14 - дневный тест-драйв. Оплата после проверки.`,
  ogType: 'website'
})

</script>

<style scoped>

</style>
