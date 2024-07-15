<template>
  <section class="bg-gray-2 pt-10 md:pt-20">
    <div class="container mx-auto">
      <UiFormsCarSearch full />
    </div>
    <SearchComplectation :complectation="complectation" :bodytype="bodytype" :gen-name="genName" :years="years" />
    <div class="bg-white py-16">
      <SearchMods :mods="mods" />
      <UiCalcGuide />
      <HomeAdvant />
    </div>
    <!-- <pre>{{ years }}</pre> -->
  </section>
</template>

<script setup lang="ts">
import type { HomeAdvant } from '#build/components'

const route = useRoute()
const { data } = await useAsyncData<any>('complectations', () => $fetch(`http://api.rechip-tuning.ru/wp-json/custom/v1/base?mark_id=${route.params.brandName.toString().toUpperCase()}&model_id=${route.params.genName.toString().toUpperCase()}&generation_id=${route.params.bodyName}`))
const { data: generations } = await useAsyncData<any>('generations', () => $fetch(`http://api.rechip-tuning.ru/wp-json/custom/v1/base?mark_id=${route.params.brandName.toString().toUpperCase()}&model_id=${route.params.genName.toString().toUpperCase()}`))

const mods = computed(() => {
  return data.value.find((i: any) => i.id === route.params.modName).modifications
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
