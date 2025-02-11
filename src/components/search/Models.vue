<template>
  <section class="py-6">
    <div class="container mx-auto px-4 md:px-0">
      <div class="grid gap-6 grid-cols-12">
        <div class="col-span-9">
          <p class="text-sm text-gray-400 mb-6">
            <nuxt-link to="/">Главная</nuxt-link> •
            <nuxt-link to="/services">Услуги</nuxt-link> •
            <nuxt-link :to="`/services/${$route.params.serv}`">{{ servStore.services.find((i) => i.slug === $route.params.serv)?.name }}</nuxt-link> •
            <span class="text-black">{{ title }}</span>
          </p>
          <h2 class="text-dark text-2xl font-bold">
            Выберите модель {{ title }}
          </h2>
        </div>
      </div>
      <div v-if="models.length" class="grid-cols-6 gap-6 grid mt-8">
        <div v-for="(item, index) in sortedModels" :key="index" class="col-span-3 md:col-span-1">
          <nuxt-link :to="`/services/${$route.params.serv}/${$route.params.brand.toString()}/${item.slug}`">
            <div class="h-full bg-white hover:bg-[#DADADA] transition-all rounded-lg p-2.5 text-center select-none">
              <img v-if="item.catalog_image" :src="`https://api.rechip-tuning.ru/storage/${item.catalog_image}`" :alt="item.name" class="h-20 mx-auto">
              <div v-else class="h-20 mx-auto flex justify-center items-center">
                <i class="pi pi-car text-gray-400 text-2xl" />
              </div>
              <p class="text-dark font-bold">{{ item.name }}</p>
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Model } from '@/src/types/car'
import { useServStore } from '~/src/stores/serv'

interface Props{
  models: Model[]
  title: string
}
const { models, title } = defineProps<Props>()
const servStore = useServStore()

const sortedModels = computed(() =>
  [...models].sort((a, b) => a.name.localeCompare(b.name, 'ru', { sensitivity: 'base' }))
)

</script>

<style scoped>

</style>
