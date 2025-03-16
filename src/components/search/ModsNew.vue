<template>
  <section class="py-6">
    <div class="container mx-auto px-4 md:px-0">
      <div class="grid grid-cols-12 gap-8">
        <div
          class="col-span-12"
        >
          <h2 class="text-dark text-2xl font-bold mb-6">
            Выберите модификацию {{ brand }} {{ model }} {{ gen }}
          </h2>
          <div class="flex justify-start items-center gap-4 flex-wrap">
            <nuxt-link
              v-for="(item, index) in mods"
              :key="index"
              :to="`${route.fullPath}/${item.slug}`"
              class="px-2 py-1.5 text-sm h-full transition-all bg-gray-3 rounded cursor-pointer text-center hover:bg-[#DADADA] hover:text-black "
            >
              {{ item.name }}, {{ item.power }} л.с.
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const route = useRoute()
interface Props{
  mods: any
  brand: string
  model: string
  gen: string
}
const { mods, brand, model, gen } = defineProps<Props>()

</script>

<style scoped>

</style>
