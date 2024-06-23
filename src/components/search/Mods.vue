<template>
  <section class="py-6">
    <div class="container mx-auto">
      <!-- <div class="grid gap-6 grid-cols-12">
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
      </div> -->
      <div class="grid grid-cols-12 gap-8">
        <div
          v-for="(row, rowIndex) in Object.keys(sortedMods(mods))"
          v-show="sortedMods(mods)[row as keyof Sortedmod].arr.length"
          :key="rowIndex"
          class="col-span-12"
        >
          <h3 class="text-lg font-semibold mb-6 capitalize flex items-center">
            <img :src="sortedMods(mods)[row as keyof Sortedmod].img" class="h-6 mr-2">
            {{ sortedMods(mods)[row as keyof Sortedmod].name }}
          </h3>
          <div class="flex justify-start items-center gap-4 flex-wrap">
            <nuxt-link
              v-for="(item, index) in sortedMods(mods)[row as keyof Sortedmod].arr"
              :key="index"
              :to="`/services/${$route.params.servName}/${$route.params.brandName}/${$route.params.genName}/${$route.params.bodyName}/${$route.params.body ? $route.params.body : $route.params.modName}/${item['complectation-id']}`"
              class="px-2 py-1.5 text-sm h-full transition-all bg-gray-3 rounded cursor-pointer text-center hover:bg-[#DADADA] hover:text-black "
            >
              {{ item.specifications['volume-litres'] ?? '' }} <span v-if="item.specifications['volume-litres']"> л.</span>
              {{ item.specifications.transmission }}
              {{ item.specifications['horse-power'] }} л.с.
              {{ item['group-name'] }}
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Modification } from '@/src/types/car'

import petrolImg from '@/public/icons/petrol.svg'
import dieselImg from '@/public/icons/diesel.svg'
import electroImg from '@/public/icons/electro.svg'
import hybridImg from '@/public/icons/hybrid.svg'

interface Props{
  mods: Modification[]
}
// const route = useRoute()
const { mods } = defineProps<Props>()

interface Sorteditem {
    name: string
    img: string
    arr: Modification[]
}
interface Sortedmod {
    petrol: Sorteditem
    diesel: Sorteditem
    electric: Sorteditem
}

const sortedMods = (mods: Modification[]): Sortedmod => {
  const petrol = mods.filter(i => i.specifications['engine-type'] === 'бензин')
  const diesel = mods.filter(i => i.specifications['engine-type'] === 'дизель')
  const electric = mods.filter(i => i.specifications['engine-type'] === 'электро')
  const hybrid = mods.filter(i => i.specifications['engine-type'] === 'гибрид')
  const res = {
    petrol: {
      name: 'бензин',
      img: petrolImg,
      arr: [...petrol]
    },
    diesel: {
      name: 'дизель',
      img: dieselImg,
      arr: [...diesel]
    },
    electric: {
      name: 'электро',
      img: electroImg,
      arr: [...electric]
    },
    hybrid: {
      name: 'гибрид',
      img: hybridImg,
      arr: [...hybrid]
    }

  }
  return res
}

</script>

<style scoped>

</style>
