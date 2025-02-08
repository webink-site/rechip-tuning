<template>
  <div>
    <section class="py-12 bg-gray-2">
      <div class="container mx-auto px-4 md:px-0">
        <div class="grid grid-cols-12 gap-6">
          <div class="col-span-12">
            <h2 class="text-dark text-4xl font-bold mb-2">Контакты</h2>
          </div>
          <div class="col-span-12">
            <div class="flex gap-2 mb-4 overflow-x-auto">
              <UiButton
                v-for="(item, idx) in uiStore.getCurrentRegion?.addresses"
                :key="idx"
                :red="selectedAddress !== idx"
                :text="`${item.address}`"
                class="!py-2 !px-4 text-xs whitespace-nowrap"
                @click="selectedAddress = idx"
              />
            </div>
            <div class="relative h-[500px] w-full rounded-lg overflow-hidden">
              <div class="p-3 md:p-6 rounded-lg bg-white z-10 absolute bottom-0 md:bottom-1/2 w-full md:w-auto min-w-[300px] md:translate-y-1/2 md:left-16">
                <div class="text-dark font-semibold flex gap-4 items-center hover:opacity-50">
                  <div class="h-12 w-12 rounded bg-red-500 !bg-opacity-10 flex justify-center items-center">
                    <img src="/icons/telred.svg" alt="Компас" class="h-6">
                  </div>
                  <p>
                    <a :href="`tel:${uiStore.getCurrentRegion?.addresses[selectedAddress].phone_number}`">
                      {{ uiStore.getCurrentRegion?.addresses[selectedAddress].phone_number }}
                    </a> <br>
                    <span class="text-gray-400 font-medium text-sm">{{ uiStore.getCurrentRegion?.addresses[selectedAddress].work_time }}</span>
                  </p>
                </div>
                <hr class="my-4">
                <div class="text-dark font-semibold flex gap-4 items-center hover:opacity-50">
                  <div class="h-12 w-12 rounded bg-red-500 !bg-opacity-10 flex justify-center items-center">
                    <img src="/icons/compas.svg" alt="Компас" class="h-6">
                  </div>
                  <p>
                    {{ uiStore.getCurrentRegion?.addresses[selectedAddress].city }} <br>
                    <span class="text-gray-400 font-medium text-sm">{{ uiStore.getCurrentRegion?.addresses[selectedAddress].address }}</span>
                  </p>
                </div>
                <a :href="uiStore.getCurrentRegion?.addresses[selectedAddress].yandex_map_link" target="_blank">
                  <UiButton blue text="Как добраться" class="w-full mt-4" />
                </a>
              </div>
              <client-only>
                <yandex-map
                  :settings="{
                    location: {
                      ...LOCATION,
                      duration: 250,
                    },
                    showScaleInCopyrights: true,
                  }"
                  class="w-full h-full"
                >
                  <yandex-map-default-scheme-layer />
                  <yandex-map-default-features-layer />
                  <yandex-map-default-marker
                    v-for="(item, idx) in uiStore.getCurrentRegion?.addresses"
                    :key="idx"
                    class="!cursor-pointer "
                    :settings="{
                      coordinates: item.coordinates.split(', ').reverse().map(i => Number(i)) ?? [30.459933, 59.960621],
                      color: '#F03C3D',
                      onClick: () => selectedAddress = idx,
                    }"
                  />
                </yandex-map>
              </client-only>
            </div>
          </div>
          <div class="col-span-12 md:col-span-6">
            <div class="px-8 py-6 bg-white rounded-xl relative h-full">
              <h3 class="font-bold text-dark text-2xl mb-4">Юридические данные</h3>
              <ul class="space-y-3">
                <li>
                  <div class="grid grid-cols-3">
                    <div class="col-span-1 text-gray-400">ИНН:</div>
                    <div class="col-span-2">{{ uiStore.getCurrentRegion?.inn }}</div>
                  </div>
                </li>
                <li>
                  <div class="grid grid-cols-3">
                    <div class="col-span-1 text-gray-400">ОГРН:</div>
                    <div class="col-span-2">{{ uiStore.getCurrentRegion?.ogrnip }}</div>
                  </div>
                </li>
                <li>
                  <div class="grid grid-cols-3">
                    <div class="col-span-1 text-gray-400">Юр. адрес:</div>
                    <div class="col-span-2">{{ uiStore.getCurrentRegion?.legal_address }}</div>
                  </div>
                </li>
                <li>
                  <div class="grid grid-cols-3">
                    <div class="col-span-1 text-gray-400">Организация:</div>
                    <div class="col-span-2">{{ uiStore.getCurrentRegion?.organization_name }}</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-span-12 md:col-span-6">
            <UiFormsSubmit class="h-full" @close-success="closeSuccess" />
          </div>
        </div>
      </div>
    </section>
    <HomeAdvant />
    <UiFormsFeedback />
  </div>
</template>

<script setup lang="ts">
import { toast } from 'vue3-toastify'
import {
  YandexMap,
  YandexMapDefaultFeaturesLayer,
  YandexMapDefaultMarker,
  YandexMapDefaultSchemeLayer
} from 'vue-yandex-maps'
// import type { LngLat } from '@yandex/ymaps3-types'
// import type { YMapLocationRequest } from '@yandex/ymaps3-types/imperative/YMap'
import { useUiStore } from '@/src/stores/ui'

const uiStore = useUiStore()
const selectedAddress = ref(0)

// const coordinates = computed(() => {
//   return uiStore.getCurrentRegion?.addresses[0].coordinates.split(', ').reverse().map(i => Number(i)) ?? [30.459933, 59.960621]
// })

const LOCATION = ref({
  center: [37.623082, 55.75254],
  zoom: 12
})

onMounted(() => {
  LOCATION.value = {
    center: uiStore.getCurrentRegion?.addresses[0].coordinates.split(', ').reverse().map(i => Number(i)) ?? [30.459933, 59.960621],
    zoom: 12
  }
})

watch(selectedAddress, () => {
  LOCATION.value = {
    center: uiStore.getCurrentRegion?.addresses[selectedAddress.value].coordinates.split(', ').reverse().map(i => Number(i)) ?? [30.459933, 59.960621],
    zoom: 12
  }
})

function closeSuccess () {
  toast('Заявка отправлена', {
    type: 'success'
  })
}

</script>

<style scoped>
.ymaps3x0--default-marker__view{
  cursor: pointer!important;
  }
</style>
