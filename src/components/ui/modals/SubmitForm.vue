<template>
  <div class="h-screen w-screen fixed top-0 left-0 z-30 bg-black bg-opacity-50 backdrop-blur-[10px] flex justify-center items-center m-0" @click="emit('close')">
    <UiFormsSubmit class="w-[40rem]" :title="title" @close-success="emit('closeSuccess')">
      <template #close>
        <UiCloseButton @click="emit('close')" />
      </template>
    </UiFormsSubmit>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['close', 'closeSuccess'])
type Props ={
  title?: string
}
const { title } = defineProps<Props>()
</script>

<style scoped>

</style>
