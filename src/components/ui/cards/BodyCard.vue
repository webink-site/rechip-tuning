<template>
  <nuxt-link :to="`/services/${$route.params.servName}/${$route.params.brandName.toString().toLocaleLowerCase()}/${$route.params.genName.toString().toLocaleLowerCase()}/${$route.params.gen}/${item.id}`">
    <div class="mb-2 bg-white overflow-hidden rounded-lg">
      <img
        v-if="imgUrl"
        class="h-36 w-full object-cover rounded-lg"
        :src="imgUrl"
        :alt="item['body-type']"
        @error="imgUrl = null"
      >
      <div v-else class="w-full h-36 object-cover rounded-xl bg-gray-200 flex justify-center items-center">
        <i class="pi pi-car text-gray-400 text-2xl" />
      </div>
    </div>
    <p class="font-bold ">{{ item['body-type'] }}</p>
  </nuxt-link>
</template>

<script setup lang="ts">
import type { Model } from '@/src/types/car'

type Props = {
  item: Model
}

const { item } = defineProps<Props>()
const imgUrl = ref<string | null>(null)

onMounted(() => {
  imgUrl.value = `https://api.rechip-tuning.ru/wp-content/themes/rechip-tuning/assets/photos/${item.id}.jpg`
})
</script>

<style scoped>

</style>
