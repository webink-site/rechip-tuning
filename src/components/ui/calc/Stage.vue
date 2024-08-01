<template>
  <div class="col-span-12">
    <div class="p-6 bg-white rounded-xl">
      <div class="flex justify-between items-center">
        <div class="flex">
          <button
            v-for="(item, i) in stageInfo.stage"
            :key="i"
            :class="{'border-primary': activeTab === i}"
            class="border-b-[3px] py-4 px-5 text-dark"
            @click="activeTab = i"
          >
            {{ item.stage_title }}
          </button>
        </div>
        <!-- <div class="flex gap-2">
          <UiButton green text="Итого: 14 000 ₽" />
          <UiButton red text="Оставить заявку" />
        </div> -->
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
            <tr v-for="(item, index) in stageInfo.stage[activeTab].parameters" :key="index">
              <td class="text-dark font-semibold px-4 py-2">{{ item.parameter ?? '' }}</td>
              <td class="text-dark font-semibold px-4 py-2">{{ item.factory_values ?? '' }}</td>
              <td class="text-dark font-semibold px-4 py-2">{{ item.tuned_values ?? '' }}</td>
              <td class="text-dark font-semibold px-4 py-2">{{ item.increase ?? '' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const activeTab = ref(0)
type Props = {
  stageInfo: any
}

const { stageInfo } = defineProps<Props>()

</script>

<style scoped>

</style>
