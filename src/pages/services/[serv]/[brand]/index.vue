<template>
  <section class="bg-gray-2 pt-10 md:pt-20" style="min-height: calc(100vh - 506px);">
    <div class="container mx-auto px-4 md:px-0">
      <UiFormsCarSearch />
    </div>
    <SearchModels v-if="data" :models="data" :title="carStore.brands?.find((i) => i.slug === $route.params.brand.toString())?.name ?? ''" />
  </section>
</template>

<script setup lang="ts">
import { useCity } from '~/src/helpers/useCiity'
import { useServStore } from '~/src/stores/serv'
import { useCarStore } from '~/src/stores/car'
import { useUiStore } from '~/src/stores/ui'
import type { Model } from '~/src/types/car'

const route = useRoute()

const uiStore = useUiStore()
const carStore = useCarStore()
const servStore = useServStore()

const { getCityIndex } = useCity()

const { data, error } = await useAsyncData<Model[]>('models', () => $fetch(`https://api.rechip-tuning.ru/api/catalog?service=${route.params.serv}&brand=${route.params.brand}`))
useAsyncData('brands', () => carStore.LOAD_BRANDS())

if (error?.value) {
  throw showError({ statusCode: 404, statusMessage: 'Страница не найдена' })
}

const singleServ = computed(() => {
  return servStore.services.find((i: any) => i.slug === route.params.serv)
})

function getMetaTags (): any {
  const level = singleServ.value?.seo_settings.find(i => i.level === 'brand')
  return level ?? { title: '', description: '' }
}

/* eslint-disable no-template-curly-in-string */
useSeoMeta({
  title: () => getMetaTags().title.replaceAll('${name}', carStore.brands?.find(i => i.slug === route.params.brand.toString())?.name ?? '').replaceAll('${region}', uiStore.regions[getCityIndex.value].place),
  ogTitle: () => getMetaTags().title.replaceAll('${name}', carStore.brands?.find(i => i.slug === route.params.brand.toString())?.name ?? '').replaceAll('${region}', uiStore.regions[getCityIndex.value].place),
  description: () => getMetaTags().description.replaceAll('${name}', carStore.brands?.find(i => i.slug === route.params.brand.toString())?.name ?? '').replaceAll('${region}', uiStore.regions[getCityIndex.value].place),
  ogDescription: () => getMetaTags().description.replaceAll('${name}', carStore.brands?.find(i => i.slug === route.params.brand.toString())?.name ?? '').replaceAll('${region}', uiStore.regions[getCityIndex.value].place),
  ogType: 'website',
  ogImage: '/img/hero.webp'
})

</script>

<style scoped>

</style>
