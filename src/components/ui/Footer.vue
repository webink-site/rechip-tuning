<template>
  <footer class="py-12  bg-gray-2">
    <div class="container mx-auto px-4 md:px-0">
      <div class="grid gap-6 grid-cols-12 items-center border-b pb-8">
        <div class="col-span-3 md:col-span-1 ">
          <img src="/img/logofooter.svg" alt="ReChip">
        </div>
        <div class="col-span-9 md:col-span-2">
          <p class="text-sm text-gray-400">
            Чип-тюнинг ателье <br>
            в {{ uiStore.regions[uiStore.activeRegion].place }}
          </p>
        </div>
        <div class="col-span-12 md:col-span-6 md:col-start-7">
          <div class="flex items-center md:justify-end gap-6 flex-wrap">
            <a href="" class="text-dark font-semibold flex gap-1 items-center hover:opacity-50">
              <img src="/icons/telgreen.svg" alt="телефон">
              +7 (969) 217-98-98
            </a>
            <nuxt-link to="/" class="text-dark font-semibold flex gap-4 items-center hover:opacity-50">
              <div class="h-12 w-12 rounded bg-red-500 !bg-opacity-10 flex justify-center items-center">
                <img src="/icons/compas.svg" alt="Компас" class="h-6">
              </div>
              <p>
                Санкт-Петербург <br>
                <span class="text-gray-400">ш. Революции, 65</span>
              </p>
            </nuxt-link>
          </div>
        </div>
      </div>

      <ul class="my-8 columns-2 md:columns-4 space-y-4">
        <li
          v-for="(item, i) in links"
          :key="i"
        >
          <nuxt-link to="/" class="font-semibold text-dark hover:opacity-50">{{ item }}</nuxt-link>
        </li>
      </ul>

      <div class="grid gap-6 grid-cols-12">
        <div class="col-span-12 md:col-span-9">
          <p class="text-xs text-gray-400 mb-2">
            2024 © ReChip — чип-тюнинг ателье. ООО «РЕЧИП», ИНН: 9726011190, ОГРН: 1227700203785, КПП: 772601001.
            Юр. адрес: 117405, Москва, вн. тер. Муниципальный округ Чертаново Южное, ш Варшавское, д. 158 к. 1,
            этаж 1, пом. I, комн. 6, оф. 3. Физ. адрес: Москва, Варшавское шоссе, д. 152А
          </p>
          <div class="flex gap-6">
            <nuxt-link to="/" class="text-xs text-gray-400 underline hover:no-underline">Пользовательское соглашение</nuxt-link>
            <nuxt-link to="/" class="text-xs text-gray-400 underline hover:no-underline">Публичная оферта</nuxt-link>
          </div>
        </div>
        <div class="col-span-12 md:col-span-3">
          <div class="flex md:justify-end gap-4">
            <a href="#" class="h-8 w-8 rounded-full bg-gray-1 flex justify-center items-center hover:opacity-80">
              <img src="/public/icons/whats.svg" alt="">
            </a>
            <a href="#" class="h-8 w-8 rounded-full bg-gray-1 flex justify-center items-center hover:opacity-80">
              <img src="/public/icons/tg.svg" alt="">
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useUiStore } from '@/src/stores/ui'

const uiStore = useUiStore()
const links = [
  'Услуги',
  'Отзывы',
  'Сотрудничество',
  'Галерея',
  'О компании',
  'Контакты',
  'Чип-тюнинг',
  'Отключение сажевого фильтра',
  'Отключение клапана ЕГР',
  'Отключение системы AdBlue',
  'Прошивка Евро-2',
  'По и прошивки'
]

</script>

<style scoped>

</style>
