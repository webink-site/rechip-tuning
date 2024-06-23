<template>
  <section class="h-[900px] py-20 bg-cover bg-center bg-no-repeat flex items-end custom-transition" :style="`background-image: url(${sldes[active]});`">
    <div class="container mx-auto">
      <div class="grid gap-6 grid-cols-12">
        <div class="col-span-12 mb-16">
          <h1 class="text-white font-bold text-5xl leading-tight">
            Чип-тюнинг <br>
            Stage 1/Stage 2 <br>
            в Санкт-Петербурге
          </h1>
        </div>
        <div class="col-span-4">
          <div class="space-y-6">
            <h2 class="text-white text-4xl font-bold">Чип-тюнинг <br> ателье ReChip</h2>
            <p class="text-white text-lg">Прошивка всех марок авто <br> от 2000 г.в. с гарантией</p>
            <UiButton text="Связаться с нами" @click="submitModal = true" />
          </div>
        </div>
        <div class="col-span-8">
          <UiFormsCarSearch />
        </div>
      </div>
    </div>
  </section>
  <transition
    name="fade-out"
    mode="out-in"
  >
    <UiModalsSubmitForm v-if="submitModal" @close="submitModal = false" />
  </transition>
</template>

<script setup lang="ts">
import hero from '@/public/img/hero.webp'
import hero2 from '@/public/img/hero2.webp'
import hero3 from '@/public/img/hero3.webp'

const sldes = ref([hero, hero2, hero3])
const active = ref(0)
const interval = ref()

onMounted(() => {
  interval.value = setInterval(() => {
    if (active.value === sldes.value.length - 1) {
      active.value = 0
      return
    }
    active.value++
  }, 10000)
})

onUnmounted(() => {
  clearInterval(interval.value)
})

// import { ArrowRightIcon } from '@heroicons/vue/24/outline/index.js'
const submitModal = ref(false)
</script>

<style scoped>
.custom-transition{
  transition: all .9s ease-in-out;
}
</style>
