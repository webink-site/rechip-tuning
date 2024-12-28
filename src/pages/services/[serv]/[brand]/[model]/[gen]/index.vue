<template>
  <section class="bg-gray-2 pt-10 md:pt-20" style="min-height: calc(100vh - 506px);">
    <div class="container mx-auto px-4 md:px-0">
      <UiFormsCarSearch />
    </div>
    <SearchModsNew :mods="data" />
  </section>
</template>

<script setup lang="ts">

const route = useRoute()
const { data } = await useAsyncData<any>('gens', () => $fetch(`http://api.rechip-tuning.ru/api/catalog?service=${route.params.serv}&brand=${route.params.brand}&model=${route.params.model}&configuration=${route.params.gen}`))

</script>

<style scoped>

</style>
