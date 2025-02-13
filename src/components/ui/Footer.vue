<template>
  <footer v-if="uiStore.contacts.length" class="py-12  bg-gray-2">
    <div class="container mx-auto px-4 md:px-0">
      <div class="grid gap-6 grid-cols-12 items-center border-b pb-8">
        <div class="col-span-12 md:col-span-3 ">
          <img src="/img/logofooter.svg" alt="ReChip">
          <p class="text-sm text-gray-400">
            Чип-тюнинг ателье
            в {{ uiStore.regions[getCityIndex].place }}
          </p>
        </div>
        <div class="col-span-12 md:col-span-9">
          <div class="flex flex-wrap md:flex-nowrap md:justify-end gap-4">
            <div class="flex items-center md:justify-end gap-2 flex-wrap">
              <a
                v-for="(address, idx) in getCityContact?.addresses"
                :key="idx"
                :href="`tel:${address.phone_number}`"
                class="text-xs bg-black bg-opacity-10 text-black hover:bg-opacity-20 rounded p-1"
                @click="watchTelClick"
              >
                {{ address.address }}
              </a>
            </div>
            <div class="flex-shrink-0 ">
              <a :href="`tel:${getCityContact?.addresses[0].phone_number}`" class="text-dark font-semibold flex gap-1 items-center hover:opacity-50" @click="watchTelClick">
                <!-- <img src="/icons/telgreen.svg" alt="телефон"> -->
                <div class="h-12 w-12 rounded bg-green-500 !bg-opacity-10 flex justify-center items-center">
                  <img src="/icons/telgreen.svg" alt="Компас" class="h-6">
                </div>
                {{ getCityContact?.addresses[0].phone_number }}
              </a>
            </div>
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
          <!-- <p class="text-xs text-gray-400 mb-2">
            <pre>{{ getCityContact }}</pre>
            {{ getCityContact }}
          </p> -->
          <div class="flex gap-6">
            <nuxt-link to="/user-agreement" class="text-xs text-gray-400 underline hover:no-underline">Пользовательское соглашение</nuxt-link>
            <nuxt-link to="/public-offer" class="text-xs text-gray-400 underline hover:no-underline">Публичная оферта</nuxt-link>
          </div>
        </div>
        <div class="col-span-12 md:col-span-8">
          <div class="flex md:justify-end items-center gap-4 flex-wrap">
            <iframe src="https://yandex.ru/sprav/widget/rating-badge/80385511895?type=rating" width="150" height="50" frameborder="0" />
            <a :href="`${getCityContact?.social_links.whatsapp ?? '#'}`" target="_blank" class="h-8 w-8 rounded-full bg-gray-1 flex justify-center items-center hover:opacity-80" @click="watchWhClick">
              <img src="/public/icons/whats.svg" alt="">
            </a>
            <a :href="`${getCityContact?.social_links.telegram ?? '#'}`" target="_blank" class="h-8 w-8 rounded-full bg-gray-1 flex justify-center items-center hover:opacity-80" @click="watchTgClick">
              <img src="/public/icons/tg.svg" alt="">
            </a>
            <a v-if="getCityContact?.social_links.youtube" :href="`${getCityContact?.social_links.youtube ?? '#'}`" target="_blank" class="h-8 w-8 rounded-full bg-gray-1 flex justify-center items-center hover:opacity-80">
              <img src="/public/icons/ytb.svg" alt="" class="h-6">
            </a>
            <a v-if="getCityContact?.social_links.drive2" :href="`${getCityContact?.social_links.drive2 ?? '#'}`" target="_blank" class="h-8 w-8 rounded-full bg-gray-1 flex justify-center items-center hover:opacity-80">
              <img src="/public/icons/d2ru.svg" alt="" class="h-5">
            </a>
            <a v-if="getCityContact?.social_links.avito" :href="`${getCityContact?.social_links.avito ?? '#'}`" target="_blank" class="flex justify-center items-center hover:opacity-80">
              <img src="/public/icons/avito.svg" alt="" class="h-5">
            </a>
            <a v-if="getCityContact?.social_links.vk" :href="`${getCityContact?.social_links.vk ?? '#'}`" target="_blank" class="flex justify-center items-center hover:opacity-80">
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
import { useYandexMetrika } from '#imports'

const { reachGoal } = useYandexMetrika()
const { getCityIndex, getCityContact } = useCity()

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

function watchTelClick () {
  if (getCityContact.value?.region_code === 'msk') {
    reachGoal('klickmskphone')
  }
}

function watchTgClick () {
  if (getCityContact.value?.region_code === 'msk') {
    reachGoal('klickmsktg')
  }
}

function watchWhClick () {
  if (getCityContact.value?.region_code === 'msk') {
    reachGoal('klickmskwa')
  }
}

</script>

<style scoped>

</style>
