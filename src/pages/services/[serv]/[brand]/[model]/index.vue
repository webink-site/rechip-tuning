<template>
  <section class="bg-gray-2 pt-10 md:pt-20" style="min-height: calc(100vh - 506px);">
    <div class="container mx-auto px-4 md:px-0">
      <UiFormsCarSearch />
    </div>
    <SearchGenerations v-if="data" :gens="data" :title="title" />
  </section>
</template>

<script setup lang="ts">
import { useCity } from '~/src/helpers/useCiity'
import { useCarStore } from '~/src/stores/car'
import { useServStore } from '~/src/stores/serv'
import { useUiStore } from '~/src/stores/ui'
import type { Model } from '~/src/types/car'

const route = useRoute()

const carStore = useCarStore()
const servStore = useServStore()
const uiStore = useUiStore()
const { getCityIndex } = useCity()

const { data } = await useAsyncData<any>('generations', () => $fetch(`https://api.rechip-tuning.ru/api/catalog?service=${route.params.serv}&brand=${route.params.brand}&model=${route.params.model}`))
useAsyncData('brands', () => carStore.LOAD_BRANDS())
const { data: models } = await useAsyncData<Model[]>('models', () => $fetch(`https://api.rechip-tuning.ru/api/catalog?service=${route.params.serv}&brand=${route.params.brand}`))

const title = computed(() => {
  const brand = carStore.brands?.find(i => i.slug === route.params.brand.toString())

  // return brand
  if (brand) {
    const model = models.value?.find(i => i.slug === route.params.model.toString())
    return `${brand.name} ${model?.name ?? ''}`
  } else {
    return 's'
  }
})

const singleServ = computed(() => {
  return servStore.services.find((i: any) => i.slug === route.params.serv)
})

function getMetaTags (): any {
  const level = singleServ.value?.seo_settings.find(i => i.level === 'model')
  return level
}

/* eslint-disable no-template-curly-in-string */
useSeoMeta({
  title: () => getMetaTags().title.replaceAll('${name}', title.value).replaceAll('${region}', uiStore.regions[getCityIndex.value].place),
  ogTitle: () => getMetaTags().title.replaceAll('${name}', title.value).replaceAll('${region}', uiStore.regions[getCityIndex.value].place),
  description: () => getMetaTags().description.replaceAll('${name}', title.value).replaceAll('${region}', uiStore.regions[getCityIndex.value].place),
  ogDescription: () => getMetaTags().description.replaceAll('${name}', title.value).replaceAll('${region}', uiStore.regions[getCityIndex.value].place),
  ogType: 'website'
})
</script>

<style scoped>

</style>
