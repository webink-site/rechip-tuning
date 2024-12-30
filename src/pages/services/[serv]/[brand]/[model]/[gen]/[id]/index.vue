<template>
  <section class="bg-gray-2 pt-10 md:pt-20">
    <div class="container mx-auto">
      <UiFormsCarSearch full />
    </div>
    <section class="py-6 pb-20">
      <div v-if="data" class="container mx-auto px-4 md:px-0">
        <SearchEngine :engine="data" :title="`${data.service.name} ${title}`" />
      </div>
    </section>

    <div class="bg-white py-16">
      <UiCalcGuide />
      <HomeAdvant />
    </div>
  </section>
</template>

<script setup lang="ts">
import { useCity } from '~/src/helpers/useCiity'
import { useServStore } from '~/src/stores/serv'
import { useUiStore } from '~/src/stores/ui'

const { getCityIndex } = useCity()
const servStore = useServStore()
const uiStore = useUiStore()

const route = useRoute()
const { data } = await useAsyncData<any>('engine', () => $fetch(`https://api.rechip-tuning.ru/api/catalog?service=${route.params.serv}&brand=${route.params.brand}&model=${route.params.model}&configuration=${route.params.gen}&engine=${route.params.id}`))

const title = computed(() => {
  if (data.value) {
    return `${data.value.brand.name} ${data.value.model.name} ${data.value.configuration.name}`
  } else {
    return ''
  }
})

const singleServ = computed(() => {
  return servStore.services.find((i: any) => i.slug === route.params.serv)
})

function getMetaTags (): any {
  const level = singleServ.value?.seo_settings.find(i => i.level === 'engine')
  return level
}

/* eslint-disable no-template-curly-in-string */
useSeoMeta({
  title: () => getMetaTags().title.replaceAll('${name}', title.value).replaceAll('${region}', uiStore.regions[getCityIndex.value].place),
  ogTitle: () => getMetaTags().title.replaceAll('${name}', title.value).replaceAll('${region}', uiStore.regions[getCityIndex.value].place),
  description: () => getMetaTags().description.replaceAll('${name}', title.value).replaceAll('${region}', uiStore.regions[getCityIndex.value].place),
  ogDescription: () => getMetaTags().description.replaceAll('${name}', title.value).replaceAll('${region}', uiStore.regions[getCityIndex.value].place),
  ogType: 'website',
  // @ts-ignore
  ogImage: () => `https://api.rechip-tuning.ru/storage/${data.value.model.catalog_image}`
})
</script>

<style scoped>

</style>
