<template>
  <section class="bg-gray-2 pt-10 md:pt-20">
    <div class="container mx-auto">
      <UiFormsCarSearch full />
    </div>
    <section class="py-6 pb-20">
      <div v-if="data" class="container mx-auto px-4 md:px-0">
        <SearchComplectationNew :complectation="data" :title="title" :bodytype="bodytype" />
      </div>
    </section>
    <div class="bg-white py-16">
      <!-- <pre>{{ data }}</pre> -->
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
import { useServStore } from '~/src/stores/serv'

const servStore = useServStore()
const { getCityIndex } = useCity()
const uiStore = useUiStore()
const carStore = useCarStore()
const route = useRoute()

const { data } = await useAsyncData('complectations', () => $fetch(`https://api.rechip-tuning.ru/api/autos?mark_id=${route.params.brand.toString().toUpperCase()}&model_id=${route.params.model.toString().toUpperCase()}&generation_id=${route.params.gen}&product_id=${route.params.id}`))
const { data: models } = await useAsyncData<Model[]>('modelsForTitle', () => $fetch(`https://api.rechip-tuning.ru/api/autos?mark_id=${route.params.brand.toString().toUpperCase()}`))
const { data: generations } = await useAsyncData<any>('generations', () => $fetch(`https://api.rechip-tuning.ru/api/autos?mark_id=${route.params.brand.toString().toUpperCase()}&model_id=${route.params.model.toString().toUpperCase()}&generation_id=${route.params.gen}`))

if (!data.value) {
  throw createError({
    statusCode: 404,
    message: 'Страница не найдена',
    fatal: true
  })
}

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

const singleServ = computed(() => {
  return servStore.services.find((i: any) => i.slug === route.params.serv)
})

function getMetaTags (): any {
  const level = singleServ.value?.seo_settings.find(i => i.level === 'Модификация')
  return level
}

/* eslint-disable no-template-curly-in-string */
useSeoMeta({
  title: () => getMetaTags().title.replaceAll('${name}', title.value).replaceAll('${region}', uiStore.regions[getCityIndex.value].place),
  ogTitle: () => getMetaTags().title.replaceAll('${name}', title.value).replaceAll('${region}', uiStore.regions[getCityIndex.value].place),
  description: () => getMetaTags().description.replaceAll('${name}', title.value).replaceAll('${region}', uiStore.regions[getCityIndex.value].place),
  ogDescription: () => getMetaTags().description.replaceAll('${name}', title.value).replaceAll('${region}', uiStore.regions[getCityIndex.value].place),
  ogType: 'website',
  ogImage: () => `https://api.rechip-tuning.ru/storage/images/photos/${data.value?.modification?.path['configuration-id']}.jpg`
})

</script>

<style scoped>

</style>
