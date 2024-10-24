<template>
  <section v-if="data?.posts.length" class="py-12">
    <div class="container mx-auto px-4 md:px-0">
      <pre>{{ data }}</pre>
      <div class="grid grid-cols-12 gap-6">
        <div class="col-span-12">
          <h2 class="text-dark text-4xl font-bold mb-2">Наши работы</h2>
        </div>

        <client-only>
          <vue-easy-lightbox
            :visible="visibleRef"
            :imgs="data?.posts[indexRef].fields.gallery"
            :move-disabled="true"
            @hide="onHide"
          />
        </client-only>

        <div
          v-for="(item, index) in data?.posts"
          :key="index"
          class="col-span-12 md:col-span-4"
          @click="() => showImg(index)"
        >
          <div class="relative cursor-pointer group">
            <div class="absolute top-3 left-3 rounded bg-green-500 text-white text-sm font-semibold p-1 flex items-center gap-1">
              <BoltIcon class="h-4" />
              Прирост мощности {{ item.fields.tuning_profit }}
            </div>

            <img :src="item.fields.gallery[0]" :alt="item.title" class="rounded-lg mb-2 h-[30rem] object-cover group-hover:opacity-70 transition-all">
            <p class="text-dark text-lg font-bold">{{ item.title }}</p>
            <p class="text-dark">{{ item.content }}</p>
            <p class="text-gray-400">{{ item.fields.power_points }}</p>
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

interface Props{
  homePage?: boolean
}

type ResType = {
  posts: any[]
  count: string
  page: number
  size: number
}

const { data } = await useFetch<ResType>('https://api.rechip-tuning.ru/api/page?slug=gallery')

const { homePage } = defineProps<Props>()

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
