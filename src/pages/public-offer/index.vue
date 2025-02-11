<template>
  <section class="py-16 bg-white">
    <div class="container mx-auto px-4 md:px-0">
      <div class="nuxt-descr mb-10" v-html="data" />
    </div>
  </section>
</template>

<script setup lang="ts">

const { data } = await useAsyncData('agreement', () => $fetch('https://api.rechip-tuning.ru/api/offer'))

</script>

<style scoped>

</style>
