<template>
  <section class="bg-gray-2 pt-10 md:pt-20">
    <div class="container mx-auto">
      <UiFormsCarSearch full />
    </div>
    <SearchModsNew :mods="data" />
  </section>
</template>

<script setup>
const route = useRoute()
const { data } = await useAsyncData('mods', () => $fetch(`http://api.rechip-tuning.ru/wp-json/custom/v1/base/test?mark_id=${route.params.brand}&model_id=${route.params.model}&generation_id=${route.params.gen}`))

</script>

<style lang="scss" scoped>

</style>
