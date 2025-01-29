<template>
  <div class="px-8 py-6 bg-white rounded-xl relative" @click.stop>
    <slot name="close" />
    <h3 class="font-bold text-dark text-2xl mb-4">Онлайн запись</h3>
    <client-only>
      <form class="grid grid-cols-6 gap-4" @submit.prevent="submitForm">
        <div class="col-span-12 md:col-span-6">
          <div class="relative">
            <i class="pi pi-car absolute text-gray-500 text-lg top-4 right-3" />
            <input
              v-model="data.product"
              placeholder="Введите марку, модель, поколение"
              type="text"
              class="w-full p-3 rounded-md bg-gray-2 border-none outline-blue-500"
              :class="{ error: v$.product.$error }"
            >
          </div>
        </div>
        <div class="col-span-12 md:col-span-3">
          <label class="text-dark font-semibold">Ваше имя</label>
          <input
            v-model="data.name"
            placeholder="Иван Иванов"
            type="text"
            class="w-full p-3 rounded-md bg-gray-2 border-none outline-blue-500"
            :class="{ error: v$.name.$error }"
          >
        </div>
        <div class="col-span-12 md:col-span-3">
          <label class="text-dark font-semibold">Телефон для связи</label>
          <input
            v-model="data.phone"
            v-mask="'+7 (###) ###-##-##'"
            placeholder="+7"
            type="text"
            class="w-full p-3 rounded-md bg-gray-2 border-none outline-blue-500"
            :class="{ error: v$.phone.$error }"
          >
        </div>
        <div class="col-span-12 md:col-span-2">
          <UiButton :load="load" type="submit" text="Отправить" class="w-full px-10" />
        </div>
        <div class="col-span-12 md:col-span-4">
          <p class="text-sm text-neutral-400">Нажимая кнопку «Оставить заявку», я подтверждаю наличие гражданства РФ и соглашаюсь на обработку личных данных</p>
        </div>
      </form>
    </client-only>
  </div>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'
import { toast } from 'vue3-toastify'
import { useYandexMetrika } from '#imports'
import { useCity } from '~/src/helpers/useCiity'
import { useUiStore } from '~/src/stores/ui'

const { reachGoal } = useYandexMetrika()
const { getCityIndex } = useCity()
const uiStore = useUiStore()

type Props ={
  title?: string
}

const emit = defineEmits(['closeSuccess'])
const { title } = defineProps<Props>()

const data = reactive({
  product: '',
  name: '',
  phone: ''
})
const load = ref(false)

if (title) {
  data.product = title
}

const rules = computed(() => ({
  product: {
    required
  },
  name: {
    required
  },
  phone: {
    required,
    minLength: minLength(18)
  }
}))

const v$ = useVuelidate(rules, data)

const submitForm = async () => {
  v$.value.$validate()
  if (!v$.value.$error) {
    load.value = true
    const payload = {
      region_code: uiStore.regions[getCityIndex.value].code,
      contact: `${data.name} - ${data.phone}`,
      product: data.product,
      request_data: 'Чип-тюнинг'
    }
    try {
      await $fetch<any>('https://api.rechip-tuning.ru/api/telegram-requests/submit', {
        method: 'POST',
        body: payload
      })
      data.name = ''
      data.phone = ''
      data.product = ''
      v$.value.$reset()
      reachGoal('ostzav')
      emit('closeSuccess')
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
