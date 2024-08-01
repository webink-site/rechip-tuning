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
              Чип-тюнинг {{ title }} {{ years }} г.в.
            </h1>
            <p class="mt-1 mb-6 text-gray-400">Чип-тюнинг {{ title }} с гарантией и тест-драйвом</p>
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
        <UiCalcStage v-if="stageInfo.stage" :stage-info="stageInfo" />
        <div class="col-span-12">
          <h2 class="font-bold text-dark text-2xl mb-2">Дополнительные услуги к заказу</h2>
        </div>
        <UiCalcAdditionalCard
          v-for="(card, index) in additional"
          :key="index"
          v-model:active="card.active"
          :card="card"
        />
        <div class="col-span-12">
          <div class="flex flex-wrap gap-2 mt-8">
            <UiButton green text="Итого: 14 000 ₽" />
            <UiButton red text="Оставить заявку" />
          </div>
        </div>
        <!-- <pre>{{ additional }}</pre> -->
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Complectation, Brand } from '@/src/types/car'

const route = useRoute()

const { data: brands } = await useAsyncData<Brand[]>('brands', () => $fetch('http://api.rechip-tuning.ru/wp-json/custom/v1/base?full=1'))
const { data: stageInfo } = await useAsyncData<any>('stageInfo', () => $fetch(`https://api.rechip-tuning.ru/wp-json/custom/v1/get-product-data/?v=${route.params.mod}`))

const title = computed(() => {
  const brand = brands.value?.find(i => i.id === route.params.brandName.toString().toUpperCase())
  if (brand) {
    const model = brand.models?.find(i => i.id === route.params.genName.toString().toUpperCase())
    return `${brand.name} ${model?.name}`
  } else {
    return ''
  }
})

interface Props{
  complectation: Complectation
  bodytype: string
  genName: string
  years: string
}

const { complectation, bodytype, genName, years } = defineProps<Props>()

interface Card {
    title: string
    text: string
    price: number
    img: string
    active: boolean
  }

const imgUrl = ref<string | null>(null)
const additional = ref<Card[]>([
  {
    title: 'Прошивка Евро 2',
    text: 'Если удален катализатор - отключение заднего лямбда зонда и ошибок Check Engine по нему',
    price: 1000,
    img: 'https://chip-tyuning-spb-78.ru/app/options/prosivka-evro-2category-7.webp',
    active: false
  },
  {
    title: 'Отключение ЕГР',
    text: 'Если неисправен Клапан EGR системы рециркуляции выхлопных газов',
    price: 1000,
    img: 'https://chip-tyuning-spb-78.ru/app/options/otkliucenie-egrcategory-7.webp',
    active: false
  },
  {
    title: 'Отстрелы',
    text: '"Попкорн", прострелы выхлопной системы на сбросе газа',
    price: 11800,
    img: 'https://chip-tyuning-spb-78.ru/app/options/otstrelycategory-7.webp',
    active: false
  },
  {
    title: 'Чип тюнинг коробки DSG',
    text: 'Прошивка коробки передач DSG, настройка точек переключение, снятие ограничений момента и т.д.',
    price: 18000,
    img: 'https://chip-tyuning-spb-78.ru/app/options/cip-tiuning-dsgcategory-7.webp',
    active: false
  }
])

onMounted(() => {
  imgUrl.value = `http://api.rechip-tuning.ru/wp-content/themes/rechip-tuning/assets/photos/${route.params.modName}.jpg`
})

useSeoMeta({
  title: () => `Чип-тюнинг ${title.value} ${years}`,
  ogTitle: () => `Чип-тюнинг ${title.value} ${years}`,
  description: () => `Чип-тюнинг ${title.value} ${years} с гарантией и тест-драйвом`,
  ogDescription: () => `Чип-тюнинг ${title.value} ${years} с гарантией и тест-драйвом`,
  ogType: 'website',
  ogImage: () => imgUrl.value
})

</script>

<style scoped>

</style>
