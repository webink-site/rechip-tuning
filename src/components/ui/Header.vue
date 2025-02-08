<template>
  <div class="w-full top-0 left-0 px-4 py-2 bg-white border-b-2 border-gray-3" :class="{'absolute !bg-transparent !border-none ': homepage}">
    <div class="container-fluid mx-auto">
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-8">
          <nuxt-link to="/">
            <img v-if="homepage" src="/img/logo.svg" alt="ReChip">
            <img v-else src="/img/logofooter.svg" alt="ReChip">
          </nuxt-link>
          <ul class="hidden md:flex gap-7">
            <li v-for="(link, i) in links" :key="i">
              <nuxt-link
                :to="link.link"
                class="font-semibold hover:opacity-50"
                :class="{'text-white' : homepage}"
                exact-active-class="!text-primary"
              >
                {{ link.name }}
              </nuxt-link>
            </li>
          </ul>
        </div>
        {{ getCityContact }}
        <div class="flex items-center gap-8">
          <div class="hidden sm:flex gap-6">
            <a :href="`${getCityContact?.social_links.whatsapp ?? '#'}`" class="flex justify-center items-center hover:opacity-80">
              <img src="/public/icons/whats.svg" alt="" class="h-5">
            </a>
            <a :href="`${getCityContact?.social_links.telegram ?? '#'}`" class="flex justify-center items-center hover:opacity-80">
              <img src="/public/icons/tg.svg" alt="" class="h-6">
            </a>
            <a v-if="getCityContact?.social_links.youtube" :href="`${getCityContact?.social_links.youtube ?? '#'}`" class="flex justify-center items-center hover:opacity-80">
              <img src="/public/icons/ytb.svg" alt="" class="h-6">
            </a>
            <a v-if="getCityContact?.social_links.drive2" :href="`${getCityContact?.social_links.drive2 ?? '#'}`" class="flex justify-center items-center hover:opacity-80">
              <img src="/public/icons/d2ru.svg" alt="" class="h-5">
            </a>
            <a v-if="getCityContact?.social_links.avito" :href="`${getCityContact?.social_links.avito ?? '#'}`" class="flex justify-center items-center hover:opacity-80">
              <img src="/public/icons/avito.svg" alt="" class="h-5">
            </a>
            <a v-if="getCityContact?.social_links.vk" :href="`${getCityContact?.social_links.vk ?? '#'}`" class="flex justify-center items-center hover:opacity-80">
              <img src="/public/icons/vk.svg" alt="" class="h-5">
            </a>
          </div>

          <a :href="`tel:${getCityContact?.addresses[0].phone_number}`" class="font-semibold hidden sm:flex gap-1 items-center hover:opacity-50" :class="{'text-white' : homepage}">
            <img v-if="homepage" src="/public/icons/telwh.svg" alt="телефон">
            <img v-else src="/public/icons/telgreen.svg" alt="телефон">
            {{ getCityContact?.addresses[0].phone_number }}
          </a>
          <a href="#" class="text-primary font-semibold flex gap-1 items-center hover:opacity-80" @click.prevent="regionModal = true">
            <img src="/public/icons/marker.svg" alt="маркер">
            {{ uiStore.regions[getCityIndex].name }}
          </a>
          <transition
            name="fade-out"
            mode="out-in"
          >
            <UiModalsRegion v-if="regionModal" @close="regionModal = false" />
          </transition>
          <Bars3Icon
            class="h-8 md:hidden"
            :class="homepage ? 'text-white' : 'text-black'"
            @click="showMenu = !showMenu"
          />
        </div>
      </div>
    </div>
    <transition
      name="fade-out"
      mode="out-in"
    >
      <UiMobileMenu v-if="showMenu" :links="links" @close="showMenu = false" />
    </transition>
  </div>
</template>

<script setup lang="ts">
import { Bars3Icon } from '@heroicons/vue/24/outline/index.js'
import { useUiStore } from '@/src/stores/ui'
import { useCity } from '~/src/helpers/useCiity'
import { useServStore } from '~/src/stores/serv'

const { getCityIndex, getCityContact } = useCity()
const uiStore = useUiStore()
const servStore = useServStore()
const regionModal = ref(false)

useAsyncData('contacts', () => uiStore.LOAD_CONTACTS())
useAsyncData('homepage', () => uiStore.LOAD_HOMEPAGE())
useAsyncData('services', () => servStore.LOAD_SERVICES())

interface Props{
  homepage?: boolean
}
const { homepage } = defineProps<Props>()

const showMenu = ref(false)

const links = [
  {
    name: 'Услуги',
    link: '/services'
  },
  {
    name: 'Отзывы',
    link: '/reviews'
  },
  {
    name: 'Сотрудничество',
    link: '/cooperation'
  },
  {
    name: 'Галерея',
    link: '/gallery'
  },
  {
    name: 'Контакты',
    link: '/contacts'
  }
]

</script>

<style scoped>

</style>
