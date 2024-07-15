<template>
  <section class="py-6">
    <div class="container mx-auto px-4 md:px-0">
      <div class="grid gap-6 grid-cols-12">
        <div class="col-span-9">
          <h2 class="text-dark text-4xl font-bold">Чип-тюнинг {{ title }} </h2>
          <p class="text-lg font-semibold mt-1 text-gray-400">Выберите модель {{ title }}:</p>
        </div>
      </div>
      <div v-if="models.length" class="grid-cols-6 gap-6 grid mt-8">
        <div v-for="(item, index) in models" :key="index" class="col-span-3 md:col-span-1">
          <nuxt-link :to="`/services/chip/${$route.params.brand.toString().toLocaleLowerCase()}/${item.id.toLocaleLowerCase()}`">
            <div class="h-full bg-white hover:bg-[#DADADA] transition-all rounded-lg p-2.5 text-center select-none">
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

interface Props{
  models: Model[]
  title: string
}
const { models, title } = defineProps<Props>()

</script>

<style scoped>

</style>
