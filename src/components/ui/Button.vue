<template>
  <button v-if="props.blue" class="flex items-center justify-center gap-1 bg-blue-500 bg-opacity-10 text-blue-500 hover:bg-opacity-20 py-4 px-8 rounded-lg font-semibold">
    <span v-if="load" class="pi pi-spinner animate-spin" />
    {{ props.text }}
  </button>
  <button v-else-if="props.white" class="flex items-center justify-center gap-1 bg-transparent text-white border border-white hover:bg-white hover:text-dark py-4 px-8 rounded-lg font-semibold w-fit">
    <span v-if="load" class="pi pi-spinner animate-spin" />
    {{ props.text }}
  </button>
  <button v-else-if="props.green" class="flex items-center justify-center gap-1 bg-green-500 bg-opacity-10 text-green-500 hover:bg-opacity-20 py-4 px-8 rounded-lg font-semibold">
    <span v-if="load" class="pi pi-spinner animate-spin" />
    {{ props.text }}
  </button>
  <button v-else-if="props.red" class="flex items-center justify-center gap-1 bg-[#F03C3D] bg-opacity-10 text-[#F03C3D] hover:bg-opacity-20 py-4 px-8 rounded-lg font-semibold">
    <span v-if="load" class="pi pi-spinner animate-spin" />
    {{ props.text }}
  </button>
  <button v-else class="bg-primary flex items-center justify-center gap-1 text-white hover:bg-primary-hover py-4 px-8 rounded-lg font-semibold">
    <span v-if="load" class="pi pi-spinner animate-spin" />
    {{ props.text }}
  </button>
</template>

<script setup lang="ts">
const props = defineProps({
  text: {
    type: String,
    default: ''
  },
  load: {
    type: Boolean,
    default: false
  },
  blue: {
    type: Boolean,
    default: false
  },
  red: {
    type: Boolean,
    default: false
  },
  green: {
    type: Boolean,
    default: false
  },
  white: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>

</style>
