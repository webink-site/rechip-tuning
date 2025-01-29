<template>
  <section class="bg-gray-2 pt-10 md:pt-20" style="min-height: calc(100vh - 506px);">
    <div class="container mx-auto px-4 md:px-0">
      <UiFormsCarSearch />
      <p class="text-sm text-gray-400 mt-6">
        <nuxt-link to="/">Главная</nuxt-link> •
        <nuxt-link to="/services">Услуги</nuxt-link> •
        <nuxt-link :to="`/services/${$route.params.serv}`">{{ servStore.services.find((i) => i.slug === $route.params.serv)?.name }}</nuxt-link> •
        <nuxt-link :to="`/services/${$route.params.serv}/${$route.params.brand}`">{{ brand }}</nuxt-link> •
        <span class="text-black">{{ model }}</span>
      </p>
    </div>
    <SearchGenerations v-if="data && data[0].hasOwnProperty('name')" :gens="data" :model="model" :brand="brand" />
    <div v-else>
      <SearchModsNew :mods="data" :brand="brand" :model="model" :gen="''" />
    </div>
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

const brand = computed(() => {
  const brand = carStore.brands?.find(i => i.slug === route.params.brand.toString())
  if (brand) {
    return brand.name
  } else {
    return ''
  }
})

const model = computed(() => {
  const model = models.value?.find(i => i.slug === route.params.model.toString())
  if (model) {
    return model?.name
  } else {
    return ''
  }
})

const singleServ = computed(() => {
  return servStore.services.find((i: any) => i.slug === route.params.serv)
})

function getMetaTags (): any {
  const level = singleServ.value?.seo_settings.find(i => i.level === 'model')
  return level ?? { title: '', description: '' }
}

/* eslint-disable no-template-curly-in-string */
useSeoMeta({
  title: () => getMetaTags().title.replaceAll('${name}', `${brand.value} ${model.value}`).replaceAll('${region}', uiStore.regions[getCityIndex.value].place),
  ogTitle: () => getMetaTags().title.replaceAll('${name}', `${brand.value} ${model.value}`).replaceAll('${region}', uiStore.regions[getCityIndex.value].place),
  description: () => getMetaTags().description.replaceAll('${name}', `${brand.value} ${model.value}`).replaceAll('${region}', uiStore.regions[getCityIndex.value].place),
  ogDescription: () => getMetaTags().description.replaceAll('${name}', `${brand.value} ${model.value}`).replaceAll('${region}', uiStore.regions[getCityIndex.value].place),
  ogType: 'website'
})
</script>

<style scoped>

</style>
