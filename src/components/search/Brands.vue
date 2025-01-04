<template>
  <section class="py-20" :class="{'!py-6': props.gray}">
    <div class="container mx-auto px-4 md:px-0">
      <div class="grid gap-6 grid-cols-12">
        <div class="col-span-12 md:col-span-9">
          <h2 class="text-dark text-4xl font-bold">Выберите марку</h2>
        </div>
        <div class="col-span-12 md:col-span-3">
          <div class="relative">
            <MagnifyingGlassIcon class="absolute text-gray-500 h-6 top-3 right-3" />
            <input v-model="search" placeholder="Поиск по марке" type="text" class="w-full p-3 rounded-md bg-gray-2 border-none" :class="{'!bg-white': props.gray}">
          </div>
        </div>
      </div>
      <div v-if="brands.length" class="grid grid-cols-6 gap-6 mt-8">
        <div v-for="(item, index) in brands" :key="index" class="col-span-3 md:col-span-1">
          <UiCardsBrandCard :item="item" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline/index.js'
import { useCarStore } from '@/src/stores/car'

const props = defineProps({
  gray: {
    type: Boolean,
    default: false
  }
})

const carStore = useCarStore()
const search = ref('')

useAsyncData('brands', () => carStore.LOAD_BRANDS())

const brands = computed(() => {
  if (!carStore.brands) {
    return []
  }
  if (search.value) {
    return carStore.brands.filter(i => i.name.toLocaleLowerCase().includes(search.value.toLocaleLowerCase()))
  }
  return carStore.brands
})

</script>

<style scoped>

</style>
