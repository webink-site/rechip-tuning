<template>
  <section class="bg-gray-2 pt-10 md:pt-20">
    <div class="container mx-auto">
      <UiFormsCarSearch full />
    </div>
    <SearchGenerations :gens="data" />
  </section>
</template>

<script setup lang="ts">
import type { Model } from '@/src/types/car'

const route = useRoute()
const { data } = await useAsyncData<Model[]>('generations', () => $fetch(`https://cars-base.ru/api/cars/${route.params.brandName.toString().toUpperCase()}/${route.params.model.toString().toUpperCase()}?key=d1e353ef7`))

</script>

<style scoped>

</style>
