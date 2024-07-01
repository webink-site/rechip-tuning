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
const { data } = await useAsyncData<any>('models', () => $fetch(`https://cars-base.ru/api/cars/${route.params.brandName.toString().toUpperCase()}/${route.params.genName.toString().toUpperCase()}/${route.params.bodyName}?key=d1e353ef7`))

const mods = computed(() => {
  return data.value.find((i: any) => i.id === route.params.body).modifications
})

</script>

<style scoped>

</style>
