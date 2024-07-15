<template>
  <ClientOnly>
    <div class="bg-white rounded-xl py-6 px-8">
      <div class="grid grid-cols-12 md:gap-4" :class="{'md:!grid-cols-7': props.full}">
        <div class="col-span-12 md:col-span-3" :class="{'md:!col-span-1': props.full}">
          <label class="text-dark font-semibold">Услуга</label>
          <Dropdown
            v-model="search.serv"
            :options="servStore.services"
            :class="{ 'outline outline-2 outline-red-500': v$.serv.$error}"
            option-value="slug"
            option-label="name"
            class="w-full mt-3 py-0.5 rounded-md bg-gray-2 border-none mb-2"
            @change="carStore.SET_SERV(search.serv)"
          />
        </div>
        <div class="col-span-12 md:col-span-3" :class="{'md:!col-span-1': props.full}">
          <label class="text-dark font-semibold">Марка</label>
          <Dropdown
            v-model="search.brand"
            :options="carStore.brands"
            option-value="id"
            option-label="name"
            :filter="carStore.models.length ? true : false"
            empty-message="Нет доступных опций"
            class="w-full mt-3 py-0.5 rounded-md bg-gray-2 border-none mb-2"
            :class="{ 'outline outline-2 outline-red-500': v$.brand.$error}"
            @change="carStore.LOAD_MODELS(search.brand)"
          />
        </div>
        <div class="col-span-12 md:col-span-3" :class="{'md:!col-span-1': props.full}">
          <label class="text-dark font-semibold">Модель</label>
          <Dropdown
            v-model="search.model"
            :options="carStore.models"
            option-value="id"
            option-label="name"
            class="w-full mt-3 py-0.5 rounded-md bg-gray-2 border-none mb-2"
            :filter="carStore.models.length ? true : false"
            empty-message="Нет доступных опций"
            :class="{ 'outline outline-2 outline-red-500': v$.model.$error}"
            @change="carStore.LOAD_GENS(search.model)"
          />
        </div>
        <div class="col-span-12 md:col-span-3" :class="{'md:!col-span-1': props.full}">
          <label class="text-dark font-semibold">Поколение</label>
          <Dropdown
            v-model="search.gen"
            :options="carStore.getGens"
            option-value="id"
            option-label="gen_name"
            :filter="carStore.models.length ? true : false"
            empty-message="Нет доступных опций"
            class="w-full mt-3 py-0.5 rounded-md bg-gray-2 border-none mb-2"
            :class="{ 'outline outline-2 outline-red-500': v$.gen.$error}"
            @change="carStore.LOAD_BODY(search.gen)"
          >
            <template #option="slotProps">
              <div>
                <p>{{ slotProps.option.gen_name }}</p>
                <!-- {{ slotProps.option }} -->
              </div>
            </template>
          </Dropdown>
        </div>
        <div class="col-span-12 md:col-span-4" :class="{'md:!col-span-1': props.full}">
          <label class="text-dark font-semibold">Кузов</label>
          <Dropdown
            v-model="search.body"
            :options="carStore.bodies"
            option-value="id"
            option-label="body-type"
            empty-message="Нет доступных опций"
            class="w-full mt-3 py-0.5 rounded-md bg-gray-2 border-none mb-2"
            :class="{ 'outline outline-2 outline-red-500': v$.body.$error}"
            @change="carStore.LOAD_MODS(search.body)"
          />
        </div>
        <div class="col-span-12 md:col-span-4" :class="{'md:!col-span-1': props.full}">
          <label class="text-dark font-semibold">Модификация</label>
          <Dropdown
            v-model="search.mod"
            :options="carStore.mods"
            option-value="complectation-id"
            option-label="title"
            empty-message="Нет доступных опций"
            class="w-full mt-3 py-0.5 rounded-md bg-gray-2 border-none mb-2"
            :class="{ 'outline outline-2 outline-red-500': v$.mod.$error}"
            @change="carStore.SET_MOD(search.mod)"
          />
        </div>
        <div class="col-span-12 md:col-span-4" :class="{'md:!col-span-1': props.full}">
          <UiButton text="Искать" class="w-full mt-7" @click="searchCar" />
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { useCarStore } from '@/src/stores/car'
import { useServStore } from '@/src/stores/serv'

const carStore = useCarStore()
const router = useRouter()
const servStore = useServStore()

interface SearchField {
  serv: string | null,
  brand: string | null,
  model: string | null
  gen: string | null
  body: string | null
  mod: string | null
}

const search = reactive<SearchField>({
  serv: '',
  brand: '',
  model: '',
  gen: '',
  body: '',
  mod: ''
})

useAsyncData('brands', () => carStore.LOAD_BRANDS())

const rules = computed(() => ({
  serv: { required },
  brand: { required },
  model: { required },
  gen: { required },
  body: { required },
  mod: { required }
}))

const v$ = useVuelidate(rules, search)

const props = defineProps({
  full: {
    type: Boolean,
    default: false
  }
})

const searchCar = () => {
  v$.value.$validate()
  if (!v$.value.$error) {
    router.replace(`/services/${search.serv}/${search.brand}/${search.model}/${search.gen?.toString()}/${search.body?.toString()}/${search.mod?.toString()}`)
  }
}

onMounted(() => {
  for (const key in carStore.search) {
    search[key as keyof SearchField] = carStore.search[key as keyof SearchField]
  }
})

</script>

<style scoped>
.errorField{
  border: 1px red solid;
}
</style>
