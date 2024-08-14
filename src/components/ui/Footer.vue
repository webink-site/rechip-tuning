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
            <a :href="`tel:${uiStore.contacts[getCityIndex]?.phone_number}`" class="text-dark font-semibold flex gap-1 items-center hover:opacity-50">
              <img src="/icons/telgreen.svg" alt="телефон">
              {{ uiStore.contacts[getCityIndex]?.phone_number }}
            </a>
            <nuxt-link to="/contacts" class="text-dark font-semibold flex gap-4 items-center hover:opacity-50">
              <div class="h-12 w-12 rounded bg-red-500 !bg-opacity-10 flex justify-center items-center">
                <img src="/icons/compas.svg" alt="Компас" class="h-6">
              </div>
              <p>
                {{ uiStore.contacts[getCityIndex].region_name }} <br>
                <span class="text-gray-400">{{ uiStore.contacts[getCityIndex]?.address }}</span>
              </p>
            </nuxt-link>
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

      <div class="grid gap-6 grid-cols-12">
        <div class="col-span-12 md:col-span-9">
          <p class="text-xs text-gray-400 mb-2">
            {{ uiStore.contacts[getCityIndex]?.legal_info.footer_tiny_text }}
          </p>
          <div class="flex gap-6">
            <nuxt-link to="/" class="text-xs text-gray-400 underline hover:no-underline">Пользовательское соглашение</nuxt-link>
            <nuxt-link to="/" class="text-xs text-gray-400 underline hover:no-underline">Публичная оферта</nuxt-link>
          </div>
        </div>
        <div class="col-span-12 md:col-span-3">
          <div class="flex md:justify-end gap-4">
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
  { name: 'Чип-тюнинг', link: '/services/chip' },
  { name: 'Отключение сажевого фильтра', link: '/services/soot-filter' },
  { name: 'Отключение клапана ЕГР', link: '/services/egr' },
  { name: 'Отключение системы AdBlue', link: '/services/ad-blue' },
  { name: 'Прошивка Евро-2', link: '/services/euro-2' }
]

</script>

<style scoped>

</style>
