<template>
  <ClientOnly>
    <div class="relative bg-white rounded-xl py-6 px-8 border-2 border-gray-3">
      <span
        v-if="Object.values(search).some(value => value)"
        class="absolute top-2 right-4 text-primary cursor-pointer text-sm"
        @click="clearFilter"
      >
        <XMarkIcon class="h-4 inline" />
        Очистить
      </span>
      <div class="grid grid-cols-1 md:grid-cols-6 md:gap-4">
        <div class="col-span-1" :class="{'md:!col-span-1': props.full}">
          <label class="text-dark font-semibold hidden md:block">Услуга</label>
          <Dropdown
            v-model="search.serv"
            :options="servStore.services"
            placeholder="Услуга"
            :class="{ 'outline outline-2 outline-red-500': v$.serv.$error}"
            option-value="slug"
            option-label="name"
            class="w-full md:mt-3 py-0.5 rounded-md bg-gray-2 border-none mb-2"
            @change="changeServ"
          />
        </div>
        <div class="col-span-1">
          <label class="text-dark font-semibold hidden md:block">Марка</label>
          <Dropdown
            v-model="search.brand"
            :options="carStore.brands"
            placeholder="Марка"
            option-value="slug"
            option-label="name"
            :filter="true"
            empty-message="Нет доступных опций"
            class="w-full md:mt-3 py-0.5 rounded-md bg-gray-2 border-none mb-2"
            :class="{ 'outline outline-2 outline-red-500': v$.brand.$error}"
            @change="changeBrand"
          />
        </div>
        <div class="col-span-1">
          <label class="text-dark font-semibold hidden md:block">Модель</label>
          <Dropdown
            v-model="search.model"
            :options="carStore.models"
            placeholder="Модель"
            option-value="slug"
            option-label="name"
            class="w-full md:mt-3 py-0.5 rounded-md bg-gray-2 border-none mb-2"
            :filter="carStore.models.length ? true : false"
            empty-message="Нет доступных опций"
            :class="{ 'outline outline-2 outline-red-500': v$.model.$error}"
            @change="changeModel"
          />
        </div>
        <div class="col-span-1">
          <label class="text-dark font-semibold hidden md:block">Поколение</label>
          <Dropdown
            v-model="search.gen"
            :options="carStore.getGens"
            placeholder="Поколение"
            option-value="slug"
            option-label="name"
            :filter="carStore.models.length ? true : false"
            empty-message="Нет доступных опций"
            class="w-full md:mt-3 py-0.5 rounded-md bg-gray-2 border-none mb-2"
            :class="{ 'outline outline-2 outline-red-500': v$.gen.$error}"
            @change="changeGen"
          >
            <!-- <template #option="slotProps">
              <div>
                <p>{{ slotProps.option.gen_name }}</p>
              </div>
            </template> -->
          </Dropdown>
        </div>
        <div class="col-span-1">
          <label class="text-dark font-semibold hidden md:block">Модификация</label>
          <Dropdown
            v-model="search.mod"
            :options="carStore.getBodies"
            placeholder="Модификация"
            option-value="slug"
            option-label="search"
            empty-message="Нет доступных опций"
            class="w-full md:mt-3 py-0.5 rounded-md bg-gray-2 border-none mb-2"
            :class="{ 'outline outline-2 outline-red-500': v$.mod.$error}"
            @change="changeMod"
          />
        </div>
        <div class="col-span-1">
          <UiButton text="Искать" class="w-full md:mt-7" @click="searchCar" />
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { XMarkIcon } from '@heroicons/vue/24/outline/index.js'
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
  mod: string | null
}

const search = reactive<SearchField>({
  serv: '',
  brand: '',
  model: '',
  gen: '',
  mod: ''
})

const rules = computed(() => ({
  serv: { required },
  brand: { required },
  model: { required },
  gen: { required },
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
    const newPath = `/services/${search.serv}/${search.brand}/${search.model}/${search.gen}/${search.mod}`
    router.replace(newPath)
  }
}

const clearFilter = () => {
  Object.keys(search).forEach((key) => {
    search[key as keyof SearchField] = ''
  })
}

onMounted(() => {
  for (const key in carStore.search) {
    search[key as keyof SearchField] = carStore.search[key as keyof SearchField]
  }
})

async function changeServ () {
  await carStore.SET_SERV(search.serv)
  await carStore.LOAD_BRANDS(search.serv)
  router.push(`/services/${search.serv}`)
}

async function changeBrand () {
  await carStore.LOAD_MODELS(search.brand)
  router.push(`/services/${search.serv}/${search.brand}`)
}
async function changeModel () {
  await carStore.LOAD_GENS(search.model)
  router.push(`/services/${search.serv}/${search.brand}/${search.model}`)
}

async function changeGen () {
  await carStore.LOAD_BODY(search.gen)
  router.push(`/services/${search.serv}/${search.brand}/${search.model}/${search.gen}`)
}
async function changeMod () {
  await carStore.SET_MOD(search.mod)
  router.push(`/services/${search.serv}/${search.brand}/${search.model}/${search.gen}/${search.mod}`)
}

</script>

<style scoped>
.errorField{
  border: 1px red solid;
}
</style>
