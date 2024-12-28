<template>
  <div class="grid gap-6 grid-cols-12">
    <div class="col-span-12 md:col-span-4">
      <div class="p-6 bg-white rounded-xl border-2 border-gray-3">
        <img
          v-if="imgUrl !== null"
          class="h-52  mx-auto mb-4 object-cover rounded-xl"
          :src="imgUrl"
          @error="imgUrl = null"
        >
        <div v-else class="h-52  mx-auto mb-4 aspect-square object-cover rounded-xl bg-gray-200 flex justify-center items-center">
          <i class="pi pi-car text-gray-400 text-2xl" />
        </div>
        <h1 class="font-bold text-dark text-2xl">
          {{ title }}
        </h1>
        <p class="mt-1 text-gray-400">
          {{ title }}
          с гарантией и тест-драйвом
        </p>
      </div>
    </div>

    <div class="col-span-12 md:col-span-8">
      <div class="p-6 bg-white rounded-xl h-full border-2 border-gray-3">
        <div class="flex justify-between items-center">
          <div class="flex">
            <button
              v-for="(item, i) in stages"
              :key="i"
              :class="{'border-primary': activeStageTab === i}"
              class="border-b-[3px] py-4 px-5 text-dark"
              @click="activeStageTab = i"
            >
              {{ item }}
            </button>
          </div>
        </div>
        <div class="overflow-x-auto pb-3 md:pb-0">
          <table v-if="activeStageTab === 0" class="w-full mt-2 whitespace-nowrap">
            <tbody class="divide-y">
              <tr>
                <th class="text-start p-4 text-gray-400 font-medium">Параметр</th>
                <th class="text-start p-4 text-gray-400 font-medium">Заводские</th>
                <th class="text-start p-4 text-gray-400 font-medium">Тюнинг*</th>
                <th class="text-start p-4 text-gray-400 font-medium">Прибавка</th>
              </tr>
              <tr>
                <td class="text-dark font-semibold px-4 py-2">Объём двигателя</td>
                <td class="text-dark font-semibold px-4 py-2">{{ engine.engine.volume }}</td>
                <td class="text-dark font-semibold px-4 py-2" />
                <td class="text-dark font-semibold px-4 py-2" />
              </tr>
              <tr>
                <td class="text-dark font-semibold px-4 py-2">Мощность</td>
                <td class="text-dark font-semibold px-4 py-2">{{ Number(engine.engine.power) }} л.с.</td>
                <td class="text-dark font-semibold px-4 py-2">{{ Number(engine.chip_tuning_param.stage1_power_value) }} л.с.</td>
                <td class="font-semibold px-4 py-2 text-primary">+{{ Number(engine.chip_tuning_param.stage1_power_value) - Number(engine.engine.power) }} л.с.</td>
              </tr>
              <tr>
                <td class="text-dark font-semibold px-4 py-2">Крутящий момент</td>
                <td class="text-dark font-semibold px-4 py-2">{{ Number(engine.chip_tuning_param.torque) }} Нм</td>
                <td class="text-dark font-semibold px-4 py-2">{{ Number(engine.chip_tuning_param.stage1_torque_value) }} Нм</td>
                <td class="font-semibold px-4 py-2 text-primary">+{{ Number(engine.chip_tuning_param.stage1_torque_value) - Number(engine.chip_tuning_param.torque) }} Нм</td>
              </tr>
            </tbody>
          </table>
          <table v-if="activeStageTab === 1" class="w-full mt-2 whitespace-nowrap">
            <tbody class="divide-y">
              <tr>
                <th class="text-start p-4 text-gray-400 font-medium">Параметр</th>
                <th class="text-start p-4 text-gray-400 font-medium">Заводские</th>
                <th class="text-start p-4 text-gray-400 font-medium">Тюнинг*</th>
                <th class="text-start p-4 text-gray-400 font-medium">Прибавка</th>
              </tr>
              <tr>
                <td class="text-dark font-semibold px-4 py-2">Объём двигателя</td>
                <td class="text-dark font-semibold px-4 py-2">{{ engine.engine.volume }}</td>
                <td class="text-dark font-semibold px-4 py-2" />
                <td class="text-dark font-semibold px-4 py-2" />
              </tr>
              <tr>
                <td class="text-dark font-semibold px-4 py-2">Мощность</td>
                <td class="text-dark font-semibold px-4 py-2">{{ Number(engine.engine.power) }} л.с.</td>
                <td class="text-dark font-semibold px-4 py-2">{{ Number(engine.chip_tuning_param.stage2_power_value) }} л.с.</td>
                <td class="font-semibold px-4 py-2 text-primary">+{{ engine.chip_tuning_param.stage2_power_value ? Number(engine.chip_tuning_param.stage2_power_value) - Number(engine.engine.power) : '' }} л.с.</td>
              </tr>
              <tr>
                <td class="text-dark font-semibold px-4 py-2">Крутящий момент</td>
                <td class="text-dark font-semibold px-4 py-2">{{ Number(engine.chip_tuning_param.torque) }} Нм</td>
                <td class="text-dark font-semibold px-4 py-2">{{ Number(engine.chip_tuning_param.stage2_torque_value) }} Нм</td>
                <td class="font-semibold px-4 py-2 text-primary">+{{ engine.chip_tuning_param.stage2_torque_value ? Number(engine.chip_tuning_param.stage2_torque_value) - Number(engine.chip_tuning_param.torque) : '' }} Нм</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="flex flex-wrap gap-2 mt-8">
          <Transition name="slide-up" mode="out-in">
            <!-- <UiButton
              v-if="complectation.services.stage || complectation.services.main_services.length"
              :key="priceTotal"
              green
              :text="`Итого: ${priceTotal} ₽`"
            /> -->
            <UiButton
              :key="activeStageTab"
              green
              :text="`Итого: ${activeStageTab === 0 ? Number(engine.chip_tuning_param.stage1_price) : Number(engine.chip_tuning_param.stage2_price)} ₽`"
            />
          </Transition>

          <UiButton red text="Оставить заявку" @click="submitModal = true" />
          <transition
            name="fade-out"
            mode="out-in"
          >
            <UiModalsSubmitForm
              v-if="submitModal"
              :title="`${title}, ${engine.engine.volume}, ${engine.engine.power} л.с.`"
              @close="submitModal = false"
              @close-success="closeSuccess"
            />
          </transition>
        </div>
      </div>
    </div>
    <!-- <pre>{{ engine }}</pre> -->
  </div>
</template>

<script setup lang="ts">
import { toast } from 'vue3-toastify'

// const route = useRoute()

const stages = ['Stage 1', 'Stage 2']
const activeStageTab = ref(0)

type Props = {
  engine: any
  title: string
}

const { engine, title } = defineProps<Props>()

const imgUrl = ref<string | null>(null)
const submitModal = ref(false)

function closeSuccess () {
  submitModal.value = false
  toast('Заявка отправлена', {
    type: 'success'
  })
}

onMounted(() => {
  imgUrl.value = `https://api.rechip-tuning.ru/storage/${engine.model.catalog_image}`
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
