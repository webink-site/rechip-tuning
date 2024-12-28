<template>
  <section class="bg-gray-2 pt-10 md:pt-20" style="min-height: calc(100vh - 506px);">
    <div class="container mx-auto px-4 md:px-0">
      <UiFormsCarSearch />
    </div>
    <SearchGenerations v-if="data" :gens="data" :title="title" />
  </section>
</template>

<script setup lang="ts">
import { useCarStore } from '~/src/stores/car'
import type { Model } from '~/src/types/car'

const route = useRoute()

const carStore = useCarStore()

const { data } = await useAsyncData<any>('generations', () => $fetch(`http://api.rechip-tuning.ru/api/catalog?service=${route.params.serv}&brand=${route.params.brand}&model=${route.params.model}`))
useAsyncData('brands', () => carStore.LOAD_BRANDS())
const { data: models } = await useAsyncData<Model[]>('models', () => $fetch(`http://api.rechip-tuning.ru/api/catalog?service=${route.params.serv}&brand=${route.params.brand}`))

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

</script>

<style scoped>

</style>
