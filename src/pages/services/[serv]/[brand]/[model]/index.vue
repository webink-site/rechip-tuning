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
const { data } = await useAsyncData<Model[]>('generations', () => $fetch(`https://api.rechip-tuning.ru/api/autos?mark_id=${route.params.brand.toString().toUpperCase().replaceAll('-', '_')}&model_id=${route.params.model.toString().toUpperCase().replaceAll('-', '_')}`))
useAsyncData('brands', () => carStore.LOAD_BRANDS())
const { data: models } = await useAsyncData<Model[]>('models', () => $fetch(`https://api.rechip-tuning.ru/api/autos?mark_id=${route.params.brand.toString().toUpperCase().replaceAll('-', '_')}`))

const title = computed(() => {
  const brand = carStore.brands?.find(i => i.id === route.params.brand.toString().toUpperCase())

  if (brand) {
    const model = models.value?.find(i => i.id === route.params.model.toString().toUpperCase())
    return `${brand.name} ${model?.name ?? ''}`
  } else {
    return ''
  }
})
const singleServ = computed(() => {
  return servStore.services.find((i: any) => i.slug === route.params.serv)
})

function getMetaTags (): any {
  const level = singleServ.value?.seo_settings.find(i => i.level === 'Модель')
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
