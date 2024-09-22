<template>
  <div class="col-span-12 md:col-span-3">
    <img :src="card.image" class="h-48 w-full object-cover rounded-lg mb-2" :alt="card.name">
    <p class="font-bold mb-2">{{ card.name }}</p>
    <div class="text-gray-400 mb-3" v-html="card.description" />
    <div class="flex gap-2">
      <InputSwitch v-model="active" />
      <p class="font-bold text-dark">{{ Number(card.price.replace('₽', '')).toLocaleString() }} ₽</p>
    </div>
  </div>
</template>

<script setup lang="ts">

const active = defineModel<boolean>('active')

interface Props {
  card: {
    ID: number
    name: string
    description: string
    image: string
    price: string
    active: boolean
  }
}

const { card } = defineProps<Props>()
</script>

<style scoped>

</style>
