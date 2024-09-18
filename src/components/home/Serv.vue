<template>
  <section class="py-12 bg-gray-2">
    <div class="container mx-auto px-4 md:px-0">
      <div class="grid grid-cols-12 gap-6">
        <div class="col-span-12">
          <h2 class="text-dark text-4xl font-bold mb-2">Наши услуги</h2>
        </div>

        <div v-for="(item, index) in servStore.services" :key="index" :class="`col-span-12 md:col-span-${item.width}`">
          <nuxt-link :to="`/services/${item.slug}`">
            <div
              class="bg-center bg-no-repeat bg-cover rounded-lg py-8 px-10 h-[20rem] flex flex-col justify-between"
              :style="`background-image: url('${item.img}');`"
              :class="{'md:!h-[30rem]' : item.high}"
            >
              <div>
                <h3 class="text-white text-2xl md:text-3xl mb-4 font-bold">{{ item.name }}</h3>
                <p class="text-white md:w-1/2">{{ item.sub }}</p>
              </div>
              <UiButton white text="Узнать подробнее" />
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useServStore } from '@/src/stores/serv'

const servStore = useServStore()

</script>

<style scoped>

</style>
