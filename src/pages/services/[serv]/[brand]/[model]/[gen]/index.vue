<template>
  <section class="bg-gray-2 pt-10 md:pt-20">
    <div class="container mx-auto">
      <UiFormsCarSearch />
    </div>
    <SearchModsNew :mods="data" />
  </section>
</template>

<script setup lang="ts">
import { useServStore } from '~/src/stores/serv'
import { useUiStore } from '~/src/stores/ui'
import { useCity } from '~/src/helpers/useCiity'
import { useCarStore } from '@/src/stores/car'
import type { Model } from '@/src/types/car'

const carStore = useCarStore()
const { getCityIndex } = useCity()
const uiStore = useUiStore()
const servStore = useServStore()
const route = useRoute()

useAsyncData('brands', () => carStore.LOAD_BRANDS())
const { data } = await useAsyncData('mods', () => $fetch(`http://api.rechip-tuning.ru/wp-json/custom/v1/base/test?mark_id=${route.params.brand}&model_id=${route.params.model}&generation_id=${route.params.gen}`))
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
  title: () => `${servStore.services.find(i => i.slug === route.params.serv)?.name} ${title.value} ${route.params.gen.toString().substring(0, 9)} прошивка Stage 1/Stage 2 в ${uiStore.regions[getCityIndex.value].place}`,
  ogTitle: () => `${servStore.services.find(i => i.slug === route.params.serv)?.name} ${title.value} ${route.params.gen.toString().substring(0, 9)} прошивка Stage 1/Stage 2 в ${uiStore.regions[getCityIndex.value].place}`,
  description: `Услуги чип тюнинга автомобиля ${title.value} ${route.params.gen.toString().substring(0, 9)} в ${uiStore.regions[getCityIndex.value].place}. Прострелы выхлопной системы на сбросе газа. Чип тюнинг коробки DSG. Наша компания ReChip предоставляет гарантию 1 год и 14 - дневный тест-драйв. Оплата после проверки.`,
  ogDescription: `Услуги чип тюнинга автомобиля ${title.value} ${route.params.gen.toString().substring(0, 9)} в ${uiStore.regions[getCityIndex.value].place}. Прострелы выхлопной системы на сбросе газа. Чип тюнинг коробки DSG. Наша компания ReChip предоставляет гарантию 1 год и 14 - дневный тест-драйв. Оплата после проверки.`,
  ogType: 'website'
})

</script>

<style lang="scss" scoped>

</style>
