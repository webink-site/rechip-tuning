<template>
  <div v-if="servStore.services.length && singleServ">
    <section v-if="singleServ.slug" class="bg-gray-2 pt-10 md:pt-20 pb-6">
      <div class="container mx-auto px-4 md:px-0">
        <UiFormsCarSearch />
      </div>
    </section>
    <ServHero :title="singleServ?.post_title ?? singleServ?.name" :image="singleServ.image_wide" :description="singleServ.description ?? ''" />
    <section class="bg-gray-2 pt-10 md:pt-20">
      <SearchBrands gray />
      <ServPrice v-if="singleServ?.minimal_prices.length" :prices="singleServ?.minimal_prices" />
      <section class="md:pb-20 bg-white">
        <div class="container mx-auto px-4 md:px-0">
          <div class="grid gap-6 grid-cols-12 mb-20">
            <div class="col-span-12 md:col-span-9">
              <div class="nuxt-descr">
                <h2>{{ singleServ?.post_title }}</h2>
              </div>
              <div class="nuxt-descr mb-10" v-html="singleServ.page_content" />
              <a v-if="singleServ?.minimal_prices.length" href="#prices" @click.prevent="scrollIntoView('prices')">
                <UiButton text="Посмотреть цены" red />
              </a>
            </div>
            <div class="col-span-12 md:col-span-3 space-y-6 md:mt-16">
              <div class="bg-gray-2 rounded-lg p-4 flex gap-3 items-center">
                <img src="/icons/tg.svg" class="h-10" alt="Напишите в Telegram">
                <div>
                  <p class="font-semibold">Напишите в Telegram</p>
                  <p class="text-sm">@rechip_tuning</p>
                </div>
              </div>
              <div class="bg-gray-2 rounded-lg p-4 flex gap-3 items-center">
                <img src="/icons/whats.svg" class="h-10" alt="Напишите в Telegram">
                <div>
                  <p class="font-semibold">Напишите в WhatsApp</p>
                  <p class="text-sm">+7 (969) 217-98-98</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useCity } from '~/src/helpers/useCiity'
import { useCarStore } from '~/src/stores/car'
import { useServStore } from '~/src/stores/serv'
import { useUiStore } from '~/src/stores/ui'

const route = useRoute()
const servStore = useServStore()
const carStore = useCarStore()
const { getCityIndex } = useCity()
const uiStore = useUiStore()

useAsyncData('brands', () => carStore.LOAD_BRANDS())

const scrollIntoView = (binding: string) => {
  const target = document.getElementById(binding)
  target?.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
}

const singleServ = computed(() => {
  return servStore.services.find((i: any) => i.slug === route.params.serv)
})

function getMetaTags (): any {
  const level = singleServ.value?.seo_settings.find(i => i.level === 'service')
  return level ?? { title: '', description: '' }
}

/* eslint-disable no-template-curly-in-string */
useSeoMeta({
  title: () => getMetaTags().title.replaceAll('${region}', uiStore.regions[getCityIndex.value].place),
  ogTitle: () => getMetaTags().title.replaceAll('${region}', uiStore.regions[getCityIndex.value].place),
  description: () => getMetaTags().description.replaceAll('${region}', uiStore.regions[getCityIndex.value].place),
  ogDescription: () => getMetaTags().description.replaceAll('${region}', uiStore.regions[getCityIndex.value].place),
  ogType: 'website',
  ogImage: `https://api.rechip-tuning.ru/storage/${singleServ.value?.image_wide}`
})
</script>

<style scoped>

</style>
