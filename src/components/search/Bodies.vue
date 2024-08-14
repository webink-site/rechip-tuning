<template>
  <section class="py-6">
    <div class="container mx-auto px-4 md:px-0">
      <div class="grid gap-6 grid-cols-12">
        <div class="col-span-9">
          <h2 class="text-dark text-2xl font-bold">
            {{ servStore.services.find((i) => i.slug === $route.params.servName)?.name }} {{ title }}
          </h2>
          <p class="text-lg font-semibold mt-1 text-gray-400">
            Выберите кузов: {{ title }}
          </p>
        </div>
      </div>
      <div v-if="bodies.length" class="grid-cols-4 gap-6 grid mt-8">
        <div v-for="(item, index) in bodies" :key="index" class="col-span-2 md:col-span-1">
          <!-- <nuxt-link :to="`/services/${$route.params.servName}/${$route.params.brandName.toString().toLocaleLowerCase()}/${$route.params.genName.toString().toLocaleLowerCase()}/${$route.params.gen}/${item.id}`">
            <div class="mb-2 bg-white overflow-hidden rounded-lg">
              <img class="h-36 w-full object-cover rounded-lg" :src="`https://api.rechip-tuning.ru/wp-content/themes/rechip-tuning/assets/photos/${item.id}.jpg`" alt="">
            </div>
            <p class="font-bold ">{{ item['body-type'] }}</p>
          </nuxt-link> -->
          <UiCardsBodyCard :item="item" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Model } from '@/src/types/car'
import { useCarStore } from '@/src/stores/car'
import { useServStore } from '~/src/stores/serv'

interface Props{
  bodies: Model[]
}
const route = useRoute()
const { bodies } = defineProps<Props>()
const carStore = useCarStore()

useAsyncData('brands', () => carStore.LOAD_BRANDS())
const { data: models } = await useAsyncData<Model[]>('modelsForTitle', () => $fetch(`https://api.rechip-tuning.ru/wp-json/custom/v1/base?mark_id=${route.params.brandName.toString().toUpperCase()}`))
const servStore = useServStore()

const title = computed(() => {
  const brand = carStore.brands?.find(i => i.id === route.params.brandName.toString().toUpperCase())
  if (brand) {
    const model = models.value?.find(i => i.id === route.params.genName.toString().toUpperCase())
    return `${brand.name} ${model?.name}`
  } else {
    return ''
  }
})

</script>

<style scoped>

</style>
