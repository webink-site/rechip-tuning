<template>
  <div class="col-span-12 md:col-span-3">
    <img :src="`https://api.rechip-tuning.ru/storage/${card.service.image}`" class="h-48 w-full object-cover rounded-lg mb-2" :alt="card.service.name">
    <p class="font-bold mb-2">{{ card.service.name }}</p>
    <div class="text-gray-400 mb-3" v-html="card.service.short_description" />
    <div class="flex gap-2">
      <InputSwitch v-model="active" />
      <p class="font-bold text-dark">{{ Number(card.main_price ?? card.sale_price).toLocaleString() }} ₽</p>
    </div>
  </div>
</template>

<script setup lang="ts">

const active = defineModel<boolean>('active')

interface Props {
  card: {
    path: string
    service: {
      name: string
      slug: string
      short_description: string
      image: string
    }
    main_price: string
    sale_price: string
  }
}

const { card } = defineProps<Props>()
</script>

<style scoped>

</style>
