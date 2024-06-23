<template>
  <section class="bg-gray-2 pt-20">
    <div class="container mx-auto">
      <UiFormsCarSearch full />
    </div>
    <SearchModels :models="data" />
  </section>
</template>

<script setup lang="ts">
import type { Model } from '@/src/types/car'

const route = useRoute()
const { data } = await useAsyncData<Model[]>('models', () => $fetch(`https://cars-base.ru/api/cars/${route.params.brand.toString().toUpperCase()}?key=d1e353ef7`))

</script>

<style scoped>

</style>
