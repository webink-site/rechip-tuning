<template>
  <section class="py-20" :class="{'!py-6': gray}">
    <div class="container mx-auto">
      <div class="grid gap-6 grid-cols-12">
        <div class="col-span-9">
          <h2 class="text-dark text-4xl font-bold">Выберите марку для чип-тюнинга</h2>
        </div>
        <div class="col-span-3">
          <div class="relative">
            <MagnifyingGlassIcon class="absolute text-gray-500 h-6 top-3 right-3" />
            <input v-model="search" placeholder="Поиск по марке" type="text" class="w-full p-3 rounded-md bg-gray-2 border-none" :class="{'!bg-white': props.gray}">
          </div>
        </div>
      </div>
      <!-- <pre>{{ brands }}</pre> -->
      <div v-if="brands.length" class="grid-cols-6 gap-6 grid mt-8">
        <div v-for="(item, index) in brands" v-show="constrolVis(item)" :key="index" class="col-span-1">
          <nuxt-link :to="`/services/chip/${item.id.toLocaleLowerCase()}`">
            <div class="h-full bg-gray-3 hover:bg-[#DADADA] transition-all rounded-lg p-2.5 text-center select-none">
              <img :src="`https://expert.carfamily.online/logos/${item.id}.png`" :alt="item.name" class="h-20 mx-auto">
              <p class="text-dark font-bold">{{ item.name }}</p>
            </div>
          </nuxt-link>
        </div>
        <div class="col-span-6 text-center">
          <UiButton blue :text="!showAll ? 'Посмотреть все марки' : 'Скрыть'" @click="showAll = !showAll" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline/index.js'
import type { Brand } from '@/src/types/car'

const props = defineProps({
  gray: {
    type: Boolean,
    default: false
  }
})

const { data } = await useAsyncData<Brand[]>('brands', () => $fetch('https://cars-base.ru/api/cars?full=1&key=d1e353ef7'))

const search = ref('')
const showAll = ref(false)

const brands = computed(() => {
  if (!data.value) {
    return []
  }
  if (search.value) {
    return data.value.filter(i => i.name.toLocaleLowerCase().includes(search.value.toLocaleLowerCase()))
  }
  return data.value?.sort((a, b) => {
    if (a.popular && !b.popular) {
      return -1
    } else if (!a.popular && b.popular) {
      return 1
    } else {
      return 0
    }
  })
})

function constrolVis (item: Brand) {
  if (search.value) {
    return true
  } else if (item.popular) {
    return true
  } else {
    return !!showAll.value
  }
}

</script>

<style scoped>

</style>
