<template>
  <section class="py-6 pb-20">
    <div class="container mx-auto px-4 md:px-0">
      <div class="grid gap-6 grid-cols-12">
        <div class="col-span-12 md:col-span-4 h-full">
          <img
            v-if="imgUrl !== null"
            class="w-full h-full object-cover rounded-xl"
            :src="imgUrl"
            @error="imgUrl = null"
          >
          <div v-else class="w-full h-full object-cover rounded-xl bg-gray-200 flex justify-center items-center">
            <i class="pi pi-car text-gray-400 text-2xl" />
          </div>
        </div>
        <div class="col-span-12 md:col-span-8">
          <div class="p-6 bg-white rounded-xl">
            <h1 class="font-bold text-dark text-2xl">
              {{ servStore.services.find((i) => i.slug === $route.params.servName)?.name }} {{ title }} {{ years }} г.в.
            </h1>
            <p class="mt-1 mb-6 text-gray-400">{{ servStore.services.find((i) => i.slug === $route.params.servName)?.name }} {{ title }} с гарантией и тест-драйвом</p>
            <p class="text-dark font-semibold">Характеристики</p>
            <hr class="my-4">
            <ul class="md:columns-2 space-y-3">
              <li>
                <div class="grid grid-cols-2">
                  <div class="col-span-1 text-gray-400">Год</div>
                  <div class="col-span-1">{{ years }}</div>
                </div>
              </li>
              <li>
                <div class="grid grid-cols-2">
                  <div class="col-span-1 text-gray-400">Двигатель</div>
                  <div class="col-span-1">
                    {{ complectation.specifications['volume-litres'] }} л,
                    {{ complectation.specifications['engine-type'] }},
                    {{ complectation.specifications['horse-power'] }} л.с.
                  </div>
                </div>
              </li>
              <li>
                <div class="grid grid-cols-2">
                  <div class="col-span-1 text-gray-400">Коробка</div>
                  <div class="col-span-1">
                    {{ complectation.specifications.transmission }}
                  </div>
                </div>
              </li>
              <li>
                <div class="grid grid-cols-2">
                  <div class="col-span-1 text-gray-400">Привод</div>
                  <div class="col-span-1">
                    {{ complectation.specifications.drive }}
                  </div>
                </div>
              </li>
              <li>
                <div class="grid grid-cols-2">
                  <div class="col-span-1 text-gray-400">Крутящий момент</div>
                  <div class="col-span-1">{{ complectation.specifications.moment }} Н*м</div>
                </div>
              </li>
              <li>
                <div class="grid grid-cols-2">
                  <div class="col-span-1 text-gray-400">Кузов</div>
                  <div class="col-span-1">{{ bodytype }}</div>
                </div>
              </li>

              <li>
                <div class="grid grid-cols-2">
                  <div class="col-span-1 text-gray-400">Поколение</div>
                  <div class="col-span-1">{{ genName }}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <UiCalcStage v-if="stageInfo.stage && $route.params.servName === 'chip-tuning'" :stage-info="stageInfo" :active-stage-tab="activeStageTab" @change-tab="(e) => activeStageTab = e" />
        <div class="col-span-12">
          <h2 class="font-bold text-dark text-2xl mb-2">Дополнительные услуги к заказу</h2>
        </div>
        <UiCalcAdditionalCard
          v-for="(card, index) in addCards"
          :key="index"
          v-model:active="card.active"
          :card="card"
        />
        <div class="col-span-12">
          <div class="flex flex-wrap gap-2 mt-8">
            <UiButton v-if="stageInfo.stage || stageInfo.main_services.length" green :text="`Итого: ${priceTotal} ₽`" />
            <UiButton red text="Оставить заявку" @click="submitModal = true" />
            <transition
              name="fade-out"
              mode="out-in"
            >
              <UiModalsSubmitForm
                v-if="submitModal"
                :title="`Чип-тюнинг ${title} ${years} г.в.`"
                @close="submitModal = false"
                @close-success="closeSuccess"
              />
            </transition>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { toast } from 'vue3-toastify'
import type { Complectation } from '@/src/types/car'
import { useServStore } from '~/src/stores/serv'
// import { useCarStore } from '@/src/stores/car'

const route = useRoute()

// const carStore = useCarStore()
const { data: stageInfo } = await useAsyncData<any>('stageInfo', () => $fetch(`https://api.rechip-tuning.ru/wp-json/custom/v1/get-product-data/?v=${route.params.mod}`))
const servStore = useServStore()

interface Props{
  complectation: Complectation
  bodytype: string
  genName: string
  years: string
  title: string
}

type AddCard = {
    ID: number
    name: string
    description: string
    image: string
    price: string
    active: boolean
  }

const { complectation, bodytype, genName, years, title } = defineProps<Props>()

const imgUrl = ref<string | null>(null)
const activeStageTab = ref(0)
const addCards = ref<AddCard[]>([])
const submitModal = ref(false)

if (stageInfo.value) {
  addCards.value = stageInfo.value.additional_services.map((i: any) => {
    return {
      ...i,
      active: false
    }
  })
}

onMounted(() => {
  imgUrl.value = `https://api.rechip-tuning.ru/wp-content/themes/rechip-tuning/assets/photos/${route.params.modName}.jpg`
})

const priceTotal = computed(() => {
  const addTotal = addCards.value.filter(i => i.active).map(i => Number(i.price.replaceAll(' ', ''))).reduce((a, b) => a + b, 0)
  if (route.params.servName === 'chip-tuning') {
    const priceNum = Number(stageInfo.value.stage[activeStageTab.value].price) ?? 0
    return (priceNum + addTotal).toLocaleString()
  } else {
    const currentServId = servStore.services.find(i => i.slug === route.params.servName)?.id
    const priceInServ = stageInfo.value.main_services.find((i: any) => i.service === currentServId)?.price
    // const priceNum = Number(stageInfo.value.main_services.find) ?? 0
    return (Number(priceInServ.replaceAll(' ', '')) + addTotal).toLocaleString()
  }
})

function closeSuccess () {
  submitModal.value = false
  toast('Заявка отправлена', {
    type: 'success'
  })
}

useSeoMeta({
  title: () => `Чип-тюнинг ${title} ${years}`,
  ogTitle: () => `Чип-тюнинг ${title} ${years}`,
  description: () => `Чип-тюнинг ${title} ${years} с гарантией и тест-драйвом`,
  ogDescription: () => `Чип-тюнинг ${title} ${years} с гарантией и тест-драйвом`,
  ogType: 'website',
  ogImage: () => imgUrl.value
})

</script>

<style scoped>

</style>
