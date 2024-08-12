<template>
  <div class="h-screen w-screen fixed top-0 left-0 z-30 bg-black bg-opacity-50 backdrop-blur-[10px] flex justify-center items-center" @click="emit('close')">
    <div class="px-8 py-6 bg-white rounded-xl w-[26rem] relative" @click.stop>
      <UiCloseButton @click="emit('close')" />
      <h3 class="font-bold text-dark text-2xl mb-4">Выбор региона:</h3>
      <div class="flex flex-wrap gap-2">
        <div
          v-for="(item, index) in uiStore.regions"
          :key="index"
          class="font-semibold text-dark py-1.5 px-2.5 rounded bg-gray-3 cursor-pointer hover:bg-neutral-200 transition-all"
          :class="uiStore.activeRegion === uiStore.regions.indexOf(item) ? '!bg-primary !text-white' : ''"
          @click="[uiStore.SET_REGION(index), emit('close')]"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUiStore } from '@/src/stores/ui'

const uiStore = useUiStore()
const emit = defineEmits(['close'])
</script>

<style scoped>

</style>
