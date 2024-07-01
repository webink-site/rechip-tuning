<template>
  <section class="bg-gray-2 pt-10 md:pt-20">
    <div class="container mx-auto">
      <UiFormsCarSearch full />
    </div>
    <SearchBodies :bodies="data" />
    <!-- <pre>{{ data }}</pre> -->
  </section>
</template>

<script setup lang="ts">
// import type { Model } from '@/src/types/car'

const route = useRoute()
const { data } = await useAsyncData('models', () => $fetch(`https://cars-base.ru/api/cars/${route.params.brandName.toString().toUpperCase()}/${route.params.genName.toString().toUpperCase()}/${route.params.gen}?key=d1e353ef7`))

</script>

<style scoped>

</style>
