<template>
  <section class="py-12">
    <div class="container mx-auto px-4 md:px-0">
      <div class="bg-cover bg-[url('/img/feedback.webp')] rounded-lg bg-center px-8 py-6">
        <form class="grid gap-4 grid-cols-12" @submit.prevent="submitForm">
          <div class="col-span-12">
            <h3 class="text-white text-3xl font-bold mb-1.5">Хотите так же?</h3>
            <p class="text-white">Оставляйте заявку на чип тюнинг</p>
          </div>
          <div class="col-span-12 md:col-span-3">
            <label class="text-white font-semibold">ФИО</label>
            <InputText
              v-model="data.name"
              :class="{ error: v$.name.$error }"
              placeholder="Иванов Иван Иванович"
              class="w-full mt-3 py-2.5 px-3 rounded-md bg-gray-2 border-none mb-2"
            />
          </div>
          <div class="col-span-12 md:col-span-3">
            <label class="text-white font-semibold">Телефон для связи</label>
            <InputText
              v-model="data.phone"
              v-mask="'+7 (###) ###-##-##'"
              placeholder="+7"
              :class="{ error: v$.phone.$error }"
              class="w-full mt-3 py-2.5 px-3 rounded-md bg-gray-2 border-none mb-2"
            />
          </div>
          <div class="col-span-6" />
          <div class="col-span-12 md:col-span-3">
            <UiButton :load="load" type="submit" text="Заказать звонок" class="w-full" />
          </div>
          <div class="col-span-12 md:col-span-3">
            <p class="text-[13px] leading-5 text-white opacity-50">Нажимая кнопку «Оставить заявку», я подтверждаю наличие гражданства РФ и соглашаюсь на обработку личных данных</p>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { toast } from 'vue3-toastify'

const data = reactive({
  name: '',
  phone: ''
})

const load = ref(false)

const rules = computed(() => ({
  name: {
    required
  },
  phone: {
    required
  }
}))

const v$ = useVuelidate(rules, data)

const submitForm = async () => {
  v$.value.$validate()
  if (!v$.value.$error) {
    load.value = true
    const payload = {
      region_code: 'spb',
      contact: `${data.name} - ${data.phone}`,
      product: 'Форма связи',
      request_data: 'Связаться с клиентом'
    }
    try {
      await $fetch<any>('http://api.rechip-tuning.ru/wp-json/telegram-requests/v1/submit', {
        method: 'POST',
        body: payload
      })
      data.name = ''
      data.phone = ''
      v$.value.$reset()
      toast('Заявка отправлена', {
        type: 'success'
      })
    } catch {
      toast('Ошибка отправки формы', {
        type: 'error'
      })
    } finally {
      load.value = false
    }
  }
}

</script>

<style scoped>
.error {
    box-shadow: 0 0 0 1px red;
}
</style>
