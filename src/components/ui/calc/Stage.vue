<template>
  <div class="col-span-12 select-none">
    <div class="p-6 bg-white rounded-xl">
      <div class="flex justify-between items-center">
        <div class="flex">
          <button
            v-for="(item, i) in stageInfo.services.stage"
            :key="i"
            :class="{'border-primary': activeStageTab === i}"
            class="border-b-[3px] py-4 px-5 text-dark"
            @click="emit('changeTab', i)"
          >
            {{ item.stage }}
          </button>
        </div>
      </div>
      <div class="overflow-x-auto pb-3 md:pb-0">
        <table class="w-full mt-2 whitespace-nowrap">
          <tbody class="divide-y">
            <tr>
              <th class="text-start p-4 text-gray-400 font-medium">Параметр</th>
              <th class="text-start p-4 text-gray-400 font-medium">Заводские</th>
              <th class="text-start p-4 text-gray-400 font-medium">Тюнинг*</th>
              <th class="text-start p-4 text-gray-400 font-medium">Прибавка</th>
            </tr>
            <tr v-for="(item, index) in stageInfo.services.stage[activeStageTab].params" :key="index">
              <td class="text-dark font-semibold px-4 py-2">{{ item.param_name ?? '' }}</td>
              <td class="text-dark font-semibold px-4 py-2">{{ item.factory_value ?? '' }}</td>
              <td class="text-dark font-semibold px-4 py-2">
                <Transition name="slide-up" mode="out-in">
                  <span v-if="item.tuned_value" :key="item.tuned_value">
                    {{ item.tuned_value }}
                  </span>
                </Transition>
              </td>
              <td class="text-dark font-semibold px-4 py-2">
                <Transition name="slide-up" mode="out-in">
                  <span v-if="item.increase_value" :key="item.increase_value">
                    {{ item.increase_value }}
                  </span>
                </Transition>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const emit = defineEmits(['changeTab'])

type Props = {
  stageInfo: any
  activeStageTab: number
}

const { stageInfo, activeStageTab } = defineProps<Props>()

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
