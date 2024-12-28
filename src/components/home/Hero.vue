<template>
  <section
    class="pb-20 md:pt-20 bg-cover bg-center bg-no-repeat flex items-end custom-transition rounded-b-[32px] mb-20"
    :style="`background-image: url(${sldes[active]});`"
  >
    <div class="container mx-auto px-4 md:px-0">
      <div class="grid gap-6 grid-cols-12 translate-y-28 md:translate-y-32">
        <div class="col-span-12 text-center">
          <h1 class="text-white font-bold text-3xl md:text-4xl leading-tight text-center mb-2">
            Чип-тюнинг ателье ReChip
          </h1>
          <p class="text-white md:text-lg">
            Прошивка всех марок авто от 2000 г.в. с гарантией в {{ uiStore.regions[getCityIndex].place }}
          </p>
        </div>

        <div class="col-span-12">
          <UiFormsCarSearch />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// import { toast } from 'vue3-toastify'
import hero from '@/public/img/hero.webp'
import hero2 from '@/public/img/hero2.webp'
import hero3 from '@/public/img/hero3.webp'
import { useUiStore } from '@/src/stores/ui'
import { useCity } from '~/src/helpers/useCiity'

const uiStore = useUiStore()
const sldes = ref([hero, hero2, hero3])
const active = ref(0)
const interval = ref()

const { getCityIndex } = useCity()

onMounted(() => {
  interval.value = setInterval(() => {
    if (active.value === sldes.value.length - 1) {
      active.value = 0
      return
    }
    active.value++
  }, 10000)
})

// function closeSuccess () {
//   submitModal.value = false
//   toast('Заявка отправлена', {
//     type: 'success'
//   })
// }

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
// const submitModal = ref(false)
</script>

<style scoped>
.custom-transition{
  transition: all .9s ease-in-out;
}
</style>
