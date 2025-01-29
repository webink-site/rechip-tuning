<template>
  <section class="bg-gray-2 pt-10 md:pt-20" style="min-height: calc(100vh - 506px);">
    <div class="container mx-auto px-4 md:px-0">
      <UiFormsCarSearch />
      <!-- <p class="text-sm text-gray-400 mt-6">
        <nuxt-link to="/">Главная</nuxt-link> •
        <nuxt-link to="/services">Услуги</nuxt-link> •
        <nuxt-link :to="`/services/${$route.params.serv}`">{{ servStore.services.find((i) => i.slug === $route.params.serv)?.name }}</nuxt-link> •
        <nuxt-link :to="`/services/${$route.params.serv}/${$route.params.brand}`">{{ brand }}</nuxt-link> •
        <nuxt-link :to="`/services/${$route.params.serv}/${$route.params.brand}/${$route.params.model}`">{{ model }}</nuxt-link> •
        <span class="text-black">{{ gen }}</span>
      </p> -->
    </div>
    <SearchModsNew v-if="Array.isArray(data)" :mods="data" :brand="brand" :model="model" :gen="gen" />
    <pre v-else>{{ data }}</pre>
  </section>
</template>

<script setup lang="ts">
import { useCarStore } from '~/src/stores/car'
import type { Model } from '~/src/types/car'
// import { useServStore } from '~/src/stores/serv'

// const servStore = useServStore()
const route = useRoute()
const carStore = useCarStore()

const cnfg = ref('configuration')

useAsyncData('brands', () => carStore.LOAD_BRANDS())
const { data, error, refresh } = await useAsyncData<any>('gens', () => $fetch(`https://api.rechip-tuning.ru/api/catalog?service=${route.params.serv}&brand=${route.params.brand}&model=${route.params.model}&${cnfg.value}=${route.params.gen}`))

// console.log(error.value)
if (error.value) {
  cnfg.value = 'engine'
  refresh()
}

const { data: models } = await useAsyncData<Model[]>('models', () => $fetch(`https://api.rechip-tuning.ru/api/catalog?service=${route.params.serv}&brand=${route.params.brand}`))
const { data: generations } = await useAsyncData<any>('generations', () => $fetch(`https://api.rechip-tuning.ru/api/catalog?service=${route.params.serv}&brand=${route.params.brand}&model=${route.params.model}`))

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

const gen = computed(() => {
  return generations.value?.find((i: any) => i.slug === route.params.gen.toString()).name ?? ''
})

</script>

<style scoped>

</style>
