<template>
  <section class="py-12">
    <div class="container mx-auto px-4 md:px-0">
      <div v-if="uiStore.homepage" class="grid grid-cols-12 gap-6">
        <div class="col-span-12">
          <h2 class="text-dark text-2xl font-bold mb-2">Преимущества</h2>
        </div>
        <div v-for="(item, index) in uiStore.homepage?.advantages" :key="index" class="col-span-12 md:col-span-6">
          <div class="h-full bg-gray-2 rounded-lg p-6">
            <img :src="item.icon" class="mb-8" :alt="item.header">
            <p class="font-bold text-dark text-lg mb-2">{{ item.header }}</p>
            <p class="text-gray-400 text-sm">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useUiStore } from '@/src/stores/ui'
// import { BoltIcon } from '@heroicons/vue/24/outline/index.js'

const uiStore = useUiStore()

</script>

<style scoped>

</style>
