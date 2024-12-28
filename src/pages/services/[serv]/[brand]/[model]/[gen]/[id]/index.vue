<template>
  <section class="bg-gray-2 pt-10 md:pt-20">
    <div class="container mx-auto">
      <UiFormsCarSearch full />
    </div>
    <section class="py-6 pb-20">
      <div v-if="data" class="container mx-auto px-4 md:px-0">
        <SearchEngine :engine="data" :title="title" />
      </div>
    </section>

    <div class="bg-white py-16">
      <!-- <SearchMods v-if="mods" :mods="mods" /> -->
      <UiCalcGuide />
      <HomeAdvant />
    </div>
  </section>
</template>

<script setup lang="ts">
const route = useRoute()
const { data } = await useAsyncData<any>('engine', () => $fetch(`http://api.rechip-tuning.ru/api/catalog?service=${route.params.serv}&brand=${route.params.brand}&model=${route.params.model}&configuration=${route.params.gen}&engine=${route.params.id}`))

const title = computed(() => {
  if (data.value) {
    return `${data.value.service.name} ${data.value.brand.name} ${data.value.model.name} ${data.value.configuration.name}`
  } else {
    return ''
  }
})
</script>

<style scoped>

</style>
