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
// import { useServStore } from '~/src/stores/serv'
import { useUiStore } from '@/src/stores/ui'
import { useCity } from '~/src/helpers/useCiity'

const { getCityIndex } = useCity()
const uiStore = useUiStore()
// const servStore = useServStore()
const carStore = useCarStore()

const route = useRoute()
const { data } = await useAsyncData<Model[]>('generations', () => $fetch(`https://api.rechip-tuning.ru/api/autos?mark_id=${route.params.brand.toString().toUpperCase()}&model_id=${route.params.model.toString().toUpperCase()}`))
useAsyncData('brands', () => carStore.LOAD_BRANDS())
const { data: models } = await useAsyncData<Model[]>('models', () => $fetch(`https://api.rechip-tuning.ru/api/autos?mark_id=${route.params.brand.toString().toUpperCase()}`))

const title = computed(() => {
  const brand = carStore.brands?.find(i => i.id === route.params.brand.toString().toUpperCase())

  if (brand) {
    const model = models.value?.find(i => i.id === route.params.model.toString().toUpperCase())
    return `${brand.name} ${model?.name ?? ''}`
  } else {
    return ''
  }
})

function getMetaTags () {
  const city = uiStore.regions[getCityIndex.value].place

  if (route.params.serv === 'soot-filter') {
    return {
      title: `Отключение сажевого фильтра ${title.value} с гарантией 1 год в ${city}`,
      descr: `Услуга отключения сажевого фильтра в автомобиле ${title.value}. Наша компания ReChip предоставляет гарантию 1 год и 14 - дневный тест-драйв. Оплата после проверки.`
    }
  } else if (route.params.serv === 'egr') {
    return {
      title: `Отключение клапана ЕГР на ${title.value}  в ${city}`,
      descr: `Отключение ЕГР на Отключение клапана ЕГР на ${title.value}  в ${city}. Программное отключение и физическое удаление клапана EGR по лучшей цене.`
    }
  } else {
    return {
      title: `Чип тюнинг ${title.value} - прошивка Stage 1/Stage 2  в ${city}`,
      descr: `Услуги чип тюнинга автомобиля ${title.value} в ${city}. Прострелы выхлопной системы на сбросе газа. Чип тюнинг коробки DSG. Наша компания ReChip предоставляет гарантию 1 год и 14 - дневный тест-драйв. Оплата после проверки.`
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
