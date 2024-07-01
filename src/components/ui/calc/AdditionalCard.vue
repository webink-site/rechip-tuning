<template>
  <div class="col-span-12 md:col-span-3">
    <img :src="card.img" class="h-48 w-full object-cover rounded-lg mb-2" :alt="card.title">
    <p class="font-bold mb-2">{{ card.title }}</p>
    <p class="text-gray-400 mb-3">{{ card.text }}</p>
    <div class="flex gap-2">
      <InputSwitch v-model="active" />
      <p class="font-bold text-dark">{{ card.price.toLocaleString() }} ₽</p>
    </div>
  </div>
</template>

<script setup lang="ts">

const active = defineModel<boolean>('active')

interface Props {
  card: {
    title: string
    text: string
    price: number
    img: string
    active: boolean
  }
}

const { card } = defineProps<Props>()
</script>

<style scoped>

</style>
