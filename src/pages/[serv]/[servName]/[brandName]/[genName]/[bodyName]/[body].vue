<template>
  <section class="bg-gray-2 pt-10 md:pt-20">
    <div class="container mx-auto">
      <UiFormsCarSearch full />
    </div>
    <SearchMods :mods="mods" />
  </section>
</template>

<script setup lang="ts">
const route = useRoute()
const { data } = await useAsyncData<any>('models', () => $fetch(`https://api.rechip-tuning.ru/wp-json/custom/v1/base?mark_id=${route.params.brandName.toString().toUpperCase()}&model_id=${route.params.genName.toString().toUpperCase()}&generation_id=${route.params.bodyName}`))

const mods = computed(() => {
  return data.value.find((i: any) => i.id === route.params.body).modifications
})

</script>

<style scoped>

</style>
