<template>
  <section class="py-6">
    <div class="container mx-auto px-4 md:px-0">
      <div class="grid gap-6 grid-cols-12">
        <div class="col-span-9">
          <h2 class="text-dark text-2xl font-bold">
            {{ servStore.services.find((i) => i.slug === $route.params.servName)?.name }} {{ title }}
          </h2>
          <p class="text-lg font-semibold mt-1 text-gray-400">
            Выберите поколение {{ title }}:
          </p>
        </div>
      </div>
      <!-- <pre>{{ gens }}</pre> -->
      <div v-if="gens.length" class="grid-cols-4 md:grid-cols-5 gap-6 grid mt-8">
        <div v-for="(item, index) in gens" :key="index" class="col-span-2 md:col-span-1">
          <nuxt-link
            :to="`/services/${$route.params.serv}/${$route.params.brand.toLowerCase()}/${$route.params.model.toLowerCase()}/${item.id}`"
          >
            <div class="h-full bg-white hover:bg-[#DADADA] transition-all rounded-lg p-2.5 py-6 text-center select-none relative">
              <p class="font-bold">{{ item.name }}</p>
              <div v-if="item.configurations" class="px-1 w-fit mx-auto mt-2 text-blue-500 bg-blue-500 bg-opacity-10 rounded font-medium text-xs">
                {{ countConfigTitle(item.configurations) }}
              </div>
              <!-- <p>{{ item['year-start'] }} <span v-if="item['year-stop']">- {{ item['year-stop'] }}</span> </p> -->
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
  gens: Model[]
  title: string
}
const { gens, title } = defineProps<Props>()
const servStore = useServStore()

const countConfigTitle = (count: number):string => {
  const countString = count.toString()
  if (count > 10 && count <= 14) {
    return `${countString} модификаций`
  } else if (countString.endsWith('1')) {
    return `${countString} модификация`
  } else if (countString.endsWith('2') || countString.endsWith('3') || countString.endsWith('4')) {
    return `${countString} модификации`
  } else {
    return `${countString} модификаций`
  }
}

</script>

<style scoped>

</style>
