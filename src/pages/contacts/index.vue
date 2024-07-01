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
                    +7 (969) 217-98-98 <br>
                    <span class="text-gray-400">Ежедневно, 09:00 – 21:00</span>
                  </p>
                </div>
                <!--  -->
                <hr class="my-6">
                <div class="text-dark font-semibold flex gap-4 items-center hover:opacity-50">
                  <div class="h-12 w-12 rounded bg-red-500 !bg-opacity-10 flex justify-center items-center">
                    <img src="/icons/compas.svg" alt="Компас" class="h-6">
                  </div>
                  <p>
                    Санкт-Петербург <br>
                    <span class="text-gray-400">ш. Революции, 65</span>
                  </p>
                </div>
              </div>
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
                  v-for="marker in markersGeoJsonSource"
                  :key="marker.title"
                  :settings="marker"
                />
              </yandex-map>
            </div>
          </div>
          <div class="col-span-12 md:col-span-6">
            <div class="px-8 py-6 bg-white rounded-xl relative">
              <h3 class="font-bold text-dark text-2xl mb-4">Юридические данные</h3>
              <ul class="space-y-3">
                <li>
                  <div class="grid grid-cols-3">
                    <div class="col-span-1 text-gray-400">ИНН</div>
                    <div class="col-span-2">9726011190</div>
                  </div>
                </li>
                <li>
                  <div class="grid grid-cols-3">
                    <div class="col-span-1 text-gray-400">КПП</div>
                    <div class="col-span-2">772601001</div>
                  </div>
                </li>
                <li>
                  <div class="grid grid-cols-3">
                    <div class="col-span-1 text-gray-400">ОГРН</div>
                    <div class="col-span-2">1187746343234 от 26 марта 2018 г.</div>
                  </div>
                </li>
                <li>
                  <div class="grid grid-cols-3">
                    <div class="col-span-1 text-gray-400">Юр. адрес</div>
                    <div class="col-span-2">117405, Москва, вн.тер. Муниципальный Округ Чертаново Южное, ш Варшавское, д. 158, к. 1</div>
                  </div>
                </li>
                <li>
                  <div class="grid grid-cols-3">
                    <div class="col-span-1 text-gray-400">Физ. адрес</div>
                    <div class="col-span-2">117405, Москва, Варшавское шоссе, д. 152А</div>
                  </div>
                </li>
                <li>
                  <div class="grid grid-cols-3">
                    <div class="col-span-1 text-gray-400">Ген. директор</div>
                    <div class="col-span-2">Абоба Зверь Максимович</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-span-12 md:col-span-6">
            <UiFormsSubmit class="h-full" />
          </div>
        </div>
      </div>
    </section>
    <HomeAdvant />
    <UiFormsFeedback />
  </div>
</template>

<script setup lang="ts">
import {
  YandexMap,
  YandexMapDefaultFeaturesLayer,
  YandexMapDefaultMarker,
  YandexMapDefaultSchemeLayer
} from 'vue-yandex-maps'
import type { LngLat } from '@yandex/ymaps3-types'
import type { YMapLocationRequest } from '@yandex/ymaps3-types/imperative/YMap'

const LOCATION: YMapLocationRequest = {
  center: [30.459933, 59.960621], // starting position [lng, lat]
  zoom: 16 // starting zoom
}

// Array containing GeoJSON data for markers
const markersGeoJsonSource = [
  {
    coordinates: [30.459933, 59.960621] as LngLat,
    title: 'ReChip',
    subtitle: 'Чип-тюнинг ателье',
    color: '#F03C3D'
  }
]
</script>

<style scoped>

</style>
