<template>
  <section class="md:h-[900px] py-20 bg-cover bg-center bg-no-repeat flex items-end custom-transition" :style="`background-image: url(${sldes[active]});`">
    <div class="container mx-auto px-4 md:px-0">
      <div class="grid gap-6 grid-cols-12">
        <div class="col-span-12 md:mb-16">
          <h1 class="text-center md:text-left text-white font-bold text-3xl md:text-5xl leading-tight">
            Чип-тюнинг <br>
            Stage 1/Stage 2 <br>
            в {{ uiStore.regions[uiStore.activeRegion].place }}
          </h1>
        </div>
        <div class="col-span-12 md:col-span-4 text-center md:text-left">
          <div class="md:space-y-6">
            <h2 class="text-white text-2xl md:text-4xl font-bold hidden sm:block">Чип-тюнинг <br> ателье ReChip</h2>
            <p class="text-white md:text-lg hidden sm:block">Прошивка всех марок авто <br> от 2000 г.в. с гарантией</p>
            <UiButton text="Связаться с нами" @click="submitModal = true" />
          </div>
        </div>
        <div class="col-span-12 md:col-span-8">
          <UiFormsCarSearch />
        </div>
      </div>
    </div>
  </section>
  <transition
    name="fade-out"
    mode="out-in"
  >
    <UiModalsSubmitForm v-if="submitModal" @close="submitModal = false" @close-success="closeSuccess" />
  </transition>
</template>

<script setup lang="ts">
import { toast } from 'vue3-toastify'
import hero from '@/public/img/hero.webp'
import hero2 from '@/public/img/hero2.webp'
import hero3 from '@/public/img/hero3.webp'
import { useUiStore } from '@/src/stores/ui'

const uiStore = useUiStore()
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

function closeSuccess () {
  submitModal.value = false
  toast('Заявка отправлена', {
    type: 'success'
  })
}

onUnmounted(() => {
  clearInterval(interval.value)
})

// import { ArrowRightIcon } from '@heroicons/vue/24/outline/index.js'

// const getRegion = computed(() => {
//   const host = window?.location?.hostname
//   console.log(host)
//   // const index = uiStore.regions.findIndex(i => host.includes(i.code)) ?? 0
//   // return uiStore.regions[index].place ?? ''
//   return 'sdfkjhsdakfk'
// })
const submitModal = ref(false)
</script>

<style scoped>
.custom-transition{
  transition: all .9s ease-in-out;
}
</style>
