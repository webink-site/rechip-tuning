<template>
  <section id="prices" class="pt-20 pb-0 bg-white">
    <div class="container mx-auto px-4 md:px-0">
      <div class="grid grid-cols-12 gap-6">
        <div class="col-span-12">
          <h2 class="text-dark text-[28px] font-bold mb-2">Стоимость услуг</h2>
        </div>
        <div v-for="(item, index) in prices" :key="index" class="col-span-12 md:col-span-4">
          <div class="h-full bg-gray-2 rounded-lg p-6">
            <img :src="`https://api.rechip-tuning.ru/storage/${item.icon}`" class="mb-8 h-8" alt="">
            <p class="font-bold text-dark text-lg mb-2">{{ item.price }} ₽</p>
            <p class="text-gray-400 text-sm">
              {{ item.price_type }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// import petrol from '@/public/icons/petrol.svg'
// import turbo from '@/public/icons/turbo.svg'
// import diesel from '@/public/icons/diesel.svg'

interface Props{
  prices: {
    price: string
    price_type: string
    icon: string
  }[]
}

// const types = {
//   petrol,
//   turbo,
//   diesel
// }

const { prices } = defineProps<Props>()

</script>

<style scoped>

</style>
