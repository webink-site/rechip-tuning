<template>
  <section class="bg-gray-2 pt-10 md:pt-20" style="min-height: calc(100vh - 506px);">
    <div class="container mx-auto px-4 md:px-0">
      <UiFormsCarSearch />
    </div>
    <SearchModsNew :mods="data" :brand="brand" :model="model" :gen="gen" />
  </section>
</template>

<script setup lang="ts">
import { useCarStore } from '~/src/stores/car'
import type { Model } from '~/src/types/car'

const route = useRoute()
const carStore = useCarStore()

useAsyncData('brands', () => carStore.LOAD_BRANDS())
const { data } = await useAsyncData<any>('gens', () => $fetch(`https://api.rechip-tuning.ru/api/catalog?service=${route.params.serv}&brand=${route.params.brand}&model=${route.params.model}&configuration=${route.params.gen}`))
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
