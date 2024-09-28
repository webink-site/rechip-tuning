<template>
  <section class="bg-gray-2 pt-10 md:pt-20">
    <div class="container mx-auto">
      <UiFormsCarSearch full />
    </div>
    <section class="py-6 pb-20">
      <div class="container mx-auto px-4 md:px-0">
        <SearchComplectationNew :complectation="data" :title="title" :bodytype="bodytype" />
      </div>
    </section>
    <pre>{{ data }}</pre>
    <div class="bg-white py-16">
      <!-- <SearchMods v-if="mods" :mods="mods" /> -->
      <UiCalcGuide />
      <HomeAdvant />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Model } from '@/src/types/car'
import { useCarStore } from '@/src/stores/car'
import { useUiStore } from '@/src/stores/ui'
import { useCity } from '~/src/helpers/useCiity'

const { getCityIndex } = useCity()
const uiStore = useUiStore()
const carStore = useCarStore()
const route = useRoute()

const { data } = await useAsyncData('complectations', () => $fetch(`https://api.rechip-tuning.ru/wp-json/custom/v1/base/test?mark_id=${route.params.brand}&model_id=${route.params.model}&generation_id=${route.params.gen}&product_id=${route.params.id}`))
const { data: models } = await useAsyncData<Model[]>('modelsForTitle', () => $fetch(`https://api.rechip-tuning.ru/wp-json/custom/v1/base/test?mark_id=${route.params.brand}`))
const { data: generations } = await useAsyncData<any>('generations', () => $fetch(`https://api.rechip-tuning.ru/wp-json/custom/v1/base/test?mark_id=${route.params.brand.toString().toUpperCase()}&model_id=${route.params.model.toString().toUpperCase()}&generation_id=${route.params.gen}`))

const title = computed(() => {
  const brand = carStore.brands?.find(i => i.id === route.params.brand.toString().toUpperCase())
  if (brand) {
    const model = models.value?.find(i => i.id === route.params.model.toString().toUpperCase())
    return `${brand.name} ${model?.name}`
  } else {
    return ''
  }
})

const bodytype = computed(() => {
  const result = Object.entries(generations.value).flatMap(([bodytype, cars]: any) =>
    cars.map((car: any) => ({
      ...car,
      bodytype
    }))
  )
  return result.find((i: any) => i.id === route.params.id).bodytype ?? ''
})

useSeoMeta({
  title: () => `Чип тюнинг ${title.value} ${data.value?.modification.specifications['volume-litres']} ${data.value?.modification.specifications['horse-power']} л.с прошивка Stage 1/Stage 2 в ${uiStore.regions[getCityIndex.value].place}`,
  ogTitle: () => `Чип тюнинг ${title.value} ${data.value?.modification.specifications['volume-litres']} ${data.value?.modification.specifications['horse-power']} л.с прошивка Stage 1/Stage 2 в ${uiStore.regions[getCityIndex.value].place}`,
  description: () => `Услуги чип тюнинга автомобиля ${title.value} ${data.value?.modification.specifications['volume-litres']} ${data.value?.modification.specifications['horse-power']} л.с в ${uiStore.regions[getCityIndex.value].place}. Прострелы выхлопной системы на сбросе газа. Чип тюнинг коробки DSG. Наша компания ReChip предоставляет гарантию 1 год и 14 - дневный тест-драйв. Оплата после проверки.`,
  ogDescription: () => `Услуги чип тюнинга автомобиля ${title.value} ${data.value?.modification.specifications['volume-litres']} ${data.value?.modification.specifications['horse-power']} л.с в ${uiStore.regions[getCityIndex.value].place}. Прострелы выхлопной системы на сбросе газа. Чип тюнинг коробки DSG. Наша компания ReChip предоставляет гарантию 1 год и 14 - дневный тест-драйв. Оплата после проверки.`,
  ogType: 'website',
  ogImage: () => `https://api.rechip-tuning.ru/wp-content/themes/rechip-tuning/assets/photos/${data.value?.modification.path['configuration-id']}.jpg`
})

</script>

<style scoped>

</style>
