<template>
  <section class="py-12">
    <div class="container mx-auto px-4 md:px-0">
      <div class="grid grid-cols-12 gap-6">
        <div class="col-span-12">
          <h2 class="text-dark text-4xl font-bold mb-2">Наши работы</h2>
        </div>

        <vue-easy-lightbox
          :visible="visibleRef"
          :imgs="getImages"
          :index="indexRef"
          :move-disabled="true"
          @hide="onHide"
        />

        <div
          v-for="(item, index) in projects.slice(0, homePage ? 3 : projects.length + 1)"
          :key="index"
          class="col-span-12 md:col-span-4"
          @click="() => showImg(index)"
        >
          <div class="relative">
            <div class="absolute top-3 left-3 rounded bg-green-500 text-white text-sm font-semibold p-1 flex items-center gap-1">
              <BoltIcon class="h-4" />
              Прирост мощности 10%
            </div>

            <img :src="item.img" :alt="item.name" class="rounded-lg mb-2 h-[30rem] object-cover">
            <p class="text-dark text-lg font-bold">{{ item.name }}</p>
            <p class="text-dark">{{ item.sub }}</p>
            <p class="text-gray-400">{{ item.hp }}</p>
          </div>
        </div>
        <div v-if="homePage" class="col-span-12 text-center mx-auto">
          <nuxt-link to="/gallery">
            <UiButton text="Перейти в галерею" />
          </nuxt-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { BoltIcon } from '@heroicons/vue/24/outline/index.js'
import proj1 from '@/public/img/proj1.webp'
import proj2 from '@/public/img/proj2.webp'
import proj3 from '@/public/img/proj3.webp'

interface Props{
  homePage?: boolean
}

const { homePage } = defineProps<Props>()

const projects = [
  {
    name: 'Mercedes G-classse AMG',
    sub: 'Чип-тюнинг Stage 1',
    hp: '490 л.с',
    img: proj1
  },
  {
    name: 'Mercedes G-classse AMG',
    sub: 'Чип-тюнинг Stage 1',
    hp: '490 л.с',
    img: proj2
  },
  {
    name: 'Mercedes G-classse AMG',
    sub: 'Чип-тюнинг Stage 1',
    hp: '490 л.с',
    img: proj3
  },
  {
    name: 'Mercedes G-classse AMG',
    sub: 'Чип-тюнинг Stage 1',
    hp: '490 л.с',
    img: proj1
  },
  {
    name: 'Mercedes G-classse AMG',
    sub: 'Чип-тюнинг Stage 1',
    hp: '490 л.с',
    img: proj2
  },
  {
    name: 'Mercedes G-classse AMG',
    sub: 'Чип-тюнинг Stage 1',
    hp: '490 л.с',
    img: proj3
  }
]

const getImages = computed(() => {
  return projects.map(i => i.img)
})

const visibleRef = ref(false)
const indexRef = ref(0)

const showImg = (index: number) => {
  indexRef.value = index
  visibleRef.value = true
}
const onHide = () => {
  visibleRef.value = false
}

</script>

<style scoped>

</style>
