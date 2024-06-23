<template>
  <div>
    <section
      class="pt-28 pb-20 bg-top bg-no-repeat bg-contain bg-[#15151A]"
      :style="`background-image: url('${image}');`"
    >
      <!-- :style="`background-image: url('${page.img}');`" -->
      <div class="container mx-auto ">
        <div class="md:w-2/3">
          <h1 class="text-white text-4xl font-bold mb-4">{{ data.title }}</h1>
          <p class="text-white leading-7">
            {{ data.description }}
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
          <ContentDoc class="nuxt-descr mb-10 coop text-white" />
        </div>
      </div>
    </section>
    <section class="pt-20 bg-white">
      <div class="container mx-auto">
        <div class="grid gap-6 grid-cols-12 mb-20">
          <div class="col-span-9">
            <div class="nuxt-descr mb-10">
              <h2>Имем представителей в разных регионах!</h2>
              <p>
                Дорогие друзья и потенциальные партнеры!
                <br><br>
                Мы рады предложить Вам уникальную возможность стать нашим партнером в области чип-тюнинга автомобилей. Чип-тюнинг – это процесс, который позволяет увеличить мощность двигателя, улучшить динамику автомобиля и многое другое.
                <br><br>
                Мы предоставляем качественный и быстрый сервис в сфере чип-тюнинга. Наши специалисты имеют большой опыт и высокую квалификацию, благодаря чему мы можем гарантировать эффективность и безопасность чип-тюнинга.
                <br><br>
                Мы ищем партнеров для расширения нашей деятельности в регионе. Мы готовы предоставить выгодные условия для сотрудничества. Не переживайте по поводу опыта, наши специалисты всегда готовы и при необходимости сделают все, чтобы клиент остался доволен результатом!
                <br><br>
                Позвоните нам и мы предложим Вам выгодное сотрудничество, которое поможет Вам заработать и стать успешным предпринимателем в области чип-тюнинга. Тел:
                <a class="text-primary underline underline-offset-2" href="href:+79646149393">+7 (964) 614-93-93</a>
                <br><br>
                Не упустите шанс стать частью нашей успешной команды! Свяжитесь с нами прямо сейчас и станьте нашим партнером!
                <br><br>
                С уважением команда Rechip!
              </p>
            </div>
          </div>
          <div class="col-span-3 space-y-6 mt-16">
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
const { data } = await useAsyncData<any>('content', () => queryContent().where({ _path: '/cooperation' }).findOne())
definePageMeta({
  layout: 'custom'
})
</script>

<style scoped>

</style>
