<template>
  <section class="py-12">
    <div class="container mx-auto px-4 md:px-0">
      <div class="bg-cover bg-[url('/img/feedback.webp')] rounded-lg bg-center px-8 py-6">
        <div class="grid gap-4 grid-cols-12">
          <div class="col-span-12">
            <h3 class="text-white text-3xl font-bold mb-1.5">Хотите так же?</h3>
            <p class="text-white">Оставляйте заявку на чип тюнинг</p>
          </div>
          <div class="col-span-12 md:col-span-3">
            <label class="text-white font-semibold">ФИО</label>
            <InputText
              v-model="data.name"
              placeholder="Иванов Иван Иванович"
              class="w-full mt-3 py-2.5 px-3 rounded-md bg-gray-2 border-none mb-2"
            />
          </div>
          <div class="col-span-12 md:col-span-3">
            <label class="text-white font-semibold">Телефон для связи</label>
            <InputText
              v-model="data.phone"
              placeholder="+7"
              class="w-full mt-3 py-2.5 px-3 rounded-md bg-gray-2 border-none mb-2"
            />
          </div>
          <div class="col-span-6" />
          <div class="col-span-12 md:col-span-3">
            <UiButton text="Заказать звонок" class="w-full" />
          </div>
          <div class="col-span-12 md:col-span-3">
            <p class="text-[13px] leading-5 text-white opacity-50">Нажимая кнопку «Оставить заявку», я подтверждаю наличие гражданства РФ и соглашаюсь на обработку личных данных</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">

const data = reactive({
  name: '',
  phone: ''
})
</script>

<style scoped>

</style>
