<template>
  <div>
    <NuxtLoadingIndicator color="#F03C3D" />
    <NuxtLayout>
      <div class="h-[40rem] flex justify-center items-center">
        <div class="text-center">
          <img src="/img/error.webp" alt="Ошибка 404, страница не найдена!" class="h-60">
          <h1 class="font-bold text-dark text-2xl my-4">
            Страница не найдена <br> или в разработке
          </h1>
          <nuxt-link to="/">
            <UiButton text="На главную" class="mx-auto" red />
          </nuxt-link>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
})
useSeoMeta({
  title: 'Ошибка 404, страница не найдена!'
})
</script>

<style scoped>

</style>
