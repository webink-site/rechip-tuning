<template>
  <section class="py-6">
    <div class="container mx-auto px-4 md:px-0">
      <div class="grid gap-6 grid-cols-12">
        <div class="col-span-9">
          <h2 class="text-dark text-4xl font-bold">
            Чип-тюнинг {{ title }}
          </h2>
          <p class="text-lg font-semibold mt-1 text-gray-400">
            Выберите кузов: {{ title }}
          </p>
        </div>
      </div>
      <div v-if="bodies.length" class="grid-cols-4 gap-6 grid mt-8">
        <div v-for="(item, index) in bodies" :key="index" class="col-span-2 md:col-span-1">
          <nuxt-link :to="`/services/${$route.params.servName}/${$route.params.brandName.toString().toLocaleLowerCase()}/${$route.params.genName.toString().toLocaleLowerCase()}/${$route.params.gen}/${item.id}`">
            <div class="mb-2 bg-white overflow-hidden rounded-lg">
              <img class="h-36 w-full object-cover rounded-lg" :src="`http://api.rechip-tuning.ru/wp-content/themes/rechip-tuning/assets/photos/${item.id}.jpg`" alt="">
            </div>
            <p class="font-bold ">{{ item['body-type'] }}</p>
          </nuxt-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Model, Brand } from '@/src/types/car'

interface Props{
  bodies: Model[]
}
const route = useRoute()
const { bodies } = defineProps<Props>()

const { data } = await useAsyncData<Brand[]>('brands', () => $fetch('http://api.rechip-tuning.ru/wp-json/custom/v1/base?full=1'))

const title = computed(() => {
  const brand = data.value?.find(i => i.id === route.params.brandName.toString().toUpperCase())
  if (brand) {
    const model = brand.models?.find(i => i.id === route.params.genName.toString().toUpperCase())
    return `${brand.name} ${model?.name}`
  } else {
    return ''
  }
})

</script>

<style scoped>

</style>
