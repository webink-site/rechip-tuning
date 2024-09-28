<template>
  <section class="bg-gray-2 pt-10 md:pt-20">
    <div class="container mx-auto">
      <UiFormsCarSearch />
    </div>
    <SearchComplectation :title="title" :complectation="complectation" :bodytype="bodytype" :gen-name="genName" :years="years" />
    <div class="bg-white py-16">
      <SearchMods v-if="mods" :mods="mods" />
      <UiCalcGuide />
      <HomeAdvant />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Model } from '@/src/types/car'
import { useCarStore } from '@/src/stores/car'

const carStore = useCarStore()
const route = useRoute()
const { data } = await useAsyncData<any>('complectations', () => $fetch(`https://api.rechip-tuning.ru/wp-json/custom/v1/base?mark_id=${route.params.brandName.toString().toUpperCase()}&model_id=${route.params.genName.toString().toUpperCase()}&generation_id=${route.params.bodyName}`))
const { data: models } = await useAsyncData<Model[]>('modelsForTitle', () => $fetch(`https://api.rechip-tuning.ru/wp-json/custom/v1/base?mark_id=${route.params.brandName.toString().toUpperCase()}`))

const { data: generations } = await useAsyncData<any>('generations', () => $fetch(`https://api.rechip-tuning.ru/wp-json/custom/v1/base?mark_id=${route.params.brandName.toString().toUpperCase()}&model_id=${route.params.genName.toString().toUpperCase()}`))

const mods = computed(() => {
  return data.value.find((i: any) => i.id === route.params.modName).modifications
})

const title = computed(() => {
  const brand = carStore.brands?.find(i => i.id === route.params.brandName.toString().toUpperCase())
  if (brand) {
    const model = models.value?.find(i => i.id === route.params.genName.toString().toUpperCase())
    return `${brand.name} ${model?.name}`
  } else {
    return ''
  }
})

const complectation = computed(() => {
  const mods = data.value.find((i: any) => i.id === route.params.modName).modifications
  return mods.find((i: any) => i['complectation-id'] === route.params.mod)
})

const bodytype = computed(() => {
  return data.value.find((i: any) => i.id === route.params.modName)['body-type']
})

const genName = computed(() => {
  return generations.value.find((i: any) => i.id === route.params.bodyName).name
})

const years = computed(() => {
  const gen = generations.value.find((i: any) => i.id === route.params.bodyName)
  return gen['year-stop'] ? `${gen['year-start']} - ${gen['year-stop']}` : gen['year-start']
})

</script>

<style scoped>

</style>
