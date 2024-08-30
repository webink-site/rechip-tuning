<template>
  <div>
    <section
      class="pt-28 pb-20 bg-top bg-no-repeat bg-contain bg-[#15151A]"
      :style="`background-image: url('${image}');`"
    >
      <!-- :style="`background-image: url('${page.img}');`" -->
      <div class="container mx-auto px-4 md:px-0">
        <div class="md:w-2/3">
          <h1 class="text-white text-4xl font-bold mb-4">{{ coop.header }}</h1>
          <p class="text-white leading-7">
            {{ coop.subheader }}
          </p>
          <div class="flex items-center gap-5 my-12">
            <div class="h-12 w-12 bg-sky-500 rounded-lg bg-opacity-10 flex justify-center items-center">
              <img src="/public/icons/tg.svg" alt="Telegram" class="h-6">
            </div>
            <div>
              <p class="text-white font-semibold">Оценим стоимость услуги сейчас!</p>
              <p class="text-gray-400">Отправьте нам описание вашего автомобиля в мессенджер</p>
            </div>
          </div>
          <div class="nuxt-descr coop text-white" v-html="coop.main_text.replaceAll('\n', '<br>')" />
          <!-- <ContentDoc class="nuxt-descr mb-10 coop text-white" /> -->
        </div>
      </div>
    </section>
    <section class="pt-10 md:pt-20 bg-white">
      <div class="container mx-auto px-4 md:px-0">
        <div class="grid gap-6 grid-cols-12 mb-20">
          <div class="col-span-12 md:col-span-9">
            <div class="nuxt-descr mb-10" v-html="coop.second_text" />
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
    <HomeProjects home-page />
    <HomeAdvant />
    <UiFormsFeedback />
  </div>
</template>

<script setup lang="ts">
import image from '@/public/img/coop.webp'

const { data: coop } = await useAsyncData<any>('coop', () => $fetch('http://api.rechip-tuning.ru/wp-json/custom/v1/page?slug=cooperation'))
definePageMeta({
  layout: 'custom'
})
</script>

<style scoped>

</style>
