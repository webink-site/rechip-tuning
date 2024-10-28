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
import { useServStore } from '~/src/stores/serv'
import { useUiStore } from '~/src/stores/ui'
import { useCity } from '~/src/helpers/useCiity'

const { getCityIndex } = useCity()
const uiStore = useUiStore()
const servStore = useServStore()
const carStore = useCarStore()

const route = useRoute()
const { data } = await useAsyncData<Model[]>('models', () => $fetch(`https://api.rechip-tuning.ru/api/autos?mark_id=${route.params.brand.toString().toUpperCase()}`))
useAsyncData('brands', () => carStore.LOAD_BRANDS())

const singleServ = computed(() => {
  return servStore.services.find((i: any) => i.slug === route.params.serv)
})

function getMetaTags (): any {
  const level = singleServ.value?.seo_settings.find(i => i.level === 'Марка')
  return level
}

/* eslint-disable no-template-curly-in-string */
useSeoMeta({
  title: () => getMetaTags().title.replaceAll('${name}', carStore.brands?.find(i => i.id === route.params.brand.toString().toUpperCase())?.name ?? '').replaceAll('${region}', uiStore.regions[getCityIndex.value].place),
  ogTitle: () => getMetaTags().title.replaceAll('${name}', carStore.brands?.find(i => i.id === route.params.brand.toString().toUpperCase())?.name ?? '').replaceAll('${region}', uiStore.regions[getCityIndex.value].place),
  description: () => getMetaTags().description.replaceAll('${name}', carStore.brands?.find(i => i.id === route.params.brand.toString().toUpperCase())?.name ?? '').replaceAll('${region}', uiStore.regions[getCityIndex.value].place),
  ogDescription: () => getMetaTags().description.replaceAll('${name}', carStore.brands?.find(i => i.id === route.params.brand.toString().toUpperCase())?.name ?? '').replaceAll('${region}', uiStore.regions[getCityIndex.value].place),
  ogType: 'website'
})

</script>

<style scoped>

</style>
