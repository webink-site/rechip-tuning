<template>
  <div class="h-screen w-screen fixed top-0 left-0 z-30 bg-black bg-opacity-50 backdrop-blur-[10px] flex justify-center items-center m-0" @click="emit('close')">
    <div class="px-8 py-6 bg-white rounded-xl w-[40rem] relative" @click.stop>
      <UiCloseButton @click="emit('close')" />
      <h3 class="font-bold text-dark text-2xl mb-4">Онлайн запись</h3>
      <div class="grid grid-cols-6 gap-4">
        <div class="col-span-6">
          <div class="relative">
            <i class="pi pi-car absolute text-gray-500 text-lg top-4 right-3" />
            <input placeholder="Введите марку, модель, поколение" type="text" class="w-full p-3 rounded-md bg-gray-2 border-none outline-blue-500">
          </div>
        </div>
        <div class="col-span-3">
          <label class="text-dark font-semibold">Ваше имя</label>
          <input placeholder="Иван Иванов" type="text" class="w-full p-3 rounded-md bg-gray-2 border-none outline-blue-500">
        </div>
        <div class="col-span-3">
          <label class="text-dark font-semibold">Телефон для связи</label>
          <input placeholder="+7" type="text" class="w-full p-3 rounded-md bg-gray-2 border-none outline-blue-500">
        </div>
        <div class="col-span-2">
          <UiButton text="Отправить" class="w-full px-10" />
        </div>
        <div class="col-span-4">
          <p class="text-sm text-neutral-400">Нажимая кнопку «Оставить заявку», я подтверждаю наличие гражданства РФ и соглашаюсь на обработку личных данных</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['close'])
</script>

<style scoped>

</style>
