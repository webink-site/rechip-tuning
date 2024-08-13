<template>
  <div class="h-screen w-screen fixed top-0 left-0 z-30 bg-black bg-opacity-50 backdrop-blur-[10px] flex justify-center items-center" @click="emit('close')">
    <div class="px-8 py-6 bg-white rounded-xl w-[26rem] relative" @click.stop>
      <UiCloseButton @click="emit('close')" />
      <h3 class="font-bold text-dark text-2xl mb-4">Выбор региона:</h3>
      <div class="flex flex-wrap gap-2">
        <a
          v-for="(item, index) in uiStore.regions"
          :key="index"
          :href="item.web"
          class="font-semibold text-dark py-1.5 px-2.5 rounded bg-gray-3 cursor-pointer hover:bg-neutral-200 transition-all"
          :class="getCityIndex === uiStore.regions.indexOf(item) ? '!bg-primary !text-white' : ''"
          @click="[uiStore.SET_REGION(index), emit('close')]"
        >
          {{ item.name }}
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUiStore } from '@/src/stores/ui'
import { useCity } from '~/src/helpers/useCiity'

const { getCityIndex } = useCity()
const uiStore = useUiStore()
const emit = defineEmits(['close'])
</script>

<style scoped>

</style>
