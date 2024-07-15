<template>
  <section class="bg-gray-2 pt-10 md:pt-20">
    <div class="container mx-auto">
      <UiFormsCarSearch full />
    </div>
    <SearchGenerations v-if="data" :gens="data" :title="title" />
  </section>
</template>

<script setup lang="ts">
import type { Brand, Model } from '@/src/types/car'

const route = useRoute()
const { data } = await useAsyncData<Model[]>('generations', () => $fetch(`http://api.rechip-tuning.ru/wp-json/custom/v1/base?mark_id=${route.params.brandName.toString().toUpperCase()}&model_id=${route.params.model.toString().toUpperCase()}`))
const { data: models } = await useAsyncData<Brand[]>('models', () => $fetch('http://api.rechip-tuning.ru/wp-json/custom/v1/base?full=1'))

const title = computed(() => {
  const brand = models.value?.find(i => i.id === route.params.brandName.toString().toUpperCase())

  if (brand) {
    const model = brand.models?.find(i => i.id === route.params.model.toString().toUpperCase())
    return `${brand.name} ${model?.name}`
  } else {
    return ''
  }
})

</script>

<style scoped>

</style>
