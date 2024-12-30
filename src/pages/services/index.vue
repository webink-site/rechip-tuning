<template>
  <div>
    <HomeServ />
  </div>
</template>

<script setup lang="ts">
import { useUiStore } from '@/src/stores/ui'
import { useServStore } from '~/src/stores/serv'
import { useCity } from '~/src/helpers/useCiity'

const { getCityIndex } = useCity()

const uiStore = useUiStore()
const servStore = useServStore()

useSeoMeta({
  title: () => `Услуги компании ReChip тюнинг в ${uiStore.regions[getCityIndex.value].place}`,
  ogTitle: () => `Услуги компании ReChip тюнинг в ${uiStore.regions[getCityIndex.value].place}`,
  description: () => `Осуществляем следующий перечень услуг: ${servStore.services.map(i => i.name).join(', ')}`,
  ogDescription: () => `Осуществляем следующий перечень услуг: ${servStore.services.map(i => i.name).join(', ')}`,
  ogType: 'website',
  ogImage: '/img/hero.webp'
})
</script>

<style scoped>

</style>
