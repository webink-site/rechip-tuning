<template>
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
      <div class="p-6 bg-white rounded-xl border-2 border-gray-3">
        <h1 class="font-bold text-dark text-2xl">
          {{ servStore.services.find((i) => i.slug === route.params.serv)?.name }}
          {{ title }}
          {{ route.params.gen.toString().substring(0, 9) }} г.в.
        </h1>
        <p class="mt-1 mb-6 text-gray-400">
          {{ servStore.services.find((i) => i.slug === route.params.serv)?.name }}
          {{ title }}
          с гарантией и тест-драйвом
        </p>
        <p class="text-dark font-semibold">Характеристики</p>
        <hr class="my-4">
        <ul class="md:columns-2 space-y-3">
          <li>
            <div class="grid grid-cols-2">
              <div class="col-span-1 text-gray-400">Год</div>
              <div class="col-span-1">{{ route.params.gen.toString().substring(0, 9) }}</div>
            </div>
          </li>
          <li>
            <div class="grid grid-cols-2">
              <div class="col-span-1 text-gray-400">Двигатель</div>
              <div class="col-span-1">
                {{ complectation.modification.specifications['volume-litres'] }} л,
                {{ complectation.modification.specifications['engine-type'] }},
                {{ complectation.modification.specifications['horse-power'] }} л.с.
              </div>
            </div>
          </li>
          <li>
            <div class="grid grid-cols-2">
              <div class="col-span-1 text-gray-400">Коробка</div>
              <div class="col-span-1">
                {{ complectation.modification.specifications.transmission }}
              </div>
            </div>
          </li>
          <li>
            <div class="grid grid-cols-2">
              <div class="col-span-1 text-gray-400">Привод</div>
              <div class="col-span-1">
                {{ complectation.modification.specifications.drive }}
              </div>
            </div>
          </li>
          <li>
            <div class="grid grid-cols-2">
              <div class="col-span-1 text-gray-400">Крутящий момент</div>
              <div class="col-span-1">{{ complectation.modification.specifications.moment }} Н*м</div>
            </div>
          </li>
          <li>
            <div class="grid grid-cols-2">
              <div class="col-span-1 text-gray-400">Кузов</div>
              <div class="col-span-1">{{ bodytype }}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!--  -->
    <UiCalcStage
      v-if="complectation.services.stage && route.params.serv === 'chip'"
      :stage-info="complectation"
      :active-stage-tab="activeStageTab"
      @change-tab="(e) => activeStageTab = e"
    />

    <div v-if="addCards.length" class="col-span-12">
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
        <Transition name="slide-up" mode="out-in">
          <!-- <p :key="priceTotal">
            Итого:  <span>{{ priceTotal }} </span>₽
          </p> -->
          <UiButton
            v-if="complectation.services.stage || complectation.services.main_services.length"
            :key="priceTotal"
            green
            :text="`Итого: ${priceTotal} ₽`"
          />
        </Transition>

        <UiButton red text="Оставить заявку" @click="submitModal = true" />
        <transition
          name="fade-out"
          mode="out-in"
        >
          <UiModalsSubmitForm
            v-if="submitModal"
            :title="`Чип-тюнинг ${title} ${route.params.gen} г.в.`"
            @close="submitModal = false"
            @close-success="closeSuccess"
          />
        </transition>
      </div>
    </div>
    <!--  -->
  </div>
</template>

<script setup lang="ts">
import { toast } from 'vue3-toastify'
import { useServStore } from '~/src/stores/serv'

type AddCard = {
  ID: number
  name: string
  description: string
  image: string
  price: string
  active: boolean
}
type Props = {
  complectation: any
  title: string
  bodytype: string
}

const { complectation, title, bodytype } = defineProps<Props>()

const servStore = useServStore()
const route = useRoute()

const imgUrl = ref<string | null>(null)
const activeStageTab = ref(0)
const addCards = ref<AddCard[]>([])
const submitModal = ref(false)

if (complectation) {
  addCards.value = complectation.services.additional_services.map((i: any) => {
    return {
      ...i,
      active: false
    }
  })
}

const priceTotal = computed(() => {
  const addTotal = addCards.value.filter(i => i.active).map(i => Number(i.price.replaceAll(' ', '').replace('₽', ''))).reduce((a, b) => a + b, 0)
  if (route.params.serv === 'chip') {
    const priceNum = Number(complectation.services.stage[activeStageTab.value].price.replace('₽', '')) ?? 0
    return (priceNum + addTotal).toLocaleString()
  } else {
    const currentServId = servStore.services.find(i => i.slug === route.params.serv)?.id
    const priceInServ = complectation.services.main_services.find((i: any) => i.service === currentServId)?.price.replace('₽', '')
    return (Number(priceInServ.replaceAll(' ', '')) + addTotal).toLocaleString()
  }
})

function closeSuccess () {
  submitModal.value = false
  toast('Заявка отправлена', {
    type: 'success'
  })
}

onMounted(() => {
  imgUrl.value = `https://api.rechip-tuning.ru/storage/images/photos/${complectation.modification.path['configuration-id']}.jpg`
})
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
