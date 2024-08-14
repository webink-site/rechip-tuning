<template>
  <div>
    <section class="py-12 bg-gray-2">
      <div class="container mx-auto px-4 md:px-0">
        <div class="grid grid-cols-12 gap-6">
          <div class="col-span-12">
            <h2 class="text-dark text-4xl font-bold mb-2">Контакты</h2>
          </div>
          <div class="col-span-12">
            <div class="relative h-[500px] w-full rounded-lg overflow-hidden">
              <div class="p-4 md:p-8 rounded-lg bg-white z-10 absolute bottom-0 md:bottom-1/2 w-full md:w-auto md:translate-y-1/2 md:left-16">
                <div class="text-dark font-semibold flex gap-4 items-center hover:opacity-50">
                  <div class="h-12 w-12 rounded bg-red-500 !bg-opacity-10 flex justify-center items-center">
                    <img src="/icons/telred.svg" alt="Компас" class="h-6">
                  </div>
                  <p>
                    {{ uiStore.getCurrentRegion?.phone_number }} <br>
                    <span class="text-gray-400">{{ uiStore.getCurrentRegion?.work_time }}</span>
                  </p>
                </div>
                <!--  -->
                <hr class="my-6">
                <div class="text-dark font-semibold flex gap-4 items-center hover:opacity-50">
                  <div class="h-12 w-12 rounded bg-red-500 !bg-opacity-10 flex justify-center items-center">
                    <img src="/icons/compas.svg" alt="Компас" class="h-6">
                  </div>
                  <p>
                    {{ uiStore.getCurrentRegion?.region_name }} <br>
                    <span class="text-gray-400">{{ uiStore.getCurrentRegion?.address }}</span>
                  </p>
                </div>
              </div>
              <client-only>
                <yandex-map
                  :settings="{
                    location: LOCATION,
                    showScaleInCopyrights: true,
                  }"
                  class="w-full h-full"
                >
                  <yandex-map-default-scheme-layer />
                  <yandex-map-default-features-layer />
                  <yandex-map-default-marker
                    :key="markersGeoJsonSource.title"
                    :settings="markersGeoJsonSource"
                  />
                </yandex-map>
              </client-only>
            </div>
          </div>
          <div class="col-span-12 md:col-span-6">
            <div class="px-8 py-6 bg-white rounded-xl relative">
              <h3 class="font-bold text-dark text-2xl mb-4">Юридические данные</h3>
              <ul class="space-y-3">
                <li>
                  <div class="grid grid-cols-3">
                    <div class="col-span-1 text-gray-400">ИНН</div>
                    <div class="col-span-2">{{ uiStore.getCurrentRegion?.legal_info.inn }}</div>
                  </div>
                </li>
                <li>
                  <div class="grid grid-cols-3">
                    <div class="col-span-1 text-gray-400">КПП</div>
                    <div class="col-span-2">{{ uiStore.getCurrentRegion?.legal_info.kpp }}</div>
                  </div>
                </li>
                <li>
                  <div class="grid grid-cols-3">
                    <div class="col-span-1 text-gray-400">ОГРН</div>
                    <div class="col-span-2">{{ uiStore.getCurrentRegion?.legal_info.ogrn }}</div>
                  </div>
                </li>
                <li>
                  <div class="grid grid-cols-3">
                    <div class="col-span-1 text-gray-400">Юр. адрес</div>
                    <div class="col-span-2">{{ uiStore.getCurrentRegion?.legal_info.legal_address }}</div>
                  </div>
                </li>
                <li>
                  <div class="grid grid-cols-3">
                    <div class="col-span-1 text-gray-400">Физ. адрес</div>
                    <div class="col-span-2">{{ uiStore.getCurrentRegion?.legal_info.phisical_address }}</div>
                  </div>
                </li>
                <li>
                  <div class="grid grid-cols-3">
                    <div class="col-span-1 text-gray-400">Ген. директор</div>
                    <div class="col-span-2">{{ uiStore.getCurrentRegion?.legal_info.general_director }}</div>
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
import type { LngLat } from '@yandex/ymaps3-types'
import type { YMapLocationRequest } from '@yandex/ymaps3-types/imperative/YMap'
import { useUiStore } from '@/src/stores/ui'

const uiStore = useUiStore()

const coordinates = computed(() => {
  return uiStore.getCurrentRegion?.coordinates.split(', ').reverse().map(i => Number(i)) ?? [30.459933, 59.960621]
})

const LOCATION: YMapLocationRequest = {
  center: coordinates.value as LngLat,
  zoom: 16 // starting zoom
}

function closeSuccess () {
  toast('Заявка отправлена', {
    type: 'success'
  })
}

// Array containing GeoJSON data for markers
const markersGeoJsonSource = {
  coordinates: coordinates.value as LngLat,
  title: 'ReChip',
  subtitle: 'Чип-тюнинг ателье',
  color: '#F03C3D'
}
</script>

<style scoped>

</style>
