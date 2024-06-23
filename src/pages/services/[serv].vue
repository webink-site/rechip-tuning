<template>
  <div v-if="data">
    <ServHero :title="data?.title" :description="data?.description" />
    <section class="bg-gray-2 pt-20">
      <div class="container mx-auto">
        <UiFormsCarSearch full />
      </div>
      <SearchBrands gray />
      <ServPrice :prices="data?.prices" />
      <section class="pb-20 bg-white">
        <div class="container mx-auto">
          <div class="grid gap-6 grid-cols-12 mb-20">
            <div class="col-span-9">
              <ContentDoc class="nuxt-descr mb-10" />
              <a href="#prices" @click.prevent="scrollIntoView('prices')">
                <UiButton text="Посмотреть цены" red />
              </a>
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
          <!-- <pre>{{ data }}</pre> -->
          <div v-if="data?.advant" class="grid gap-6 grid-cols-12">
            <div v-for="(item, index) in data?.advant" :key="index" class="col-span-6">
              <div class="h-full bg-gray-2 rounded-lg p-6">
                <img src="/icons/adv4.svg" class="mb-8 h-8" alt="">
                <p class="font-bold text-dark text-lg mb-2">{{ item.text }}</p>
                <p class="text-gray-400 text-sm">
                  {{ item.descr }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  </div>
</template>

<script setup lang="ts">

const route = useRoute()
const { data } = await useAsyncData<any>('content', () => queryContent().where({ _path: `/services/${route.params.serv}` }).findOne())

const scrollIntoView = (binding: string) => {
  const target = document.getElementById(binding)
  target?.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
}

</script>

<style scoped>

</style>
