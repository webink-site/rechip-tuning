<template>
  <div>
    <HomeHero />
    <SearchBrands />
    <HomeServ />
    <HomeProjects home-page />
    <HomeAdvant />
    <UiFormsFeedback />
  </div>
</template>

<script setup lang="ts">
import { useCarStore } from '../stores/car'
import { useUiStore } from '@/src/stores/ui'
import { useCity } from '~/src/helpers/useCiity'

const { getCityIndex } = useCity()
const carStore = useCarStore()
const uiStore = useUiStore()

useAsyncData('brands', () => carStore.LOAD_BRANDS('chip-tyuning'))
// definePageMeta({
//   layout: 'custom'
// })

useSeoMeta({
  title: () => `Чип-тюнинг Stage 1/Stage 2 в ${uiStore.regions[getCityIndex.value].place}`,
  ogTitle: () => `Чип-тюнинг Stage 1/Stage 2 в ${uiStore.regions[getCityIndex.value].place}`,
  description: 'Чип-тюнинг ателье ReChip Прошивка всех марок авто от 2000 г.в. с гарантией',
  ogDescription: 'Чип-тюнинг ателье ReChip Прошивка всех марок авто от 2000 г.в. с гарантией',
  ogType: 'website',
  ogImage: '/img/hero.webp'
})
</script>

<style scoped>

</style>
