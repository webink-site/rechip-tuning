<template>
  <nuxt-link :to="`/services/${$route.params.serv ?? 'chip'}/${item.id.toLocaleLowerCase()}`">
    <div class="h-full bg-gray-3 hover:bg-[#DADADA] transition-all rounded-lg p-2.5 text-center select-none">
      <img
        v-if="imgUrl !== null"
        :src="imgUrl"
        :alt="item.name"
        class="h-20 mx-auto"
        @error="imgUrl = null"
      >
      <div v-else class="h-20 mx-auto flex justify-center items-center">
        <i class="pi pi-car text-gray-400 text-2xl" />
      </div>
      <p class="text-dark font-bold">{{ item.name }}</p>
    </div>
  </nuxt-link>
</template>

<script setup lang="ts">
import type { Brand } from '@/src/types/car'

type Props = {
  item: Brand
}

const { item } = defineProps<Props>()
const imgUrl = ref<string | null>(null)

onMounted(() => {
  imgUrl.value = `https://api.rechip-tuning.ru/wp-content/themes/rechip-tuning/assets/logos/${item.id}.png`
})
</script>

<style scoped>

</style>
