<template>
  <div class="transition-all h-screen w-screen bg-white py-20 px-4 z-20 fixed top-0 left-0">
    <UiCloseButton @click="emit('close')" />
    <ul class="space-y-7 mb-7" @click="emit('close')">
      <li v-for="(link, i) in links" :key="i">
        <nuxt-link
          :to="link.link"
          class="font-semibold hover:opacity-50 text-dark text-2xl"
        >
          {{ link.name }}
        </nuxt-link>
      </li>
    </ul>
    <a :href="`tel:${getCityContact?.addresses[0].phone_number}`" class="font-semibold flex gap-1 items-center hover:opacity-50 text-2xl">
      <img src="/public/icons/tel.svg" alt="телефон">
      {{ getCityContact?.addresses[0].phone_number }}
    </a>
    <div class="flex gap-6 mt-6">
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
  </div>
</template>

<script setup lang="ts">
import { useCity } from '~/src/helpers/useCiity'

// import { useUiStore } from '@/src/stores/ui'

// const uiStore = useUiStore()
const emit = defineEmits(['close'])
const { getCityContact } = useCity()

type Props = {
  links: any
}

const { links } = defineProps<Props>()

</script>

<style scoped>

</style>
