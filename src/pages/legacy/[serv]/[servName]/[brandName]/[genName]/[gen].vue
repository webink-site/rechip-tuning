<template>
  <section class="bg-gray-2 pt-10 md:pt-20">
    <div class="container mx-auto">
      <UiFormsCarSearch />
    </div>
    <!-- <pre>{{ title }}</pre> -->
    <SearchBodies v-if="data" :bodies="data" />
  </section>
</template>

<script setup lang="ts">
import type { Model } from '@/src/types/car'

const route = useRoute()
const { data } = await useAsyncData<Model[]>('models', () => $fetch(`https://api.rechip-tuning.ru/api/autos?mark_id=${route.params.brandName.toString().toUpperCase()}&model_id=${route.params.genName.toString().toUpperCase()}&generation_id=${route.params.gen}`))

// const title = computed(() => {
//   const brand = models.value?.find(i => i.id === route.params.brandName.toString().toUpperCase())

//   if (brand) {
//     const model = brand.models?.find(i => i.id === route.params.model.toString().toUpperCase())
//     return `${brand.name} ${model?.name}`
//   } else {
//     return ''
//   }
// })
</script>

<style scoped>

</style>
