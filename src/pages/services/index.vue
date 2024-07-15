<template>
  <div>
    <HomeServ />
  </div>
</template>

<script setup lang="ts">
import { useUiStore } from '@/src/stores/ui'
import { useServStore } from '~/src/stores/serv'

const uiStore = useUiStore()
const servStore = useServStore()

useSeoMeta({
  title: () => `Услуги компании ReChip тюнинг в ${uiStore.regions[uiStore.activeRegion].place}`,
  ogTitle: () => `Услуги компании ReChip тюнинг в ${uiStore.regions[uiStore.activeRegion].place}`,
  description: () => `Осуществляем следующий перечень услуг: ${servStore.services.map(i => i.name).join(', ')}`,
  ogDescription: () => `Осуществляем следующий перечень услуг: ${servStore.services.map(i => i.name).join(', ')}`,
  ogType: 'website',
  ogImage: 'http://new.rechip-tuning.ru/img/hero.webp'
})
</script>

<style scoped>

</style>
