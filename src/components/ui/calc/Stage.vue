<template>
  <div class="col-span-12">
    <div class="p-6 bg-white rounded-xl">
      <div class="flex justify-between items-center">
        <div class="flex">
          <button
            v-for="(item, i) in tabs"
            :key="i"
            :class="{'border-primary': activeTab === i}"
            class="border-b-[3px] py-4 px-5 text-dark"
            @click="activeTab = i"
          >
            {{ item }}
          </button>
        </div>
        <div class="flex gap-2">
          <UiButton green text="Итого: 14 000 ₽" />
          <UiButton red text="Оставить заявку" />
        </div>
      </div>
      <table class="w-full mt-2">
        <tbody class="divide-y">
          <tr>
            <th class="text-start p-4 text-gray-400 font-medium">Параметр</th>
            <th class="text-start p-4 text-gray-400 font-medium">Заводские</th>
            <th class="text-start p-4 text-gray-400 font-medium">Тюнинг*</th>
            <th class="text-start p-4 text-gray-400 font-medium">Прибавка</th>
          </tr>
          <tr v-for="(item, index) in table" :key="index">
            <td class="text-dark font-semibold px-4 py-2">{{ item.param }}</td>
            <td class="text-dark font-semibold px-4 py-2">{{ item.stock }}</td>
            <td class="text-dark font-semibold px-4 py-2">{{ item.tuning }}</td>
            <td class="text-dark font-semibold px-4 py-2">{{ item.addition }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">

const activeTab = ref(0)

const tabs = ['Stage 1', 'Stage 2']

const table = [
  {
    param: 'Объём двигателя',
    stock: '2.0 DEMA, DKYA, DLVA',
    tuning: '',
    addition: ''
  },
  {
    param: 'Мощность',
    stock: '190 л.с.',
    tuning: '270 л.с.',
    addition: '+80 л.с.'
  },
  {
    param: 'Крутящий момент',
    stock: '320 Нм',
    tuning: '440 Нм',
    addition: '+120 Нм'
  }
]

</script>

<style scoped>

</style>
