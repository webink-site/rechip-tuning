<template>
  <section class="py-6">
    <div class="container mx-auto px-4 md:px-0">
      <div class="grid grid-cols-12 gap-8">
        <div
          class="col-span-12"
        >
          <p class="text-sm text-gray-400 mb-2">
            <nuxt-link to="/">Главная</nuxt-link> •
            <nuxt-link to="/services">Услуги</nuxt-link> •
            <nuxt-link :to="`/services/${$route.params.serv}`">{{ servStore.services.find((i) => i.slug === $route.params.serv)?.name }}</nuxt-link> •
            <nuxt-link :to="`/services/${$route.params.serv}/${$route.params.brand}`">{{ brand }}</nuxt-link> •
            <nuxt-link :to="`/services/${$route.params.serv}/${$route.params.brand}/${$route.params.model}`">{{ model }}</nuxt-link> •
            <span class="text-black">{{ gen }}</span>
          </p>
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
              {{ item.volume }}, {{ item.power }} л.с.
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useServStore } from '~/src/stores/serv'

const servStore = useServStore()
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
