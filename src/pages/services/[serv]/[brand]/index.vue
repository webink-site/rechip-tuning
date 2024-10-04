<template>
  <section class="bg-gray-2 pt-10 md:pt-20">
    <div class="container mx-auto px-4 md:px-0">
      <UiFormsCarSearch />
    </div>
    <SearchModels v-if="data" :models="data" :title="carStore.brands?.find((i) => i.id === $route.params.brand.toString().toUpperCase())?.name ?? ''" />
  </section>
</template>

<script setup lang="ts">
import type { Model } from '@/src/types/car'
import { useCarStore } from '@/src/stores/car'
import { useUiStore } from '~/src/stores/ui'
import { useCity } from '~/src/helpers/useCiity'

const { getCityIndex } = useCity()
const uiStore = useUiStore()
const carStore = useCarStore()

const route = useRoute()
const { data } = await useAsyncData<Model[]>('models', () => $fetch(`https://api.rechip-tuning.ru/wp-json/custom/v1/base/test?mark_id=${route.params.brand.toString().toUpperCase()}`))
useAsyncData('brands', () => carStore.LOAD_BRANDS())

function getMetaTags () {
  const carTitle = carStore.brands?.find(i => i.id === route.params.brand.toString().toUpperCase())?.name
  const city = uiStore.regions[getCityIndex.value].place

  if (route.params.serv === 'soot-filter') {
    return {
      title: `Отключение сажевого фильтра ${carTitle} с гарантией 1 год в ${city}`,
      descr: `Услуга отключения сажевого фильтра в автомобиле ${carTitle}. Наша компания ReChip предоставляет гарантию 1 год и 14 - дневный тест-драйв. Оплата после проверки.`
    }
  } else if (route.params.serv === 'egr') {
    return {
      title: `Отключение клапана ЕГР на ${carTitle}  в ${city}`,
      descr: `Отключение ЕГР на Отключение клапана ЕГР на ${carTitle}  в ${city}. Программное отключение и физическое удаление клапана EGR по лучшей цене.`
    }
  } else {
    return {
      title: `Чип тюнинг ${carTitle} - прошивка Stage 1/Stage 2  в ${city}`,
      descr: `Услуги чип тюнинга автомобиля ${carTitle} в ${city}. Прострелы выхлопной системы на сбросе газа. Чип тюнинг коробки DSG. Наша компания ReChip предоставляет гарантию 1 год и 14 - дневный тест-драйв. Оплата после проверки.`
    }
  }
}

useSeoMeta({
  title: () => getMetaTags().title,
  ogTitle: () => getMetaTags().title,
  description: () => getMetaTags().descr,
  ogDescription: () => getMetaTags().descr,
  ogType: 'website'
})

</script>

<style scoped>

</style>
