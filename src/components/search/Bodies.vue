<template>
  <section class="py-6">
    <div class="container mx-auto">
      <div class="grid gap-6 grid-cols-12">
        <div class="col-span-9">
          <h2 class="text-dark text-4xl font-bold">
            Чип-тюнинг
            <span class="capitalize">{{ $route.params.brandName }} </span> <span class="capitalize"> {{ $route.params.genName }}</span>
          </h2>
          <p class="text-lg font-semibold mt-1 text-gray-400">
            Выберите поколение
            <span class="capitalize">{{ $route.params.brandName }} </span> <span class="capitalize"> {{ $route.params.genName }}</span>:
          </p>
        </div>
      </div>
      <!-- <pre>{{ $route.params }}</pre> -->
      <div v-if="bodies.length" class="grid-cols-4 gap-6 grid mt-8">
        <div v-for="(item, index) in bodies" :key="index" class="col-span-1">
          <nuxt-link :to="`/services/${$route.params.servName}/${$route.params.brandName.toLocaleLowerCase()}/${$route.params.genName.toLocaleLowerCase()}/${$route.params.gen}/${item.id}`">
            <div class="mb-2 bg-white overflow-hidden rounded-lg">
              <img class="h-36 w-full object-cover rounded-lg" :src="`https://expert.carfamily.online/photos/${item.id}.jpg`" alt="">
            </div>
            <p class="font-bold ">{{ item['body-type'] }}</p>
          </nuxt-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Model } from '@/src/types/car'

interface Props{
  bodies: Model[]
}
// const route = useRoute()
const { bodies } = defineProps<Props>()

</script>

<style scoped>

</style>
