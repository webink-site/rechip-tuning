<template>
  <footer v-if="uiStore.contacts.length" class="py-12  bg-gray-2">
    <div class="container mx-auto px-4 md:px-0">
      <div class="grid gap-6 grid-cols-12 items-center border-b pb-8">
        <div class="col-span-3 md:col-span-1 ">
          <img src="/img/logofooter.svg" alt="ReChip">
        </div>
        <div class="col-span-9 md:col-span-2">
          <p class="text-sm text-gray-400">
            Чип-тюнинг ателье <br>
            в {{ uiStore.regions[getCityIndex].place }}
          </p>
        </div>
        <div class="col-span-12 md:col-span-6 md:col-start-7">
          <div class="flex items-center md:justify-end gap-6 flex-wrap">
            <a :href="`tel:${uiStore.getCurrentRegion?.addresses[0].phone_number}`" class="text-dark font-semibold flex gap-1 items-center hover:opacity-50">
              <img src="/icons/telgreen.svg" alt="телефон">
              {{ uiStore.getCurrentRegion?.addresses[0].phone_number }}
            </a>
            <!-- <nuxt-link to="/contacts" class="text-dark font-semibold flex gap-4 items-center hover:opacity-50">
              <div class="h-12 w-12 rounded bg-red-500 !bg-opacity-10 flex justify-center items-center">
                <img src="/icons/compas.svg" alt="Компас" class="h-6">
              </div>
              <p>
                {{ uiStore.contacts[getCityIndex]?.region_name }} <br>
                <span class="text-gray-400">{{ uiStore.contacts[getCityIndex]?.address }}</span>
              </p>
            </nuxt-link> -->
          </div>
        </div>
      </div>

      <ul class="my-8 columns-2 md:columns-3 space-y-4">
        <li
          v-for="(item, i) in links"
          :key="i"
        >
          <nuxt-link :to="item.link" class="font-semibold text-dark hover:opacity-50">{{ item.name }}</nuxt-link>
        </li>
      </ul>

      <div class="grid gap-6 grid-cols-12 items-center">
        <div class="col-span-12 md:col-span-4">
          <p class="text-xs text-gray-400 mb-2">
            <!-- <pre>{{ uiStore.contacts }}</pre> -->
            <!-- {{ uiStore.contacts[getCityIndex]?.legal_info[0].footer_tiny_text }} -->
          </p>
          <div class="flex gap-6">
            <nuxt-link to="/" class="text-xs text-gray-400 underline hover:no-underline">Пользовательское соглашение</nuxt-link>
            <nuxt-link to="/" class="text-xs text-gray-400 underline hover:no-underline">Публичная оферта</nuxt-link>
          </div>
        </div>
        <div class="col-span-12 md:col-span-8">
          <div class="flex md:justify-end items-center gap-4 flex-wrap">
            <iframe src="https://yandex.ru/sprav/widget/rating-badge/80385511895?type=rating" width="150" height="50" frameborder="0" />
            <a :href="`${uiStore.getCurrentRegion?.social_links.whatsapp ?? '#'}`" class="h-8 w-8 rounded-full bg-gray-1 flex justify-center items-center hover:opacity-80">
              <img src="/public/icons/whats.svg" alt="">
            </a>
            <a :href="`${uiStore.getCurrentRegion?.social_links.telegram ?? '#'}`" class="h-8 w-8 rounded-full bg-gray-1 flex justify-center items-center hover:opacity-80">
              <img src="/public/icons/tg.svg" alt="">
            </a>
            <a v-if="uiStore.getCurrentRegion?.social_links.youtube" :href="`${uiStore.getCurrentRegion?.social_links.youtube ?? '#'}`" class="h-8 w-8 rounded-full bg-gray-1 flex justify-center items-center hover:opacity-80">
              <img src="/public/icons/ytb.svg" alt="" class="h-6">
            </a>
            <a v-if="uiStore.getCurrentRegion?.social_links.drive2" :href="`${uiStore.getCurrentRegion?.social_links.drive2 ?? '#'}`" class="h-8 w-8 rounded-full bg-gray-1 flex justify-center items-center hover:opacity-80">
              <img src="/public/icons/d2ru.svg" alt="" class="h-5">
            </a>
            <a v-if="uiStore.getCurrentRegion?.social_links.avito" :href="`${uiStore.getCurrentRegion?.social_links.avito ?? '#'}`" class="flex justify-center items-center hover:opacity-80">
              <img src="/public/icons/avito.svg" alt="" class="h-5">
            </a>
            <a v-if="uiStore.getCurrentRegion?.social_links.vk" :href="`${uiStore.getCurrentRegion?.social_links.vk ?? '#'}`" class="flex justify-center items-center hover:opacity-80">
              <img src="/public/icons/vk.svg" alt="" class="h-5">
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useUiStore } from '@/src/stores/ui'
import { useCity } from '~/src/helpers/useCiity'

const { getCityIndex } = useCity()

const uiStore = useUiStore()
const links = [
  { name: 'Услуги', link: '/services' },
  { name: 'Отзывы', link: '/reviews' },
  { name: 'Сотрудничество', link: '/cooperation' },
  { name: 'Галерея', link: '/gallery' },
  { name: 'Контакты', link: '/contacts' },
  { name: 'Чип-тюнинг', link: '/services/chip-tyuning' },
  { name: 'Отключение сажевого фильтра', link: '/services/otklyuchenie-sazhevogo-filtra' },
  { name: 'Отключение клапана ЕГР', link: '/services/otklyuchenie-klapana-egr' },
  { name: 'Отключение системы AdBlue', link: '/services/otklyuchenie-mocheviny-adblue' },
  { name: 'Прошивка Евро-2', link: '/services/proshivka-evro-2' }
]

</script>

<style scoped>

</style>
